export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  oidc: {
    realm: 'demo',
    authority: 'http://localhost:9090/realms/demo',
    clientId: 'spa-client',
    userinfo_endpoint: 'http://localhost:9090/realms/demo/protocol/openid-connect/userinfo',
  }
};
