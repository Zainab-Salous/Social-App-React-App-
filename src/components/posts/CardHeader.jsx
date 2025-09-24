import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import React, { useContext  } from "react";
import { formatDate } from "../../lib/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export default function CardHeader({
  user: { name, photo, _id },
  createdAt,
  isComment,
  mediaId,
  setIsEditing
}) {

  const { userData } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      toast.success("Deleted successfully", { theme: "dark" });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
    },
    onError: () => {
      toast.error("Deletion failed", { theme: "dark" });
    },
  });

  async function deleteRequest() {
    const endPoint = isComment ? "comments" : "posts";
    return await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/${endPoint}/${mediaId}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }

  return (
    <header className="flex items-center">
      <div className="flex items-center flex-1">
        <picture>
          <Avatar alt={name} img={photo} rounded className="me-4" />
        </picture>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h2>
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>

      {userData?._id === _id && (
        <Dropdown inline label="">
          <DropdownItem onClick={() => setIsEditing(true)}>Edit</DropdownItem>
          <DropdownItem onClick={handleDeletePost}>Delete</DropdownItem>
        </Dropdown>
      )}
    </header>
  );
}
