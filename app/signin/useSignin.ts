import { LoginProps } from "@/@types/auth";
import { useAuthMutationLogin } from "@/api/queries/auth/authQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const useSignin = () => {
  const mutationLogin = useAuthMutationLogin();

  const zodSchema = z.object({
    email: z.string().email(),
    password_hash: z.string().min(8),
  });
const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      email: "guilhermezapas2@gmail.com",
      password_hash: "OvoPascoa120@",
    },
  });



  async function onSubmit(data: LoginProps) {
    mutationLogin.mutate(data, {
      onSuccess: () => {
        router.push("/home");
      },
    });
  }
  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    mutationLogin
  };
};

export default useSignin;
