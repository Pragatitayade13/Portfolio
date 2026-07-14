import React, { useRef, useState } from 'react';

const SpotlightCard = ({ children, className = "", style = {} }) => {
  const ref = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    setCoords({ x: e.clientX - left, y: e.clientY - top });
    setOpacity(1);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={ref}
      className={`card spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        transition: 'var(--transition)'
      }}
    >
      {/* Spotlight background mask */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(155, 124, 255, 0.08), transparent 80%)`,
        opacity: opacity,
        transition: 'opacity 0.3s ease',
        zIndex: 1
      }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
