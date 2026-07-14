import React, { useRef, useState } from 'react';

const TiltCard = ({ children, className = "", style = {}, maxRotation = 10 }) => {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width; // percentage across card (0 to 1)
    const y = (e.clientY - top) / height; // percentage down card (0 to 1)
    
    const rotateY = (x - 0.5) * maxRotation; // -max to +max
    const rotateX = (0.5 - y) * maxRotation; // -max to +max (invert y)
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out, box-shadow 0.25s ease',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
