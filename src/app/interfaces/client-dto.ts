export interface ClientDto {
  id: string;
  clientId: string;
  name: string;
  description: string;
  type: string;
  rootUrl: string;
  adminUrl: string;
  baseUrl: string;
  surrogateAuthRequired: true;
  enabled: true;
  alwaysDisplayInConsole: true;
  clientAuthenticatorType: string;
  secret: string;
  registrationAccessToken: string;
  // defaultRoles: [string];
  redirectUris: [string];
  webOrigins: [string];
  notBefore: 0;
  bearerOnly: true;
  consentRequired: true;
  standardFlowEnabled: true;
  implicitFlowEnabled: true;
  directAccessGrantsEnabled: true;
  serviceAccountsEnabled: true;
  authorizationServicesEnabled: true;
  // directGrantsOnly: true;
  publicClient: true;
  frontchannelLogout: true;
  protocol: string;
  attributes: {
    property1: string; property2: string
  };
  authenticationFlowBindingOverrides: {
    property1: string; property2: string
  };
  fullScopeAllowed: true;
  nodeReRegistrationTimeout: 0;
  registeredNodes: {
    property1: 0; property2: 0
  };
  protocolMappers: [{
    id: string;
    name: string;
    protocol: string;
    protocolMapper: string;
    consentRequired: true;
    consentText: string;
    config: {
      property1: string; property2: string
    }
  }];
  // clientTemplate: string;
  // useTemplateConfig: true;
  // useTemplateScope: true;
  // useTemplateMappers: true;
  defaultClientScopes: [string];
  optionalClientScopes: [string];
  authorizationSettings: {
    id: string;
    clientId: string;
    name: string;
    allowRemoteResourceManagement: true;
    policyEnforcementMode: "ENFORCING";
    resources: [{
      _id: string; name: string; uris: [string]; type: string; scopes: [{
        id: string; name: string; iconUri: string; policies: [null]; resources: [null]; displayName: string
      }]; icon_uri: string; owner: {
        id: string; name: string
      }; ownerManagedAccess: true; displayName: string; attributes: {
        property1: [string]; property2: [string]
      }; scopesUma: [{
        id: string; name: string; iconUri: string; policies: [null]; resources: [null]; displayName: string
      }]
    }];
    policies: [{
      id: string;
      name: string;
      description: string;
      type: string;
      policies: [string];
      resources: [string];
      scopes: [string];
      logic: "POSITIVE";
      decisionStrategy: "AFFIRMATIVE";
      owner: string;
      resourceType: string;
      resourcesData: [{
        _id: string; name: string; uris: [null]; type: string; scopes: [null]; icon_uri: string; owner: {
          id: null; name: null
        }; ownerManagedAccess: true; displayName: string; attributes: {
          property1: []; property2: []
        }; scopesUma: [null]
      }];
      scopesData: [{
        id: string; name: string; iconUri: string; policies: [null]; resources: [null]; displayName: string
      }];
      config: {
        property1: string; property2: string
      }
    }];
    scopes: [{
      id: string; name: string; iconUri: string; policies: [{
        id: string;
        name: string;
        description: string;
        type: string;
        policies: [null];
        resources: [null];
        scopes: [null];
        logic: "POSITIVE";
        decisionStrategy: "AFFIRMATIVE";
        owner: string;
        resourceType: string;
        resourcesData: [null];
        scopesData: [null];
        config: {
          property1: null; property2: null
        }
      }]; resources: [{
        _id: string; name: string; uris: [null]; type: string; scopes: [null]; icon_uri: string; owner: {
          id: null; name: null
        }; ownerManagedAccess: true; displayName: string; attributes: {
          property1: []; property2: []
        }; scopesUma: [null]
      }]; displayName: string
    }];
    decisionStrategy: "AFFIRMATIVE";
    authorizationSchema: {
      resourceTypes: {
        property1: {
          type: string; scopes: [string]; scopeAliases: {
            property1: [null]; property2: [null]
          }; groupType: string
        }; property2: {
          type: string; scopes: [string]; scopeAliases: {
            property1: [null]; property2: [null]
          }; groupType: string
        }
      }
    }
  };
  access: {
    property1: true; property2: true
  };
  origin: string
}
