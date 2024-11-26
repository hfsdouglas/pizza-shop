import { z } from "zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

const SignInFormSchema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof SignInFormSchema>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate(data);
      toast.success("Enviamos um link de autenticação para seu e-mail.");
    } catch (error) {
      toast.error("Ocorreu um erro ao tentar realizar o login.");
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              pizza.shop
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
