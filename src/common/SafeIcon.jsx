import React from 'react';
import * as FiIcons from 'react-icons/fi';

const SafeIcon = ({ icon, name, className, ...props }) => {
  let IconComponent;
  
  try {
    // If icon is passed directly, use it
    if (icon && typeof icon === 'function') {
      IconComponent = icon;
    }
    // If name is passed, try to find it in FiIcons
    else if (name && FiIcons[name]) {
      IconComponent = FiIcons[name];
    }
    // If name starts with 'Fi', try to find it
    else if (name && FiIcons[`Fi${name}`]) {
      IconComponent = FiIcons[`Fi${name}`];
    }
    // Default fallback
    else {
      IconComponent = FiIcons.FiAlertTriangle;
    }
  } catch (e) {
    console.warn('SafeIcon: Error loading icon:', e);
    IconComponent = FiIcons.FiAlertTriangle;
  }
  
  return (
    <IconComponent 
      className={className} 
      {...props} 
    />
  );
};

export default SafeIcon;
