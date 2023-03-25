import Header from '../header/Header'
import './getnotes.css'
import {useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-hot-toast';

const GetNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState([]);
  const [deletednote,setDeletednote] = useState(true) 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://superdupernotessaver.onrender.com/getnotes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setData(response.data.notes[0]);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  },[]);

  
  function deletenote() {
    const fetchData = async () => {
      try {
        await axios.delete(`https://superdupernotessaver.onrender.com/deletenotes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`Note with id ${id} deleted successfully`);
        toast.success('Note delete successfully')
        navigate('/home')
        setDeletednote(false)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }  
function editnote(){
  navigate(`/editnotes/${id}`)
}

  console.log(data)

  return (
    <div>
      <div className='getnotes-main-container'>
        <div className='getnotes-header'>
          <Header />
        </div>
        <div className='getnotes-content'>
          <div className='getnotes-settings'>
            <img className='note-delete-icon' onClick={deletenote} src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png" alt="delete-icon"/>
            <img className='note-edit-icon' onClick={editnote} src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="edit-icon"/>
          </div>
        </div>
        {deletednote && 
        <div  className='homepage-notes-list'>
        <span className='timestamp-span'>
          <img src="https://cdn-icons-png.flaticon.com/512/3240/3240587.png" alt='clock' className='clock-icon' /> {data.updatedAt}
        </span>
        <h3 className='notes-title'>{data.title}</h3>
        <p className='notes-description'>{data.description}</p>
      </div>}
      </div>
    </div>
  )
}

export default GetNotes