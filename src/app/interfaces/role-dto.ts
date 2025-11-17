export interface RoleDTO {
  id: string;
  name: string;
  description: string;
  scopeParamRequired: boolean;
  composite: boolean;
  composites: any,
  clientRole: boolean;
  containerId: string;
  attributes: any
}
