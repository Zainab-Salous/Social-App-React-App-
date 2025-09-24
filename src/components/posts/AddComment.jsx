import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AppButton from './../shared/AppButton/AppButton';

export default function AddComment({ post }) {
  const { handleSubmit, register, reset, formState:{isValid} } = useForm();
  const queryClient = useQueryClient()


  async function addComment(data) {
    const commentData ={ ...data, post}
    return await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, commentData, {
        headers: {  token: localStorage.getItem("token"),
        },
    }
    )
  }
    const { mutate,  isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      reset();
      toast.success(data.data.message,{
        position: "top-center",
        theme: "dark",
      });
        queryClient.invalidateQueries({queryKey: ['details-posts', post]})
                queryClient.invalidateQueries({queryKey: ['user-posts', post]})
        queryClient.invalidateQueries({queryKey: ['all-posts', post]})
        
        

    },
    onError: () => {
      toast.error("Comment creation failed",{
        position: "top-center",
        theme: "dark",
      });
    }

  });

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
        <Textarea
          id="comment"
          placeholder="Leave a comment..."
          {...register("content", { required: true })}
          rows={2}
        />

        <AppButton isLoading={isPending} disabled={!isValid || isPending} type="submit">Create Comment</AppButton>
      </form>
    </div>
  );
}
