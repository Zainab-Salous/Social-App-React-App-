import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Alert,
  Button,
  Datepicker,
  Label,
  Radio,
  TextInput,
} from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import AppButton from "../../../components/shared/AppButton/AppButton";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: "",
};

const schema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    rePassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    dateOfBirth: z.string({ message: "Date of birth is required" }).refine(
      (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - selectedDate.getFullYear();
        const m = today.getMonth() - selectedDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
          age--;
        }
        return age >= 15;
      },
      { message: "You must be at least 15 years old" }
    ),

    gender: z.literal(["male", "female"], {
      message: "Please select a gender",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export default function Register() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  // console.log("isValid", isValid);

  async function onSubmit(data) {
    console.log(data);
    try {
      const { data: response } = await axios.post(
        ` ${import.meta.env.VITE_BASE_URL}/users/signup`,
        data
      );

      if (response.message === "success") {
        setApiError(null);
        navigate("/login");
      } else if (response.Error) {
        throw new Error(response.Error);
      }
    } catch (error) {
      console.log(error.message);
      setApiError(error.response.data.error);
    }
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className=" max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800">
          <h1 className="text-center">Register</h1>
          {apiError && (
            <Alert className="my-4" color="failure" icon={HiInformationCircle}>
              {apiError}
            </Alert>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* ************* Name Input ************* */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Your Name</Label>
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
              />
              <ValidationError error={errors.name?.message} />
            </div>

            {/* ************* Email Input ************* */}

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
              </div>
              <TextInput
                id="email1"
                type="text"
                placeholder="name@flowbite.com"
                {...register("email")}
              />
              <ValidationError error={errors.email?.message} />
            </div>
            {/* ************* Password Input ************* */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your Password</Label>
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="**********"
                {...register("password")}
              />
              <ValidationError error={errors.password?.message} />
            </div>

            {/* ************* Confirm Password Input ************* */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rePassword">Confirm Password</Label>
              </div>
              <TextInput
                id="rePassword"
                type="password"
                placeholder="**********"
                {...register("rePassword")}
              />
              <ValidationError error={errors.rePassword?.message} />
            </div>
            {/* ************* Date of Birth ************* */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
              </div>
              <Controller
                render={({ field }) => (
                  <Datepicker
                    {...field}
                    value={field.value ? new Date(field.value) : new Date()}
                  onChange={(date) => {
                    if(date){
                      const formattedDate = date.toLocaleDateString('en-US',
                        {
                          day:"2-digit",
                          month:"2-digit",
                          year:"numeric"
                        }
                      ).replaceAll("/","-"); 
                      
                      return field.onChange(formattedDate); 
                    }
                  }}
                  />
                )}
                name="dateOfBirth"
                control={control}
              />

              
              <ValidationError error={errors.dateOfBirth?.message} />
            </div>
            {/* ************* Gender ************* */}
            <div className="mb-2 block">
              <Label htmlFor="gender">Gender</Label>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio id="male" value="male" {...register("gender")} />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="female" value="female" {...register("gender")} />
                <Label htmlFor="female">Female</Label>
              </div>
              <ValidationError error={errors.gender?.message} />
            </div>

            <AppButton disabled={!isValid} isLoading={isSubmitting}>
              Register
            </AppButton>
          </form>
        </div>
      </div>
    </section>
  );
}
