import { useAuthQueryMutationRegister } from "@/api/queries/auth/authQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useSignup = () => {
  const mutationRegister = useAuthQueryMutationRegister();
  const router = useRouter();

  const zodSchema = z.object({
    email: z.string().email(),
    password_hash: z.string().min(8),
    name: z.string().min(3).max(50),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      email: "guilhermezapas2@gmail.com",
      password_hash: "OvoPascoa120@",
      name: "Guilherme",
    },
  });

  async function onSubmit(data: z.infer<typeof zodSchema>) {
    mutationRegister.mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  }
  return {
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    mutationRegister
  };
};
