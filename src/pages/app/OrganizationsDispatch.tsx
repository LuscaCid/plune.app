import { Organization } from "@/@types/Organization";
import { InviteDialog, UsersOrgPayload } from "@/components/InviteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { FormWrapper } from "@/components/ui/FormWrapper";
import { FormInput } from "@/components/ui/FormInput";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { TypographyH2 } from "@/components/ui/Typography";
import { userOrganizations } from "@/hooks/use-organization";
import { OrganizationDto, SaveOrgDTO } from "@/lib/DTO/organization.dto";
import { useUserStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, EllipsisVertical, Plus, Trash } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { CustomDropdownMenuItem } from "@/components/UserDropdown";

export const OrganizationDispatch = memo(() => {
  const { getUserOrganizations } = userOrganizations();
  const { logout } = useUser()
  const user = useUserStore(state => state.user);
  const setSelectedOrganization = useUserStore(state => state.setSelectedOrganization);
  const { data: response } = useQuery({
    queryFn: getUserOrganizations,
    queryKey: ["user-organizations", user?.email]
  });
  return (
    <main className="flex flex-col gap-3">
      <TypographyH2 content={`${response && response?.data.length >= 0 ? "Your organizations" : "Create an new organization"}`} />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center ">
        {response && response.data.map((item, idx) => (
          <Card key={idx}>
            <CardHeader className="flex justify-between ">
              <main className="space-y-2">
                <CardTitle>
                  {item.organization.name}
                </CardTitle>
                <CardDescription>
                  Your role - {item.role}
                </CardDescription>
                <CardDescription className="self-end">
                  {formatDistanceToNow(item.organization.createdAt, { addSuffix: true })}
                </CardDescription>
              </main>
              <aside>
                <DropdownMenu>
                  <DropdownMenuTrigger >
                    <Button variant={"ghost"}>
                      <EllipsisVertical size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <CustomDropdownMenuItem icon={ArrowLeft} title="Exit" onClick={() => { }} />
                    <CustomDropdownMenuItem icon={Trash} onClick={() => { }} title="Delete" variant="destructive" />
                  </DropdownMenuContent>
                </DropdownMenu>
              </aside>
            </CardHeader>
            <CardContent>
              <Button
                className={"w-full group"}
                variant={'outline'}
                onClick={() => setSelectedOrganization({
                  organizationId : item.organization.id,
                  organizationName : item.organization.name,
                  organizationLogo : item.organization.logo ?? "",
                  role : item.role
                })}
              >
                Join <ArrowRight className="group-hover:translate-x-2 transition duration-200" size={20} />
              </Button>
            </CardContent>
          </Card>
        ))}
        <NewOrganizationCard />
      </div>
      <Button onClick={logout} className="absolute bottom-10 left-10 flex items-center">
        <ArrowLeft size={15} /> Logout
      </Button>
    </main>
  )
})

const NewOrganizationCard = memo(() => {
  return (
    <Card className="h-full ">
      <CardContent className="h-full flex flex-col gap-5 items-start justify-between">
        <CardTitle className="text-muted-foreground">
          New Organization
        </CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" size={"lg"} variant={"outline"}>
              <Plus size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent >
            <DialogTitle>
              New Organization
            </DialogTitle>
            <DialogDescription>
              Add new users into the organization
            </DialogDescription>
            <OrganizationForm />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
})

export const OrganizationForm = memo(({ organization }: { organization?: Organization }) => {
  const user = useUserStore(state => state.user);
  const [usersOrg, setUsersOrg] = useState<UsersOrgPayload[]>([]);
  const { saveOrganization } = userOrganizations();
  const queryClient = useQueryClient();
  const methods = useForm<SaveOrgDTO>({
    resolver: zodResolver(OrganizationDto.SaveOrgDto),
    defaultValues: {
      name: organization && organization.name ? organization.name : "",
    }
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: saveOrganization,
    mutationKey: ["save-org"],
    onSuccess: (_, variable) => {
      toast("Organization saved");
      queryClient.setQueryData(["user-organizations", user?.email], (prev: Organization[]) => {
        if (variable.id) {
          return prev.map((data) => {
            if (data.id === variable.id) {
              return variable
            }
            return data;
          })
        }
        return [...prev, variable]
      })
    },
    onError: (err) => {
      console.log(err)
    }
  })
  const handleSubmit = useCallback(async (data: SaveOrgDTO) => {
    const payload: SaveOrgDTO = {
      name: data.name,
      users: usersOrg.map((userOrg) => ({ id: userOrg.id!, role: userOrg.role! }))
    }
    await mutateAsync(payload);
  }, [])
  return (
    <FormProvider {...methods}>
      <FormWrapper handleSubmitForm={handleSubmit}>
        <FormItem>
          <FormLabel htmlFor="name">
            Name
          </FormLabel>
          <FormInput
            id="name"
            {...methods.register("name")}
          />
          <FormDescription>
            How the organization will be called
          </FormDescription>
        </FormItem>
        <InviteDialog
          setUsersOrg={setUsersOrg}
          usersOrg={usersOrg}
          organization={organization}
        />
        <SubmitButton isPending={isPending} />
      </FormWrapper>
    </FormProvider>

  )
})