export interface UserDto {
  id: number;
  keycloakUserId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
}
