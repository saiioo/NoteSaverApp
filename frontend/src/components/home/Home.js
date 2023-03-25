import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Header from '../header/Header'
import './home.css'

const Home = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.user);
  const isDel = useSelector((state) => state.auth.deletedAll);
  const id = userid._id
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://superdupernotessaver.onrender.com/allnotes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setData(response.data.notes);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  },[isDel]);
  function getNotes(d){
    navigate(`/getnotes/${d}`)
  }
  const append = data.map((item)=>{
    return(
      <div onClick={() => getNotes(item._id)} className='homepage-notes-list' key={item._id}>
        <span className='timestamp-span'>
          <img src="https://cdn-icons-png.flaticon.com/512/3240/3240587.png" alt='clock' className='clock-icon' /> {item.updatedAt}
        </span>
        <h3 className='notes-title'>{item.title}</h3>
        <p className='notes-description'>{item.description}</p>
      </div>
    )
  })
  console.log(append)
  
  return (
    <div className='homepage-main-container'>
      <div className='homepage-header'>
      <Header />
      </div>
      <div className='homepage-content'>
        <div className='contnet-search'>
        <input  type="text" placeholder='Search' />
        </div>
      </div>
      {append}
    </div>
  )
}

export default Home