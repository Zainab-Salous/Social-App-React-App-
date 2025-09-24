import axios from "axios";
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import AppButton from "../../../components/shared/AppButton/AppButton";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { AuthContext } from "../../../context/AuthContext";

const defaultValues = {
  email: "",
  password: "",
};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const navigate = useNavigate();

    const [apiError, setApiError] = useState(null)
    const {setToken } = useContext(AuthContext);
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ defaultValues, resolver: zodResolver(schema),  });
  async function onSubmit(data) {
    // login logic here
    try {
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signin`,
        data
      );
      if (response.message === "success") {
        setApiError(null)
        localStorage.setItem("token", response.token);
        setToken(response.token)
        navigate("/");
      } else if (response.Error) {
        throw new Error(response.Error);
      }
    } catch (error) {
      console.log(error.message);
      setApiError(error.response.data.Error )
    }
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className=" max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800">
          <h1 className="text-center">Login</h1>
          {apiError &&   <Alert color="failure" icon={HiInformationCircle}>{apiError}</Alert>}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-md flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                {...register("email")}
              />
              <ValidationError error={errors.email?.message} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1">Your password</Label>
              </div>
              <TextInput
                id="password1"
                type="password"
                {...register("password")}
              />
              <ValidationError error={errors.password?.message} />
            </div>

            <AppButton disabled={!isValid} isLoading={isSubmitting}>
              Login
            </AppButton>
          </form>
        </div>
      </div>
    </section>
  );
}
