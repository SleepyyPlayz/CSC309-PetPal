import React, { useState } from 'react';

const CreateBlog = ({isLoggedIn}) => {
if (!isLoggedIn) {
        window.location.href = '/login'
    }
      
    
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const accessToken = localStorage.getItem('access');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (image !== null) {
        formData.append('image', image);
    }
   
    try {
      const response = await fetch('http://127.0.0.1:8000/shelter_blogs/', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        
      });

      if (response.ok) {
        console.log('Blog created successfully!');
      } else {
        console.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
<div className="container mt-5">
  <h2>Create a New Blog</h2>
  <form onSubmit={handleSubmit}>

    <div className="mb-4">
      <label htmlFor="title" className="form-label">Title: </label>
      <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} />
    </div>


        <div className="mb-4">
        <label htmlFor="text" className="form-label">Text:    </label>
        <textarea className="form-control" id="text" rows="6" value={text} onChange={handleTextChange}></textarea>
        </div>
    <div className="mb-4">
      <label htmlFor="image" className="form-label">Image: </label>
      <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} />
    </div>
    <button type="submit" className="btn btn-primary">Submit </button>
  </form>
</div>
  );
};

export default CreateBlog;