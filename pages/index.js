import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_HOST } from '../config'
import { useRouter } from 'next/router'
const Home =  () => {
  const [s,i] = useState(false)
  const router = useRouter()
  const [user,setUser] = useState({})
  useEffect(() => {
    (async() => {
      let dtoken = window.localStorage.getItem("__nego-auth")
    if(!dtoken){
      i(false)
    }
      let data = await axios.get(`/api/_auth/user?token=${dtoken}`)
      if(data.data.status === 401){
        i(false)
      }
      if(data.data.status === 200){
        i(true)
        setUser(data.data)
      }
    })()
    
  })
  return (
   <>
     {s ?(
     <div className="pt-24">
      <div className="p-4 mb-1.5 bg-white shadow rounded-xl">
        <div className="pt-6">
        <img src={user.avatarURL} className="r border-2 border-indigo-500" />
        </div>
        <p className="pt-6 text-gray-300">ID: {user.id}</p>
       
        <p className="pt-6 text-gray-300">Username: {user.username}</p>
        <p className="pt-6 text-gray-300">Discriminator: {user.discriminator}</p>
        
      </div>
     </div>
     ):(
     <div className="pt-24">
       <div className="p-4 ">
         <button className="py-3 px-5 rounded-xl bg-indigo-500 text-white" onClick={() => router.push(`${API_HOST}/auth/login`)}>Login With Discord</button>
       </div>
       </div>
     )}
   </>
  )
}

export default Home