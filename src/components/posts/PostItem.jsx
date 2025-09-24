import { Avatar, Card } from "flowbite-react";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import commentImg from "/images/images.png";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";
import CardHeader from "./CardHeader";

export default function PostItem({ post, showAllComments = false }) {
  const { body, image, user, createdAt, comments, _id } = post;

  return (
    <Card>
      {/*Header*/}

      <CardHeader user={{ ...user}} createdAt = {createdAt}  body = {body} mediaId={_id}  isComment = {false}/>
       <h2
        className="text-lg font-bold tracking-tight text-gray-900 dark:text-white "
      >
        {body}
      </h2>

     {image && <img src={image || commentImg} className="h-96 object-contain" alt={body} />}

      {/*footer*/}
      <div className="flex items-center justify-between text-xl text-gray-500">
        <AiFillLike />
        <div className="flex items-center gap-2">
          <FaComment />
          {comments && comments.length}
        </div>

        <Link to={`posts/${post?._id}`}>
          {" "}
          <FaShare />
        </Link>
      </div>

      {/**comments */}
     {comments && comments.length > 0 ? (
  showAllComments ? (
    comments.map((comment) => (
      <CommentItem 
        key={comment._id} 
        isComment={true}
        comment={comment}
      />
    ))
  ) : (
    
  <CommentItem
    comment={comments[comments.length - 1]} 
    isComment={true}
  />


  )
) : null}
<AddComment post={_id} />

    </Card>
  );
}
