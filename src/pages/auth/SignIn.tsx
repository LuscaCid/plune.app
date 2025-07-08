import { SignInResponse } from "@/@types/user";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { FormWrapper } from "@/components/ui/FormWrapper";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useUser } from "@/hooks/use-user";
import { UserDto, UserSignInDTO } from "@/lib/DTO/user.dto";
import { useUserStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { memo, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const SignIn = memo(() => {
  const { signIn } = useUser();
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
    mutationKey: ['user-signin'],
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log(err);
        toast(err.message)
      }
    },
    onSuccess: (data: SignInResponse) => {
      if (data.statusCode == 200) {
        toast(data.message)
        setUser(data.payload.userCommonData);
        localStorage.setItem("@plune-app/token", data.payload.token);
        navigate("/")
      }
    },
    retry: 1,
  });
  const methods = useForm<UserSignInDTO>({
    resolver: zodResolver(UserDto.signIn)
  });
  const handleSubmitForm = useCallback(async (data: UserSignInDTO) => {
    return await mutateAsync(data);
  }, [])
  return (
    <ScreenWrapper>
      <Card>
        <CardHeader>
          <CardTitle >
            Login - Plune.app
          </CardTitle>
          <CardDescription>
            Signin to get start
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <FormWrapper handleSubmitForm={handleSubmitForm}>
              <FormItem>
                <FormLabel htmlFor="e-mail">
                  E-mail
                </FormLabel>
                <Input<keyof UserSignInDTO> id="e-mail" name="email" />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="password">
                  Password
                </FormLabel>
                <Input<keyof UserSignInDTO> id="password" name="password" />
                <FormDescription>
                  Dont tell your password to anyone
                </FormDescription>
              </FormItem>
              <SubmitButton isPending={isPending} title="Sign" />
            </FormWrapper>
          </FormProvider>
        </CardContent>
        <CardFooter>
          <Link to={"/register"} className="text-muted-foreground text-sm hover:underline hover:text-sidebar-accent-foreground">Doesn't have a account? Register now</Link>
        </CardFooter>
      </Card>
    </ScreenWrapper>

  )
})