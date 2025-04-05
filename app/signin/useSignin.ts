import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useSignin = () => {
  const zodSchema = z.object({
    email: z.string().email(),
    password_hash: z.string().min(8),
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
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  };
};

export default useSignin;
