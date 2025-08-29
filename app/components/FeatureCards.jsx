import React from 'react';
import FeatureCard from './FeatureCard';

const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-16">
      <FeatureCard type='photo'/>
      <FeatureCard type='video'/>
      <FeatureCard type='link'/>
    </div>
  );
};

export default FeatureCards;
