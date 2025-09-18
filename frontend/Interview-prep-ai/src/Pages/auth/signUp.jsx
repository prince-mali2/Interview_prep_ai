import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { validateEmail } from '../../utils/helper'



const signUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic]=useState(null)
  const [fullName, setFullName]=useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword] = useState(null);

  const [error, SetError] = useState(null);
  const navigate = useNavigate();

  //handle Signup Form Submit
  const handleSignUp = async(e)=>{
     
    e.preventDefault();
    let profileImageUrl ="";

    if(!fullName){
      SetError("Please enter full name.");
      return;
    }

    if(!validateEmail(email)){
      SetError("Please enter a valid email address.");
      return;
    }

    if(!password){
      SetError("Please enter the password");
      return;
    }

    SetError("");

    //Signup API call
    try{

    }
    catch(error){
      if(error.response && error.response.data.message){
        SetError(error.response.data.message)
      }
      else{
        SetError("Something went wrong. Please try again");
      }
    }
      
  
  };
  
  return (

    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
    <h3 className="text-lg font-semibold text-black">Create an Account</h3>
    <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below.</p>
 
     <form onSubmit={handleSignUp}>
      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
       <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
         <Input
         value={fullName}
         onChange={({target})=>setFullName(target.value)}
         label="Full Name"
         placeholder="John"
         type="text"
         />
         <Input
         value={email}
         onChange={({target})=>setEmail(target.value)}
         label="Email address"
         placeholder="John@example.in"
         type="text"
         />
         <Input
         value={password}
         onChange={({target})=>setPassword(target.value)}
         label="Password"
         placeholder="Min 8 characters"
         type="password"
         />
       </div>
       {error && <p className="text-red-500 text-xs pb-2.5">{error}</p> }
       <button type="submit" className="btn-primary flex justify-center items-center">
         SignUp
       </button>
 
       <p className="text-[13px] text-slate-800 mt-3">
         Already an account?{" "}
         <button className="font-medium text-primary underline cursor-pointer" onClick={()=>{
           setCurrentPage("login")
         }}
         >Login</button>
       </p>
     </form>
 
    </div>
   
  )
}

export default signUp