import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function _Auth(){
  const router = useRouter()
  const { _code } = router.query
  const [error,setError] = useState("")
  useEffect(() => {
    (async() => {
      if(_code) {
        let _loadUser = await axios.get(`/api/_auth/user?token=${_code}`)
        if(_loadUser.data.status === 401){
          setError("Token Incorrect")
        }
        if(_loadUser.data.status === 200){
          window.localStorage.setItem("__nego-auth", _code)
          router.push("/")
        }
      }
    })()
  })
  return(
    <>
      <div className="pt-24"></div>
      {error &&
      <div className="p-4 mb-1.5 bg-white shadow rounded-xl duration-300">
        <p className="text-red-500 text-center ">{error}</p>
      </div>
      }
    </>
  )
}