import { useNavigate } from "react-router-dom"

export function Header(){
  
  const navigate = useNavigate()
  
  const gotoSignup = () => {
    navigate("/signup")
  }
  
  const gotoLogin = () => { 
    navigate("/login")
  }
  
  return (
    <header className="flex justify-between px-4 py-4">
      <div className="flex gap-3">
        <img src="/vinylo.png" alt="Vinylo Logo" className="h-8 w-8"/>
        <h1 className="text-prim text-2xl">Vinylo</h1>
      </div>
      <div className="flex gap-4 px-2">
        <button className="bg-strong text-white px-4 sm:px-8 py-2 rounded-md border-2 border-lightviolet hover:bg-violetneon" onClick={gotoLogin}>Sign in</button>
        <button className="bg-black text-white px-4 sm:px-8 py-2 rounded-md border-2 border-strong hover:bg-dark"
        onClick={gotoSignup}
        >Sign up</button>
      </div>
    </header>
  )
}