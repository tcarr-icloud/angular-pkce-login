export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api',
  oidc: {
    realm: 'development',
    authority: 'http://keycloak:8080/realms/development',
    clientId: 'spa-client',
    userinfo_endpoint: 'http://keycloak:8080/realms/development/protocol/openid-connect/userinfo',
  }
};
