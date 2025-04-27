import { LoginProps } from "@/@types/auth";
import { useAuthMutationLogin } from "@/api/queries/auth/authQuery";
import { LoginUserResponse } from "@/api/services/auth/authServiceTypes";
import { IService } from "@/api/services/auth/contracts/Iservice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormData, SchemaSignin } from "./signin.schema";


type SigninModelProps = {
  signinService: IService<LoginProps, LoginUserResponse>
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
