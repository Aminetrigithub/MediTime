import { useContext, useState } from "react";
import  {AdminContext}  from "../context/AdminContext";
import axios from "axios"
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAToken, backendUrl} =  useContext(AdminContext)

  const onSubmitHandler = async(event) => {
    event.preventDefault()
    try {
      if (state === 'Admin') {
        
        const {data} = await axios.post(backendUrl + 'api/admin/login', {email, password})
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
        }
        else toast.error(data.message)
      } else { console.log("mad5alch lel if t3adda lel else");
        
      }
    } catch (error) {
      console.log("mad5alch jomla t3adda lel catch", error.message);
    }

   }
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh]  flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span> Login</p>
        <div className="w-full">
          <p>Email</p>
          <input type="email" required className="border border-[#DADADA] rounded w-full p-2 mt-1" 
          onChange={(e) => { setEmail(e.target.value) }} value= {email} />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input type="password" required className="border border-[#DADADA] rounded w-full p-2 mt-1" 
          onChange={(e) => { setPassword(e.target.value) }} value= {password} />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
        {
          state === 'Admin' 
          ? <p>Doctor Login? <span className= "text-primary cursor-pointer underline" onClick = {() => { setState('Doctor') }}>Click here</span></p>
          : <p>Admin Login? <span className= "text-primary cursor-pointer underline" onClick = {() => { setState('Admin') }}>Click here</span></p>
        }

      </div>
    </form>
  );
};

export default Login;
