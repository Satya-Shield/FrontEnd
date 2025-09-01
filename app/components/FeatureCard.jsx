import React, { useState } from 'react';
import { FaImage, FaLink } from 'react-icons/fa';

const FeatureCard = ({ type, onFileSelect, onUrlSelect }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const cardConfig = {
    photo: {
      icon: <FaImage className="w-7 h-7 text-white mb-3" />,
      title: 'Add a photo to verify',
      description: 'Upload an image that supports your claim.'
    },
    link: {
      icon: <FaLink className="w-7 h-7 text-white mb-3" />,
      title: 'Share a link to verify',
      description: 'Paste a link related to your claim.'
    }
  };

  const handleFileChange = (e) => {
    console.log(`selected file was ${e.target.files[0]}`);
    console.log(e);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (onFileSelect) onFileSelect(selectedFile);
  };

  const handleUrlChange = (e) => {
    console.log(`selected url was ${e.target.value}`);
    console.log(e);
    const value = e.target.value;
    setUrl(value);
    if (onUrlSelect) onUrlSelect(value);
  };

  const config = cardConfig[type];
  if (!config) return null;

  return (
    <div className="max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      {config.icon}
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">{config.title}</h5>
      <p className="mb-3 font-normal text-gray-300">{config.description}</p>

      {type === 'photo' && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-white"
        />
      )}
      {type === 'link' && (
        <input
          type="text"
          placeholder="Enter the URL"
          value={url}
          onChange={handleUrlChange}
          className="w-full p-2 rounded bg-black text-white border border-gray-600"
        />
      )}
    </div>
  );
};

export default FeatureCard;
