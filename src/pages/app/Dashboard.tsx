import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useSeo } from "@/hooks/use-seo";

export function Dashboard() {

  useSeo({
    title: "Plune - Dashboard",
    description: "Página de dashboard para métricas dos dados",
    ogDescription: "Página de dashboard para métricas dos dados",
    ogTitle: "Plune - Dashboard"
  });

  return (
    <ScreenWrapper>
      <div>
        dashboard page updated realeased 0.0.13
      </div>
    </ScreenWrapper>
  )
}