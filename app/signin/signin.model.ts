import { useAuthMutationLogin } from "@/api/queries/auth/authQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormData, SchemaSignin } from "./signin.schema";
import { IAuthService } from "@/api/services/auth/contracts/IAuthService";


type SigninModelProps = {
  signinService: Pick<IAuthService, "signin">
}
const useSigninModel = ({ signinService }: SigninModelProps) => {
  const { mutate, isPending } = useAuthMutationLogin(signinService);



  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SchemaSignin),
    defaultValues: {
      email: "guilhermezapas2@gmail.com",
      password_hash: "OvoPascoa120@",
    },
  });


  async function onSubmit(data: FormData) {
    mutate(data, {
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
    isPending
  };
};

export default useSigninModel;
