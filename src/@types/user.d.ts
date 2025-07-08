export type Roles = 'Admin' | 'Editor' | 'Approver' | 'Viewer';
export interface OrganizationRole {
  organizationId: string
  organizationName: string
  organizationLogo: string
  role: Roles
}

export interface User {
  name: string
  email: string
  id?: string
  status?: 'Active' | 'Inative'
  lastAccess?: string
  avatar?: string
}

export interface SignInResponse {
  message: string;
  payload: { token: string; userCommonData: { name: string; email: string; } }
  statusCode: 200
}

// message
// :
// "User loggon"
// payload
// :
// {,…}
// token
// :
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6Imx1Y2FzQGVtYWlsLmNvbSIsIm5hbWUiOiJsdWNhcyIsImF2YXRhciI6IiJ9LCJpYXQiOjE3NTE5NDI4NTl9.t2JHg0d05gSFI4mAUFwCqwQeVuOeqgO0uUOkwi24pMs"
// userCommonData
// :
// {name: "lucas", email: "lucas@email.com"}
// statusCode
// :
// 200