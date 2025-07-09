import { Organization } from '@/@types/Organization';
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
}

interface UserState {
  user: User | null;
  selectedOrganization: OrganizationRole | null;
  organizations: Organization[]
  setSelectedOrganization: (organization: OrganizationRole | null) => void;
  setOrganizations: (organizations: Organization[]) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      selectedOrganization: null,
      setSelectedOrganization: (organization) => set({ selectedOrganization: organization }),
      user: null,
      organizations: [],
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setOrganizations: (organizations) => set({ organizations })
    }),
    {
      name: 'user-store', // nome da chave no localStorage
    }
  )
);
