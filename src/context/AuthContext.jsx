import axios from 'axios'
import  { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()
export default function AuthContextProvider({children}) {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null)
    
    useEffect(() => {
        const storedToken  = localStorage.getItem("token");
        if(storedToken ){
            setToken(storedToken)
        }
        getProfileData()
    }, [])
 
    useEffect(() => {
        if(token){
            getProfileData(token)
        }else{
            setUserData(null);
        }
    }, [token])

    async function getProfileData(token){ 
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile-data`, {
                headers: {
                    token: token,
                }
            }
            )

            if(data.message === "success"){
                setUserData(data.user)
            }else if(data.error){
                throw new Error(data.error)
            }
            
        } catch (error) {
            console.log(error);
            
            
        }
    }

   
  return (
    <AuthContext.Provider value={{token, setToken, userData,getProfileData}}>
      {children}
    </AuthContext.Provider>
  ); 

}
