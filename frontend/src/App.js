import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const fetchImages = async () => {
    const res = await axios.get('http://localhost:5000/images');
    setImages(res.data);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    await axios.post('http://localhost:5000/upload', formData);
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Galeri Gambar</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
        {images.map((img) => (
          <img key={img.id} src={img.url} alt={img.name} width="200" style={{ margin: 10 }} />
        ))}
      </div>
    </div>
  );
}

export default App;
