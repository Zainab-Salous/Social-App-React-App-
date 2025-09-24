import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch(queryKey, endpoint, userData){
 const {data, isLoading, isError, error} =useQuery({
    queryKey: queryKey,
    queryFn: getPost,
    select:(data) => data.data,
    enabled: !!userData, 
  })


  async function getPost() {
  
      return  await axios.get(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

    }
    return {data, isLoading, isError, error};
      
}