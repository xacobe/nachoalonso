const auth0 = new Auth0Client({
    domain: "TU_DOMINIO.auth0.com",  // Ej: "tusitio.us.auth0.com" (lo ves en Netlify > Identity)
    client_id: "TU_CLIENT_ID_AUTH0",  // Lo encuentras en Netlify > Identity > Auth0
    redirect_uri: window.location.origin + "/admin/",
    audience: "https://api.netlify.com",
    // Añade esto para forzar GitHub como proveedor:
    authorizationParams: {
      connection: "github"  // Esto prioriza GitHub en el login
    }
  });
  
  // Inicialización (igual que antes)
  window.addEventListener("load", async () => {
    if (window.location.pathname.includes("/admin/")) {
      const isAuthenticated = await auth0.isAuthenticated();
      if (!isAuthenticated) {
        await auth0.loginWithRedirect();
      }
    }
  });