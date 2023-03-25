import React from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import {deleAll, setLogout} from '../store/slice'
import { toast } from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.user);
  const id = userid._id

  function handleHome(){
    navigate('/home')
  }
const handleDeleteAll = async () => {
  try {
    const response = await axios.delete(`https://superdupernotessaver.onrender.com/deleteall/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(deleAll())
    toast.success('Deleted')
    console.log('Data deleted successfully:', response.data);
  } catch (error) {
    console.error('Failed to delete data:', error);
  }
};

function logout(){
  dispatch(setLogout())
  navigate('/')
}

  function handleAddNote(){
    navigate('/addnotes')
  }
  return (
    <div className='header-main-div'>
      <div className='header-right-div'>
        
      <div onClick={handleHome} className='home-span'>
        <span>
          <img className='header-icon' src='https://cdn-icons-png.flaticon.com/512/6268/6268612.png' alt=''/>Home
        </span>
      </div>
      <div onClick={handleAddNote} className='addnote-span'>
        <span>
          <img className='header-icon' src='https://cdn-icons-png.flaticon.com/512/2043/2043239.png' alt=''/>AddNote
        </span>
      </div>
      <div  onClick={handleDeleteAll} className='delete-span'>
        <span>
          <img className='header-icon' src='https://cdn-icons-png.flaticon.com/512/6096/6096937.png' alt=''/>DeleteAll
        </span>
      </div>
      {/* <div className='export-span'>
        <span>
          <img className='header-icon' src='https://cdn-icons-png.flaticon.com/512/9017/9017911.png' alt=''/>Export
        </span>
      </div> */}
      </div>
      <div className='header-left-div'>
        <button onClick={logout} className='button-85'>Logout</button>
      </div>
    </div>
  )
}

export default Header