import axios from "axios";
import { Alert, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import AppButton from "../../../components/shared/AppButton/AppButton";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import { AuthContext } from "../../../context/AuthContext";

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  rePassword: "",
};

const schema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" }),
    rePassword: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export default function ChangePassword() {
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const { token } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  async function onSubmit(data) {
    try {
      const { data: response } = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/change-password`,
        data,
        {
          headers: { token },
        }
      );

      if (response.message === "success") {
        setApiError(null);
        setApiSuccess("Password changed successfully");
        reset();
      } else if (response.Error) {
        throw new Error(response.Error);
      }
    } catch (error) {
      console.log(error.message);
      setApiSuccess(null);
      setApiError(error.response?.data?.Error || "Something went wrong");
    }
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800">
          <h1 className="text-center mb-4">Change Password</h1>

          {apiError && (
            <Alert color="failure" icon={HiInformationCircle}>
              {apiError}
            </Alert>
          )}
          {apiSuccess && (
            <Alert color="success" icon={HiInformationCircle}>
              {apiSuccess}
            </Alert>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-md flex-col gap-4"
          >
            <div>
              <Label htmlFor="currentPassword" className="mb-2 block">
                Current Password
              </Label>
              <TextInput
                id="currentPassword"
                type="password"
                {...register("currentPassword")}
              />
              <ValidationError error={errors.currentPassword?.message} />
            </div>

            <div>
              <Label htmlFor="newPassword" className="mb-2 block">
                New Password
              </Label>
              <TextInput
                id="newPassword"
                type="password"
                {...register("newPassword")}
              />
              <ValidationError error={errors.newPassword?.message} />
            </div>

            <div>
              <Label htmlFor="rePassword" className="mb-2 block">
                Confirm New Password
              </Label>
              <TextInput
                id="rePassword"
                type="password"
                {...register("rePassword")}
              />
              <ValidationError error={errors.rePassword?.message} />
            </div>

            <AppButton disabled={!isValid} isLoading={isSubmitting}>
              Change Password
            </AppButton>
          </form>
        </div>
      </div>
    </section>
  );
}
