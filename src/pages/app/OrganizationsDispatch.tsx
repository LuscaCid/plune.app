import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { userOrganizations } from "@/hooks/use-organization";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { memo } from "react";

export const OrganizationDispatch = memo(() => {
  const { getUserOrganizations } = userOrganizations();
  const { data: response } = useQuery({
    queryFn: getUserOrganizations,
    queryKey: ["user-organizations"]
  })
  return (
    <ScreenWrapper>
      <main className="w-full grid grid-cols-1 md:grid-cols-3">
        {response && response.data.map((item, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>
                {item.name}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
        <NewOrganizationCard />
      </main>
    </ScreenWrapper>
  )
})

const NewOrganizationCard = memo(() => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          New
        </CardTitle>
        <CardDescription>
          Organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" size={"lg"} variant={"secondary"}>
              <Plus size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent >
            <DialogTitle>
              Nova organização
            </DialogTitle>
            <DialogDescription>
              Adicione usuários à sua nova organization
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
})