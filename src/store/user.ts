import type { OrganizationRole, User } from '@/@types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockedOrganization: OrganizationRole = {
  organizationId: "org123",
  role: "Admin",
  organizationName: "My Organization",
  organizationLogo: "https://example.com/logo.png",
}
const userMock: User = {
  email: "lucas@email.com",
  id: "123456789",
  lastAccess: "2023-10-01T12:00:00Z",
  name: "Lucas",
  status: "Active",
  organizationRoles: [ mockedOrganization ],
}

interface UserState {
  user: User | null;
  selectedOrganization?: OrganizationRole;
  setSelectedOrganization?: (organization?: OrganizationRole) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      selectedOrganization: mockedOrganization,
      setSelectedOrganization: (organization) => set({ selectedOrganization: organization }),
      user: userMock,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-store', // nome da chave no localStorage
    }
  )
);
