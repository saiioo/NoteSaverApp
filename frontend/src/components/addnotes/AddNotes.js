import React, { useState } from 'react'
import Header from '../header/Header'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import './addnotes.css'

const AddNotes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.auth.user);
  const id = data._id


  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('https://superdupernotessaver.onrender.com/addnotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, id}),
    });

    if (response.ok) {
      console.log('Note added successfully');
      toast.success('notes saved successfully')
      setDescription('')
      setTitle('')
    } else {
      console.error('Failed to add note');
    }
  };
  return (
    <div className='addnotespage-main-container'>
      <div className='addnotespage-header'>
        <Header />
      </div>
      <div className='addnotes-content'>
        <div className='addnotespage-block'>
          <form onSubmit={handleSubmit} className='addnotespage-form'>
              <label className='addnotes-label' htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <label className='addnotes-label' htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            <div className='addnotes-button-div'>
              <button className='button-50' type="submit">Add Note</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNotes