import { AppLayout } from "@/layout/app";
import { Approvals } from "@/pages/app/Approvals";
import { Dashboard } from "@/pages/app/Dashboard";
import { Flow } from "@/pages/app/Flow";
import { FlowDiagram } from "@/pages/app/FlowDiagram";
import { Forms } from "@/pages/app/Forms";
import { Route, Routes } from "react-router-dom";

export function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/flows" element={<Flow />}/>
        <Route path="/flows/diagram/:id" element={<FlowDiagram />}/>
        <Route path="/forms" element={<Forms />}/>
        <Route path="/Approvals" element={<Approvals />}/>
      </Route>
    </Routes>
  );
}