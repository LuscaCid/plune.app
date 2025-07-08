import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserDto, UserSignUpDTO } from "@/lib/DTO/user.dto";
import { memo, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useNavigate } from "react-router-dom";
import { FormWrapper } from "@/components/ui/FormWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const SignUp = memo(() => {
  const { signUp } = useUser();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signUp,
    mutationKey: ['user-register'],
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast(err.message)
      }
    },
    onSuccess: () => {
      toast("User registered with success", {
        action: {
          label: "Go to login",
          onClick: () => navigate("/")
        }
      })
    },
    retry: 1,
  });

  const methods = useForm<UserSignUpDTO>({
    resolver: zodResolver(UserDto.signUp)
  });

  const handleSubmitForm = useCallback(async (data: UserSignUpDTO) => {
    return await mutateAsync(data);
  }, [])
  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <main className="flex flex-col gap-2">
            <CardTitle>
              Register
            </CardTitle>
            <CardDescription>
              Signup to start using our tools
            </CardDescription>
          </main>
          <aside>
            <Tooltip>
              <TooltipTrigger>
                <Button variant={"ghost"} size={"icon"} onClick={() => navigate("/")}>
                  <ArrowLeft size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Go back to login
              </TooltipContent>
            </Tooltip>
          </aside>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <FormWrapper handleSubmitForm={handleSubmitForm} >
              <FormItem>
                <FormLabel htmlFor="name">
                  Name
                </FormLabel>
                <Input<keyof UserSignUpDTO> id="name" name="name" />
                <FormDescription>
                  It's how your name will apear to others users 
                </FormDescription>
              </FormItem>
              <FormItem>
                <FormLabel>
                  E-mail
                </FormLabel>
                <Input<keyof UserSignUpDTO> name="email" />
                <FormDescription>
                  The application e-mail thats will be used for connections
                </FormDescription>
              </FormItem>
              <FormItem>
                <FormLabel>
                  Password
                </FormLabel>
                <Input<keyof UserSignUpDTO> name="password"/>
                <FormDescription>
                  Dont tell your password to anyone
                </FormDescription>
              </FormItem>
              <FormItem>
                <FormLabel>
                  Repeat password
                </FormLabel>
                <Input {...methods.register("password")} />
                <FormDescription>
                  repeat your password exactly as above 
                </FormDescription>
              </FormItem>
              <SubmitButton isPending={isPending} />
            </FormWrapper>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
})