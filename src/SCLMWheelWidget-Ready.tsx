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
  size = window.innerWidth <= 768 ? '80px' : '120px',
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

  // Hiển thị chữ 'LUCKY SPIN' uốn cong xung quanh logo nút
  const luckySpin = 'LUCKY SPIN';
  // Tạo từng ký tự uốn cong đều quanh vòng tròn
  const texts = Array.from({ length: 12 }, (_, i) => luckySpin[i] ? luckySpin[i] : '');

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
        {/* Wheel Container - Outer Ring with Sparkles */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #FFD700, #FF6B00, #FFD700, #FF6B00, #FFD700, #FF6B00, #FFD700, #FF6B00, #FFD700)',
          boxShadow: '0 0 30px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 107, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3)',
          animation: 'glow 2s ease-in-out infinite',
        }}>
          {/* Inner Decorative Ring */}
          <div style={{
            position: 'absolute',
            top: '8%',
            left: '8%',
            width: '84%',
            height: '84%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0a2e65 0%, #154a9a 50%, #0a2e65 100%)',
            boxShadow: 'inset 0 0 20px rgba(255, 215, 0, 0.3), 0 0 15px rgba(10, 46, 101, 0.5)',
          }}>
            {/* Rotating Stars Pattern */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              transition: 'transform 2s ease-in-out',
              width: '100%',
              height: '100%',
            }}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-38px)`,
                    transformOrigin: '0 0',
                    fontSize: '16px',
                    color: '#FFD700',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                  }}
                >
                  ⭐
                </div>
              ))}
            </div>

            {/* Rotating Text Ring */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${rotation * 0.5}deg)`,
              transition: 'transform 2s ease-in-out',
              width: '85%',
              height: '85%',
            }}>
              {texts.map((char, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * (360 / texts.length)}deg) translate(0, -28px)`,
                    transformOrigin: '0 0',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#FFD700',
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    textShadow: '0 0 5px rgba(255, 215, 0, 0.8), 1px 1px 2px rgba(0,0,0,0.5)',
                    letterSpacing: '2px',
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>

          {/* Center Circle with Logo */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '48%',
            height: '48%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            border: '4px solid #FFD700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), inset 0 2px 10px rgba(0,0,0,0.1)',
            padding: '8px',
          }}>
            <img 
              src="/logo-sclm.png" 
              alt="SCLM Logo" 
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
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
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 107, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(255, 215, 0, 1), 0 0 70px rgba(255, 107, 0, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }
      `}</style>
    </>
  );
};

export default SCLMWheelWidget;
