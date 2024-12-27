import { CoolModeCustom } from "@/components/magic/CoolMode"
import { AuthContext } from "@/context/Authcontext"
import { updateUser } from "@/services/user"
import { useContext, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"

export const Profile = () => {

    // navigation
    const navigate = useNavigate()

    // form
    const { register, handleSubmit, formState } = useForm()

    // context
    const authContext = useContext(AuthContext)

    const { user, isLoading, updateUserContext } = authContext

    // constants
    const currentDate = new Date()

    // states
    const [newAvatar, setNewAvatar] = useState(user?.avatar)
    const year = user?.year
    const email = user?.email
    const [name, setName] = useState(user?.name)
    const [username, setUsername] = useState(user?.username)
    const [dateInit, setDateInit] = useState(user?.dateInit || currentDate.toISOString().split('T')[0])
    const [messageDate, setMessageDate] = useState('')

    if(isLoading){
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        )
    }

    if(!user){
        return <Navigate to="/login" />
    }


    // control of states
    useEffect(()=>{
        if (user.dateInit == null) {
            setMessageDate('You do not have a date of initiation in the app, select one, this will be not editable')
        }
    },[user.dateInit])


    // functions

    const onSubmit = async (data) => {
        try{
            const form = {
                name: data.name,
                username: data.username,
                avatar: data.avatar,
                dateInit: data.dateInit
            }
            const response = await updateUser(user.id, form)
            updateUserContext(response.user)
            navigate('/home')
        }catch(error){
            console.error("Unexpected error", error)
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <section className="bg-slate-200 w-1/3 rounded-lg border-2 border-strong">
                <form className="py-6 px-3 flex flex-col items-center gap-4">
                    <img src={newAvatar || 'vinylo.png'} alt="" className="w-20 h-20 rounded-full border-2 border-violetneon" />
                    <input placeholder={newAvatar} type="url" 
                    className="px-2 py-2 rounded-lg w-full border-1 border-prim focus:ring focus:ring-violetneon focus:outline-none" 
                    {...register("avatar", { required: true,
                    pattern: {
                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                    message: "Must be a valid URL"
                    }
                    })}
                    value={newAvatar}
                    onChange={(e) => setNewAvatar(e.target.value)}
                    />
                    <input type="number" value={year} 
                    {...register("year")}
                    disabled
                    className="border-2 border-violetneon text-violetneon text-lg text-center w-1/3 rounded-lg bg-slate-200"/>
                    <input placeholder="Email" type="email" className="px-2 py-2 rounded-lg w-full focus:ring focus:ring-violetneon focus:outline-none text-center border-2 border-prim bg-slate-200"
                    {...register("email")}
                    value={email}
                    disabled
                    />
                    <input placeholder="Name" type="text" className="px-2 py-2 rounded-lg w-full focus:ring focus:ring-violetneon focus:outline-none text-center border-1 border-prim"
                    {...register("name", { required: true, minLength: 3 })}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <input placeholder="Username" type="text" className="px-2 py-2 rounded-lg w-full focus:ring focus:ring-violetneon focus:outline-none text-center border-1 border-prim"
                    {...register("username", { required: true, minLength: 3 })}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    {messageDate && <p className="text-dark text-center text-tiny w-2/3">{messageDate}</p>}
                    <input placeholder="Date Init" type="date" className={`px-2 py-2 rounded-lg w-full focus:ring focus:ring-violetneon focus:outline-none text-center border-1 border-prim ${user.dateInit != null ? 'bg-slate-200' : ''}`}
                    {...register("dateInit")}
                    value={dateInit}
                    onChange={(e) => setDateInit(e.target.value)}
                    disabled={user.dateInit != null}
                    />
                    {
                    formState.errors.name ? (<p className="text-red-500 mt-2 text-center text-tiny">Name must be at least 3 characters</p>) :
                    formState.errors.username ? (<p className="text-red-500 mt-2 text-center text-tiny">Username must be at least 3 characters</p>) :
                    formState.errors.avatar ? (<p className="text-red-500 mt-2 text-center text-tiny">Avatar is not a url valid</p>) : null
                    }
                    <CoolModeCustom onClick={handleSubmit(onSubmit)} content="Update Profile"/>
                </form>
            </section>
        </div>
    )
}