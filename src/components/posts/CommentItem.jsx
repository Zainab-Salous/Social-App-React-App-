import { Card, Textarea } from "flowbite-react";
import React, { useState } from "react";
import CardHeader from "./CardHeader";
import AppButton from "../shared/AppButton/AppButton";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


export default function CommentItem({ comment }) {
    const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm();
  const { mutate : handleUpdateComment } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
        toast.success("Comment updated successfully", { theme: "dark" });
        setIsEditing(false);
           queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
    },
    onError: () => {
        toast.error("Comment update failed", { theme: "dark" });
    }
  });
  async function updateComment(data) {
    return await axios.put(`${import.meta.env.VITE_BASE_URL}/comments/${comment._id}`, data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  return (
    <Card>
      <CardHeader
        user={comment.commentCreator}
        createdAt={comment.createdAt}
        mediaId={comment._id}
        isComment={true}
        setIsEditing={setIsEditing}
      />
      {isEditing ? (
        <form onSubmit={handleSubmit(handleUpdateComment)}>
          <Textarea
            className="mb-4"
            defaultValue={comment.content}
            {...register("content")}
          />
          <div className="flex gap-2">
            <AppButton type="submit">Update</AppButton>
            <AppButton
              type="reset"
              color="failure"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </AppButton>
          </div>
        </form>
      ) : (
        <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {comment.content}
        </h3>
      )}
    </Card>
  );
}
