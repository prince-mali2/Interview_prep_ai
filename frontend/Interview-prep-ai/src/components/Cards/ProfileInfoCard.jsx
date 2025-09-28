import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import DUMMY_AVATAR from "../../assets/dummy.jpeg"; 

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center">
        {/* Profile Image with fallback */}
        <img
          src={!user?.profileImageUrl ? DUMMY_AVATAR : user.profileImageUrl  }
          alt="Dummy"
          className="w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover border border-gray-200"
        />

        {/* User Info */}
        <div>
          <div className="text-[15px] text-black font-bold leading-4">
            {user?.name}
          </div>
          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
