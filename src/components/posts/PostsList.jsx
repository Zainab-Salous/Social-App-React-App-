import PostItem from "./PostItem";
import { AuthContext } from "./../../context/AuthContext";
import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import Skeleton from "react-loading-skeleton";

export default function PostsList({ isHome = true }) {
  const { userData } = useContext(AuthContext);
  const queryKey = isHome ? ["all-posts"] : ["user-posts", userData?._id];
  const apiUrl = isHome
    ? `posts?limit=10&sort=-createdAt`
    : `users/${userData?._id}/posts`;

  const {data, isLoading, isError, error}=useFetch(queryKey, apiUrl,userData);



  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-6">
          {isLoading && (
           <Skeleton className="h-96 mb-4" highlightColor="#111827" baseColor="#1f2937" count={3}/>
          )}
          {isError && (
            <div className="text-center text-red-500 font-semibold">
              {error.message}
            </div>
          )}
          {data?.posts?.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
