import { Organization } from "@/@types/Organization";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { FormWrapper } from "@/components/ui/FormWrapper";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { TypographyH2 } from "@/components/ui/Typography";
import { userOrganizations } from "@/hooks/use-organization";
import { OrganizationDto, SaveOrgDTO } from "@/lib/DTO/organization.dto";
import { useUserStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { memo, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export const OrganizationDispatch = memo(() => {
  const { getUserOrganizations } = userOrganizations();

  const user = useUserStore(state => state.user);

  const { data: response } = useQuery({
    queryFn: getUserOrganizations,
    queryKey: ["user-organizations", user?.email]
  });
  return (
    <main className="flex flex-col gap-3">
      <TypographyH2 content={`${response && response?.data.length >= 0 ? "Your organizations" : "Create an new organization"}`} />
      <div className=" grid grid-cols-1 md:grid-cols-3  items-center justify-center ">
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
      </div>
    </main>
  )
})

const NewOrganizationCard = memo(() => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5 items-start justify-center">
        <CardTitle className="text-muted-foreground">
          New Organization
        </CardTitle>
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
            <OrganizationForm />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
})

export const OrganizationForm = memo((org: Partial<Organization>) => {
  const user = useUserStore(state => state.user);

  const { saveOrganization } = userOrganizations();
  const queryClient = useQueryClient();
  const methods = useForm<SaveOrgDTO>({
    resolver: zodResolver(OrganizationDto.SaveOrgDto),
    defaultValues: {
      name: org && org.name ? org.name : "",
    }
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: saveOrganization,
    mutationKey: ["save-org"],
    onSuccess: (_, variable) => {
      toast("Organization saved");
      queryClient.setQueryData(["user-organizations", user?.email], (prev : Organization[]) => {
        if (variable.id) {
          return prev.map((data) => {
            if (data.id === variable.id) {
              return variable
            }
            return data;
          })
        }
      })
    },
    onError: (err) => {
      console.log(err)
    }
  })
  const handleSubmit = useCallback(async (data : SaveOrgDTO) => { 
    await mutateAsync(data); 
  }, [])
  return (
    <FormProvider {...methods}>
      <FormWrapper handleSubmitForm={handleSubmit}>
        <FormItem>
          <FormLabel htmlFor="name">
            Name
          </FormLabel>
          <Input
            id="name"
            {...methods.register("name")}
          />
          <FormDescription>
            How the organization will be called
          </FormDescription>
        </FormItem>
        <SubmitButton isPending={isPending} />
      </FormWrapper>
    </FormProvider>

  )
})