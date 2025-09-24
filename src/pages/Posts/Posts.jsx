import { useEffect } from "react";
import Add from "../../components/posts/Add";
import PostsList from "../../components/posts/PostsList";


export default function Posts() {
  useEffect(() => {
    document.title = "Social App | Posts";
  }), [];



  return (
 <>
 <Add/>
 
 <PostsList/>
 </>
  )
}
