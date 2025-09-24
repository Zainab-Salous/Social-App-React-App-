import { useParams } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function PostDetails() {
    const { userData } = useContext(AuthContext);
  
  const { id } = useParams();

const {data, isLoading, isError, error}= useFetch(['details-posts', id], `posts/${id}`, userData);
      


  return (
     <section className="py-12">
    <div className="max-w-3xl mx-auto ">
        <div className='flex flex-col gap-6'>
                {isLoading && (
            <div className="text-center text-lg font-semibold">Loading...</div>
          )}
          {isError&& (
            <div className="text-center text-red-500 font-semibold">
              {error}
            </div>
          )}
            {data &&<PostItem post={data.post} showAllComments={true}  isComment={true}/>}
            
       </div>
      </div>
    </section>
  );
}
