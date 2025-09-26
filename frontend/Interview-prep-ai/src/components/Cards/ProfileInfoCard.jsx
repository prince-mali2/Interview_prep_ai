import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../context/userContext';



const ProfileInfoCard = () => {
    const {user, clearUser} = useContext(UserContext);
    const navigate = useNavigate
    ();

    const handleLogOut = () =>{
      localStorage.clear();
      clearUser();
      navigate("/");
    }
     

  return user && (
    
    <div className="flex items-center">
      {user && 
      <img src={user.profileImageUrl} alt="Profile Image" className="w-11 h-11 gb-gray-300 rounded-full mr-3" />
      }

      <div>
        <div className="text=[15px] text-black font-bold leading-3" >
          {user.name}
        </div>
        <button className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
        onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileInfoCard