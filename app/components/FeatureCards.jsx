import React from 'react';
import FeatureCard from './FeatureCard';

const FeatureCards = () => {
  return (
    <div className="flex flex-col items-start w-full px-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <FeatureCard type="photo" />
        <FeatureCard type="link" />
      </div>
    </div>
  );
};

export default FeatureCards;
