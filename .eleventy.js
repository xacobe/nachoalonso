const CleanCSS = require("clean-css");
const { minify } = require("terser");
const metagen = require("eleventy-plugin-metagen");
const eleventyNavigation = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
const path = require('path'); // Añade esto con los otros requires


module.exports = (eleventyConfig) => {

  eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(eleventyNavigation);

  eleventyConfig.setTemplateFormats([
    "md",
    "njk"
  ]);

  markdownTemplateEngine: "njk";

  eleventyConfig.addCollection("gallery", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/gallery/**/*.md");
  });

  // Nueva colección solo para ensayos
eleventyConfig.addCollection("ensayo", function(collectionApi) {
  return collectionApi.getFilteredByGlob("src/gallery/ensayo/*.md");
});
// Descomentar esto para añadir colección francia
// Descomentar tambiern en src/francia.njk la referencia a la colección
// eleventyConfig.addCollection("francia", function(collectionApi) {
//   return collectionApi.getFilteredByGlob("src/gallery/francia/*.md");
// });

  // Perform manual passthrough file copy to include directories in the build output _site
    // Imagenes CSS
  eleventyConfig.addPassthroughCopy("src/_includes/css/images");
    
  eleventyConfig.addPassthroughCopy("src/images/**/*.{jpg,jpeg,png,gif,webp,svg}");
  eleventyConfig.addPassthroughCopy("./src/photos");
  eleventyConfig.addPassthroughCopy("./src/videos");
  eleventyConfig.addPassthroughCopy("./src/sounds");
  eleventyConfig.addPassthroughCopy("./src/css");
  // eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });

  eleventyConfig.addPassthroughCopy("./src/favicon_data");
  // Copiar los assets de baguettebox
  eleventyConfig.addPassthroughCopy({
    'node_modules/baguettebox.js/dist/baguetteBox.min.css': 'css/baguetteBox.min.css'
  });

  // Opcional: Copiar el JS si no usas bundler
  eleventyConfig.addPassthroughCopy({
    'node_modules/baguettebox.js/dist/baguetteBox.min.js': 'js/baguetteBox.min.js'
  });


  // Create css-clean CSS Minifier filter
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  

  // Create terser JS Minifier async filter (Nunjucks)
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.log(`Terser error: ${err}`);
      callback(null, code);
    }
  });





  // Configure image in a template paired shortcode
  eleventyConfig.addPairedShortcode("image", (srcSet, src, alt, sizes = "(min-width: 400px) 33.3vw, 100vw") => {
    return `<img srcset="${srcSet}" src="${src}" alt="${alt}" sizes="${sizes}" />`;
  });

  // Configure outgoing Pexels anchor elements in a template paried shortcode
  eleventyConfig.addPairedShortcode("link", (href, cls = "image-link", rel = "noopener", target = "_blank", btnTxt = "Pexels") => {
    return `<a class="${cls}" href="${href}" rel="${rel}" target="${target}">${btnTxt}</a>`;
  });

  // Get the current year
  eleventyConfig.addShortcode("getYear", function () {
    const year = new Date().getFullYear();
    return year.toString();
  });

  eleventyConfig.addShortcode("img", async function({ src, alt, className, imgDir = "./src/images/" }) {
    if (!alt) {
      throw new Error(`Missing \`alt\` on responsive image from: ${src}`);
    }
  
    const fullInputPath = path.join(__dirname, imgDir, src);
    console.log("Procesando imagen desde:", fullInputPath);
  
    try {
      const metadata = await Image(fullInputPath, {
        widths: [150, 300, 450],
        formats: ["webp", "jpeg"],
        urlPath: `/images/${imgDir.replace('./src/images/', '').replace('./src/', '').replace(/\/$/, '')}/`,
        outputDir: path.join("_site", "images", imgDir.replace('./src/images/', '').replace('./src/', '').replace(/\/$/, '')),
        filenameFormat: (id, src, width, format) => {
          const parsed = path.parse(src);
          return `${parsed.name}-${width}w.${format}`;
        }
      });
  
      const lowsrc = metadata.jpeg[0];
      const highsrc = metadata.jpeg[metadata.jpeg.length - 1];
  
      const sources = Object.values(metadata).map((imageFormat) => {
        return `<source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="15vw">`;
      }).join("\n");
  
      return `<picture>
        ${sources}
        <img
          src="${lowsrc.url}"
          width="${highsrc.width}"
          height="${highsrc.height}"
          alt="${alt}"
          loading="lazy"
          decoding="async"
          class="${className || ''}"
        >
      </picture>`;
    } catch (error) {
      console.error("Error procesando imagen:", error);
      return `<div class="image-error">Error cargando imagen: ${src}</div>`;
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      layouts: "_includes/layouts",
      includes: "_includes",
    },
    templateFormats: ["md", "liquid", "njk"],
    passthroughFileCopy: true
  }
};