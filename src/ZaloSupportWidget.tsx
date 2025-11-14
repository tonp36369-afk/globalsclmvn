import React, { useState, useEffect } from 'react';

interface ZaloSupportWidgetProps {
  zaloUrl?: string;
  position?: { bottom?: string; left?: string; top?: string; right?: string };
  size?: string;
  enableDrag?: boolean;
}

const ZaloSupportWidget: React.FC<ZaloSupportWidgetProps> = ({
  zaloUrl = 'https://zalo.me/0813789127',
  position = { bottom: '20px', left: '20px' },
  size = window.innerWidth <= 768 ? '60px' : '80px',
  enableDrag = true,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState(position);
  const [pulse, setPulse] = useState(true);

  // Position styles
  const getPositionStyle = () => {
    const base = { position: 'fixed' as const, zIndex: 9998 };
    return { ...base, ...widgetPosition };
  };

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent) => {
    if (!enableDrag) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !enableDrag) return;
    const newPosition = {
      left: `${e.clientX - 40}px`,
      top: `${e.clientY - 40}px`,
      right: 'auto',
      bottom: 'auto',
    };
    setWidgetPosition(newPosition);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging]);

  // Pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (!isDragging) {
      window.open(zaloUrl, '_blank');
    }
  };

  return (
    <>
      <div
        onMouseDown={handleDragStart}
        onClick={handleClick}
        style={{
          ...getPositionStyle(),
          width: size,
          height: size,
          cursor: enableDrag ? 'move' : 'pointer',
          transition: isDragging ? 'none' : 'transform 0.3s',
        }}
      >
        {/* Support Circle */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0068FF 0%, #0095FF 100%)',
          boxShadow: '0 6px 20px rgba(0, 104, 255, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid white',
          transform: pulse ? 'scale(1)' : 'scale(1.05)',
          transition: 'transform 0.3s ease',
        }}>
          {/* Zalo Icon/Text */}
          <div style={{
            fontSize: '28px',
            marginBottom: '2px',
          }}>
            💬
          </div>
          <div style={{
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: '1.1',
          }}>
            HỖ TRỢ<br/>24/7
          </div>

          {/* Online Badge */}
          <div style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#00FF00',
            border: '2px solid white',
            boxShadow: '0 2px 8px rgba(0, 255, 0, 0.5)',
          }} />
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 104, 255, 0.4), 0 0 0 10px rgba(0, 104, 255, 0.4), 0 0 0 20px rgba(0, 104, 255, 0.4);
          }
          100% {
            box-shadow: 0 0 0 10px rgba(0, 104, 255, 0.4), 0 0 0 20px rgba(0, 104, 255, 0.2), 0 0 0 30px rgba(0, 104, 255, 0);
          }
        }
      `}</style>
    </>
  );
};

export default ZaloSupportWidget;
