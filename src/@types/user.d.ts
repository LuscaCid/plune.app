export interface OrganizationRole {
  organizationId: string
  role: 'Administrador' | 'Editor' | 'Aprovador' | 'Visualizador'
}

export interface User {
  id: string
  name: string
  email: string
  status: 'Ativo' | 'Inativo'
  lastAccess: string
  organizationRoles: OrganizationRole[]
}