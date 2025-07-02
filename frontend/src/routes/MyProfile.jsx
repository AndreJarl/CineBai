import React, { useEffect, useState } from 'react'
import { userAuthStore } from '../store/authUser'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function MyProfile() {

    const [profile, setProfile] = useState([]);
        const {user} = userAuthStore();
        const navigate = useNavigate();

      useEffect(()=>{
                const getMyProfile = async () =>{
              try {
                if(!user){
                    setTimeout(()=>{
                        navigate('/login');
                    },1000);
                    toast.error("Please login.")
                }

                const res = await axios.get("/api/user/myProfile");
                setProfile(res.data.user);
                console.log(res.data.user);

              } catch (error) {
                
              }
        }
        getMyProfile();
      }, []);
 

  return (
    <div>{profile.username}</div>
  )
}

export default MyProfile