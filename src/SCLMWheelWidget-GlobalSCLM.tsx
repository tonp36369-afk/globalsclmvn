// SCLMWheelWidget.tsx - Component vòng quay cho GlobalSCLM project
import React, { useState, useEffect, useRef } from 'react';

interface SCLMWheelWidgetProps {
  gameUrl?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: number;
  autoShow?: boolean;
}

const SCLMWheelWidget: React.FC<SCLMWheelWidgetProps> = ({
  gameUrl = '/vong-quay-may-man.html',
  position = 'bottom-right',
  size = 120,
  autoShow = true
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [currentIcon, setCurrentIcon] = useState('🎯');
  const [currentText, setCurrentText] = useState('VÒNG QUAY\nMAY MẮN');
  
  const widgetRef = useRef<HTMLDivElement>(null);
  
  const icons = ['🎯', '🎰', '🎲', '🎮', '🏆', '💎', '🎊', '⭐'];
  const texts = [
    'VÒNG QUAY\nMAY MẮN', 'TRÚNG\nTHƯỞNG', 'MAY MẮN\nNGAY',
    'QUAY\nNGAY', 'GIẢI\nKHỦNG', 'SCLM\nGLOBAL'
  ];
  
  // const messages = [
  //   '🎁 Cơ hội trúng thưởng đang chờ bạn!',
  //   '🏆 Quay ngay để nhận quà khủng!',
  //   '💎 SCLM Global - Vòng quay may mắn!',
  //   '🎯 Thử vận may của bạn ngay!'
  // ];

  // Position styles
  const getPositionStyle = () => {
    const base = { position: 'fixed' as const, zIndex: 9999 };
    switch (position) {
      case 'bottom-right': return { ...base, bottom: '20px', right: '20px' };
      case 'bottom-left': return { ...base, bottom: '20px', left: '20px' };
      case 'top-right': return { ...base, top: '20px', right: '20px' };
      case 'top-left': return { ...base, top: '20px', left: '20px' };
      default: return { ...base, bottom: '20px', right: '20px' };
    }
  };

  useEffect(() => {
    // Welcome notification
    if (autoShow) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoShow]);

  useEffect(() => {
    // Icon và text rotation
    const interval = setInterval(() => {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      setCurrentIcon(randomIcon);
      setCurrentText(randomText);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Random notifications
    const interval = setInterval(() => {
      if (!isModalOpen) {
        // const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [isModalOpen]);

  const openGame = () => {
    setIsModalOpen(true);
    // Analytics tracking (nếu có)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'wheel_game_opened', {
        'event_category': 'engagement',
        'event_label': 'sclm_wheel_widget'
      });
    }
  };

  const closeGame = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Widget CSS */}
      <style>{`
        @keyframes sclm-gradientPulse {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes sclm-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes sclm-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes sclm-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .sclm-wheel-widget {
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(45deg, #ffd700, #ffed4e, #ffa500);
          background-size: 300% 300%;
          animation: sclm-gradientPulse 2s ease infinite, sclm-bounce 3s ease-in-out infinite;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(255, 215, 0, 0.7);
          border: 4px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: 'Arial', sans-serif;
          transition: all 0.3s ease;
          user-select: none;
          overflow: hidden;
        }
        
        .sclm-wheel-widget:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(255, 215, 0, 0.9);
        }
        
        .sclm-widget-content {
          position: relative;
          z-index: 2;
          color: #1a202c;
          font-weight: 900;
          text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
        }
        
        .sclm-widget-icon {
          font-size: ${size * 0.2}px;
          margin-bottom: 2px;
          animation: sclm-spin 4s linear infinite;
        }
        
        .sclm-widget-text {
          font-size: ${size * 0.09}px;
          font-weight: bold;
          line-height: 1.1;
          white-space: pre-line;
        }
        
        .sclm-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: sclm-fadeIn 0.3s ease;
        }
        
        .sclm-modal-content {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .sclm-modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .sclm-modal-close:hover {
          background: #ff6666;
          transform: scale(1.1);
        }
        
        .sclm-game-iframe {
          width: 100%;
          height: 80vh;
          border: none;
          border-radius: 20px;
        }
        
        .sclm-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #1a202c;
          padding: 15px 25px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
          z-index: 99998;
          font-weight: bold;
          font-size: 14px;
          transform: translateX(400px);
          transition: transform 0.5s ease;
          border: 2px solid #fff;
        }
        
        .sclm-notification.show {
          transform: translateX(0);
        }
        
        @media (max-width: 768px) {
          .sclm-wheel-widget {
            width: ${size * 0.8}px;
            height: ${size * 0.8}px;
          }
          .sclm-widget-icon { font-size: ${size * 0.16}px; }
          .sclm-widget-text { font-size: ${size * 0.07}px; }
        }
      `}</style>

      {/* Widget */}
      <div
        ref={widgetRef}
        className="sclm-wheel-widget"
        style={getPositionStyle()}
        onClick={openGame}
      >
        <div className="sclm-widget-content">
          <div className="sclm-widget-icon">{currentIcon}</div>
          <div className="sclm-widget-text">{currentText}</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="sclm-modal-overlay" onClick={closeGame}>
          <div className="sclm-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="sclm-modal-close" onClick={closeGame}>×</button>
            <iframe 
              className="sclm-game-iframe" 
              src={gameUrl}
              title="SCLM Global Wheel Game"
            />
          </div>
        </div>
      )}

      {/* Notification */}
      <div className={`sclm-notification ${showNotification ? 'show' : ''}`}>
        🎉 Nhấp vào vòng quay để tham gia ngay!
      </div>
    </>
  );
};

export default SCLMWheelWidget;