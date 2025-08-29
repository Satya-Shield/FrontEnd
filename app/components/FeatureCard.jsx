import React from 'react';
import { FaImage, FaVideo, FaLink } from 'react-icons/fa';

const FeatureCard = ({ type }) => {
  const cardConfig = {
    photo: {
      icon: <FaImage className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />,
      title: 'Add a photo to verify',
      description: 'Here we could put some detail about how we will verify the given image.'
    },
    video: {
      icon: <FaVideo className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />,
      title: 'Add a video to verify',
      description: 'Step-by-step detail of how we verify the video we can put:'
    },
    link: {
      icon: <FaLink className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />,
      title: 'Share a link to verify',
      description: 'Check out whether your link speaks the truth to you:'
    }
  };

  const config = cardConfig[type];
  if (!config) return null;

  return (
    <div className="max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      {config.icon}
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">
        {config.title}
      </h5>
      <p className="mb-3 font-normal text-gray-300">{config.description}</p>
    </div>

  );
};

export default FeatureCard;
