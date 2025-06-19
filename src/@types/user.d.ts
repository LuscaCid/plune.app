export type Roles = 'Admin' | 'Editor' | 'Approver' | 'Viewer';
export interface OrganizationRole {
  organizationId: string
  organizationName: string
  organizationLogo: string
  role: Roles
}

export interface User {
  id: string
  name: string
  email: string
  status: 'Active' | 'Inative'
  lastAccess: string
  organizationRoles: OrganizationRole[]
  avatar?: string
}