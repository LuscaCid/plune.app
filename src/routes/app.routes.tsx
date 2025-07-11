import { AppLayout } from "@/layout/app";
import { Approvals } from "@/pages/app/Approvals";
import { Dashboard } from "@/pages/app/Dashboard";
import { FlowTemplates } from "@/pages/app/FlowTemplates";
import { FlowDiagram } from "@/pages/app/FlowDiagram";
import { Forms } from "@/pages/app/Forms";
import { Route, Routes } from "react-router-dom";
import { FlowInstances } from "@/pages/app/FlowInstances";
import { OrganizationDispatch } from "@/pages/app/OrganizationsDispatch";
import { useUserStore } from "@/store/user";
import { OrganizationLayout } from "@/layout/organization";

export function AppRoutes() {
  const selectedOrganization = useUserStore(state => state.selectedOrganization);
  if (selectedOrganization) {
    return (
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organizations" element={<OrganizationDispatch />} />
          <Route path="/flows/templates/" element={<FlowTemplates />} />
          <Route path="/flows/instances" element={<FlowInstances />} />
          <Route path="/flows/diagram/:type/:id" element={<FlowDiagram />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/Approvals" element={<Approvals />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<OrganizationLayout />}>
        <Route path="/" element={<OrganizationDispatch />} />
      </Route>
    </Routes>
  )

}