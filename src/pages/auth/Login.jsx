import { useContext, useState } from 'react';
import collage from '../../assets/collage.jpg';
import { set, useForm } from 'react-hook-form';
import { CoolModeCustom } from '@/components/magic/CoolMode';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/Authcontext';
import { login } from '@/services/auth';
import { AxiosError } from 'axios';
import { getSpotifyToken } from '@/services/spotify';

export function Login(){
  
    // auth
    const authContext = useContext(AuthContext)
    const { loginContext } = authContext
    
    // states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    // navigation
    const navigate = useNavigate()
    
    // forms
    const { register, handleSubmit, formState} = useForm()
    
    // submit
    const onSubmit = handleSubmit(async (data) => { 
      try {
        const form = {
          email: data.email,
          password: data.password
        }
        const response = await login(form)
        loginContext(response.user)
        const spotifyResponse = await getSpotifyToken()
        localStorage.setItem('spotifyToken', spotifyResponse)
        navigate("/home")
      }catch(error){
        if (error instanceof AxiosError && error.response) {
          if (error.response.data.error) {
            setError(error.response.data.error)
          } else {
            setError("The user does not exist")
          }
        } else {
          console.error("Unexpected error", error)
        }
      }
    })
    
    return (
        <div className="h-screen flex flex-col lg:flex-row items-center">
          <section className='w-full lg:w-1/2 sm:h-1/2 lg:h-3/4 bg-gradient-to-r from-dark to-[#0f0f0f] p-6 lg:p-10 rounded-lg'>
            <img src={collage} alt="collage" className="w-full h-full object-cover rounded-lg" />
          </section>
          <section className='flex flex-col items-center justify-center w-11/12 h-full lg:w-1/2 lg:h-3/4 bg-gradient-to-r from-prim via-strong to-violetneon rounded-xl lg:m-6 mb-6'>
            <form className='w-11/12 sm:w-3/4 lg:w-2/3 flex flex-col items-center justify-center gap-4 py-6 px-2 lg:px-12 rounded-xl bg-slate-200 border border-violetneon h-3/4'>
              <h1 className='text-2xl text-violetneon'>Login</h1>
              <input placeholder="Email" type="email" className="px-2 py-2 mt-4 rounded-lg w-full border-2 border-strong focus:ring focus:ring-violetneon focus:outline-none"
              {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              />
              <input placeholder="Password" type="password" className="px-2 py-2 mt-4 rounded-lg w-full border-2 border-strong focus:ring focus:ring-violetneon focus:outline-none"
              {...register("password", { required: true, minLength: 7 })}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
              {formState.errors.email ? (<p className="text-red-500 mt-2 text-center text-base">Email is not valid</p>) :
              formState.errors.password ? (<p className="text-red-500 mt-2 text-center text-base">Password must be at least 7 characters</p>) : null}
              {error ? <p className="text-red-500 mt-2 text-center font-bold">{error}</p> : null}
              <CoolModeCustom onClick={handleSubmit(onSubmit)} content="Login"/>
            </form>
          </section>
        </div>
    )
}