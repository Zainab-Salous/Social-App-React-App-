import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Card, Label, Textarea } from "flowbite-react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import AppButton from "../shared/AppButton/AppButton";

export default function Add() {
  const fileInputRef = useRef();
 const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      reset();
      fileInputRef.current.value = null;

      toast.success("Post added successfully", {
        type: "success",
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['user-posts'] })
      queryClient.invalidateQueries({ queryKey: ['all-posts'] })
    },
    onError: () => {
       toast.error("Post creation failed", {
        type: "error",
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
      });

    }
  });

  const { register, handleSubmit, reset, formState: { isValid } } = useForm();

  async function addPost(data) {
    const formData = new FormData();
    formData.append("body", data.body);

    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    return await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

  }

  return (
    <section className="py-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <form
            onSubmit={handleSubmit(mutate)}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment">Post Something</Label>
              </div>
              <div className="flex items-center gap-6">
                <Textarea
                  id="comment"
                  placeholder="Leave a comment..."
                  {...register("body")}
                  rows={2}
                />
                <input type="file" className="hidden" ref={fileInputRef} />
                <FaCloudUploadAlt
                  onClick={() => fileInputRef.current.click()}
                  className="text-4xl cursor-pointer"
                />
              </div>
            </div>
            <AppButton isLoading={isPending} disabled={!isValid} type="submit">Create Post</AppButton>
          </form>
        </Card>
      </div>
    </section>
  );
}
