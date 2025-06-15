import { AppLayout } from "@/layout/app";
import { Approvals } from "@/pages/app/Approvals";
import { Dashboard } from "@/pages/app/Dashboard";
import { FlowModels } from "@/pages/app/FlowModels";
import { FlowDiagram } from "@/pages/app/FlowDiagram";
import { Forms } from "@/pages/app/Forms";
import { Route, Routes } from "react-router-dom";
import { FlowInstances } from "@/pages/app/FlowInstances";

export function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/flows/models/" element={<FlowModels />}/>
        <Route path="/flows/instances" element={<FlowInstances />}/>
        <Route path="/flows/diagram/:type/:id" element={<FlowDiagram />}/>
        <Route path="/forms" element={<Forms />}/>
        <Route path="/Approvals" element={<Approvals />}/>
      </Route>
    </Routes>
  );
}