import { CoolModeCustom } from "@/components/magic/CoolMode"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export function SignUp(){
  
  // form
  const { register, handleSubmit, formState, reset } = useForm()
  
  // constants
  const currentYear = new Date().getFullYear()
  const maxYear = currentYear - 12
  const minYear = currentYear - 100
  
  // values
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [year, setYear] = useState(2006)
  const [avatar, setAvatar] = useState('')
  const [image, setImage] = useState('/vinylo.png')
  const [error, setError] = useState('')
  
  // control of states
  useEffect(()=>{
    if(avatar!=''){
      setImage(avatar)
    }
  },[avatar])
  
  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="relative w-11/12 sm:w-3/4 lg:w-1/3 flex flex-col items-center gap-4 py-6 px-12 rounded-xl
          bg-gradient-to-br from-strong from-35% to-violetneon
          before:absolute before:inset-0
          before:rounded-xl
          before:bg-gradient-to-br before:from-light before:to-strong
          before:opacity-10
          before:blur-xl
          border-2 border-strong shadow-xl
          before:-z-10
          ">
        <h1 className="text-2xl text-center font-bold text-white mb-2">Sign Up</h1>
        <img src={image} className="rounded-full w-12 h-12 mt-4" />
        <input type="number" placeholder="2006" value={year} 
        {...register("year", { required: true, min: minYear, max: maxYear })}
        onChange={(e) => setYear(parseInt(e.target.value))}
        className="border border-violetneon text-violetneon text-lg text-center w-1/3 rounded-lg"/>
        <input placeholder="Email" type="email" className="px-2 py-2 rounded-lg w-full focus:ring focus:ring-violetneon focus:outline-none"
        {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
        <input placeholder="Password" type="password" className="px-2 py-2 rounded-lg w-full focus:ring focus:ring-violetneon focus:outline-none"
        {...register("password", { required: true, minLength: 7 })}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
        <input placeholder="Name" type="text" className="px-2 py-2 rounded-lg w-full focus:ring focus:ring-violetneon focus:outline-none"
        {...register("name", { required: true, minLength: 3 })}
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input placeholder="Username" type="text" className="px-2 py-2 rounded-lg w-full focus:ring focus:ring-violetneon focus:outline-none"
        {...register("username", { required: true, minLength: 3 })}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <input placeholder="URL Avatar" type="url" 
        className="px-2 py-2 rounded-lg w-full focus:ring focus:ring-violetneon focus:outline-none" 
        {...register("avatar", { required: true,
          pattern: {
          value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
          message: "Must be a valid URL"
          }
        })}
        onChange={(e) => setAvatar(e.target.value)}
        />
        {formState.errors.email ? (<p className="text-white mt-2 text-center text-tiny">Email is not valid</p>) :
        formState.errors.password ? (<p className="text-white mt-2 text-center text-tiny">Password must be at least 7 characters</p>) :
        formState.errors.name ? (<p className="text-white mt-2 text-center text-tiny">Name must be at least 3 characters</p>) :
        formState.errors.username ? (<p className="text-white mt-2 text-center text-tiny">Username must be at least 3 characters</p>) :
        formState.errors.avatar ? (<p className="text-white mt-2 text-center text-tiny">Avatar is not a url valid</p>) : null}
        {error ? <p className="text-white mt-2 text-center font-bold">{error}</p> : null} 
        <CoolModeCustom onClick={handleSubmit(onSubmit)} content="Sign Up"/>
      </form>
    </div>
  )
}