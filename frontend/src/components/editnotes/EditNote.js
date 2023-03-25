import {useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../addnotes/addnotes.css'
import Header from '../header/Header';
import './editnotes.css'

const EditNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.user);
  const _id =  userid._id
  const [data, setData] = useState([]);
  const [defDesc, setDefDes] = useState('');
  const [defTitle , setDefTitle] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://superdupernotessaver.onrender.com/getnotes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setData(response.data.notes[0]);
        setDefDes(data.description)
        setDefTitle(data.title)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  },[]);
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`https://superdupernotessaver.onrender.com/editnote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({id:_id, title, description}),
    });
  
    if (response.ok) {
      console.log('Note updated successfully');
      navigate('/home')
    } else {
      console.error('Failed to update note');
    }
  };
  
  return (
    <div className='addnotespage-main-container editnotespage-main'>
      <div className='addnotespage-header'>
        <Header />
      </div>
      <h1 className='title-head-edit'>Title : {data.title}</h1>
      <div className='addnotes-content'>
        <div className='addnotespage-block'>
          <form onSubmit={handleSubmit} className='addnotespage-form'>
              <label className='addnotes-label' htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={title}
                defaultValue={defTitle}
                onChange={(event) => setTitle(event.target.value)}
              />
              <label className='addnotes-label' htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                defaultValue={defDesc}
              />
            <div className='addnotes-button-div'>
              <button className='button-84' type="submit">Update Notes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditNote