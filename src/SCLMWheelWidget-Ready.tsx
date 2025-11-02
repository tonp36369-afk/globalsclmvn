import React, { useState, useEffect } from 'react';

interface SCLMWheelWidgetProps {
  gameUrl?: string;
  position?: { bottom?: string; right?: string; top?: string; left?: string };
  size?: string;
  autoShow?: boolean;
  enableDrag?: boolean;
  onGameOpen?: () => void;
  onGameClose?: () => void;
}

const SCLMWheelWidget: React.FC<SCLMWheelWidgetProps> = ({
  gameUrl = '/vong-quay-may-man.html',
  position = { bottom: '20px', right: '20px' },
  size = '120px',
  autoShow = true,
  enableDrag = true,
  onGameOpen,
  onGameClose,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState(position);

  const texts = [
    'VÒNG QUAY\nMAY MẮN', 'TRÚNG\nTHƯỞNG', 'MAY MẮN\nNGAY',
    'QUAY\nNGAY', 'GIẢI\nKHỦNG', 'SCLM\nGLOBAL'
  ];

  // Auto rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 60) % 360);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto notification
  useEffect(() => {
    if (!autoShow) return;
    const interval = setInterval(() => {
      if (!isModalOpen) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [isModalOpen, autoShow]);

  // Position styles
  const getPositionStyle = () => {
    const base = { position: 'fixed' as const, zIndex: 9999 };
    return { ...base, ...widgetPosition };
  };

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent) => {
    if (!enableDrag) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !enableDrag) return;
    const newPosition = {
      left: `${e.clientX - 60}px`,
      top: `${e.clientY - 60}px`,
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

  const handleOpenGame = () => {
    setIsModalOpen(true);
    setShowNotification(false);
    onGameOpen?.();
  };

  const handleCloseGame = () => {
    setIsModalOpen(false);
    onGameClose?.();
  };

  return (
    <>
      {/* Widget Button */}
      <div
        onMouseDown={handleDragStart}
        onClick={handleOpenGame}
        style={{
          ...getPositionStyle(),
          width: size,
          height: size,
          cursor: enableDrag ? 'move' : 'pointer',
          transition: isDragging ? 'none' : 'transform 0.3s',
        }}
      >
        {/* Wheel Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          boxShadow: '0 8px 24px rgba(255, 215, 0, 0.4), 0 0 0 8px rgba(255, 255, 255, 0.2)',
          animation: 'pulse 2s infinite',
        }}>
          {/* Rotating Wheel */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            transition: 'transform 2s ease-in-out',
            width: '90%',
            height: '90%',
          }}>
            {texts.map((text, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 60}deg) translate(0, -35px)`,
                  transformOrigin: '0 0',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: i % 2 === 0 ? '#FF4500' : '#FFD700',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {text}
              </div>
            ))}
          </div>

          {/* Center Circle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF4500 0%, #FF6347 100%)',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            🎁
          </div>

          {/* Notification Badge */}
          {showNotification && (
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              background: '#FF4500',
              color: 'white',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              animation: 'bounce 1s infinite',
              boxShadow: '0 4px 12px rgba(255, 69, 0, 0.5)',
            }}>
              !
            </div>
          )}
        </div>
      </div>

      {/* Modal Game */}
      {isModalOpen && (
        <div
          onClick={handleCloseGame}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              height: '90vh',
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseGame}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                zIndex: 10001,
                background: '#FF4500',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ×
            </button>

            {/* Game iframe */}
            <iframe
              src={gameUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="SCLM Vòng Quay May Mắn"
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
};

export default SCLMWheelWidget;
