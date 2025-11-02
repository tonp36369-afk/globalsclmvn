// SCLMWheelWidget-Ready.tsx - Production Ready TypeScript Component
// Copy this file to your React project and use immediately

import * as React from 'react';

// ===== TypeScript Interfaces =====
export interface Position {
  bottom?: string;
  right?: string;
  top?: string;
  left?: string;
}

export interface SCLMWheelWidgetProps {
  /** URL của game vòng quay */
  gameUrl?: string;
  /** Vị trí widget trên màn hình */
  position?: Position;
  /** Kích thước widget */
  size?: string;
  /** Tự động hiện notification */
  autoShow?: boolean;
  /** Cho phép kéo thả widget */
  enableDrag?: boolean;
  /** Thời gian giữa các notification (ms) */
  notificationInterval?: number;
  /** Thời gian tạo sparkle effect (ms) */
  sparkleInterval?: number;
  /** Callback khi mở game */
  onGameOpen?: () => void;
  /** Callback khi đóng game */
  onGameClose?: () => void;
  /** CSS class thêm vào */
  className?: string;
  /** CSS style object */
  style?: React.CSSProperties;
}

export interface NotificationMessage {
  text: string;
  emoji: string;
}

// ===== Main Component =====
const SCLMWheelWidget: React.FC<SCLMWheelWidgetProps> = ({
  gameUrl = '/vong-quay-may-man.html',
  position = { bottom: '20px', right: '20px' },
  size = '120px',
  autoShow = true,
  enableDrag = true,
  notificationInterval = 30000,
  sparkleInterval = 3000,
  onGameOpen,
  onGameClose,
  className = '',
  style = {}
}: SCLMWheelWidgetProps) => {
  // ===== State Management =====
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [showNotification, setShowNotification] = React.useState<boolean>(false);
  const [currentIcon, setCurrentIcon] = React.useState<string>('🎯');
  const [currentText, setCurrentText] = React.useState<string>('VÒNG QUAY<br>MAY MẮN');
  const [notificationText, setNotificationText] = React.useState<string>('🎉 Nhấp vào vòng quay để tham gia ngay!');
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragPosition, setDragPosition] = React.useState<Position>(position);

  // ===== Refs =====
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const notificationRef = React.useRef<HTMLDivElement>(null);
  const dragDataRef = React.useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  }>({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  // ===== Constants =====
  const icons: readonly string[] = ['🎯', '🎰', '🎲', '🎮', '🏆', '💎', '🎊', '⭐'];
  const texts: readonly string[] = [
    'VÒNG QUAY<br>MAY MẮN', 'TRÚNG<br>THƯỞNG', 'MAY MẮN<br>NGAY',
    'QUAY<br>NGAY', 'GIẢI<br>KHỦNG', 'SCLM<br>GLOBAL',
    'KHUYẾN MÃI<br>HOT', 'SIÊU<br>PHẨM'
  ];
  const messages: readonly NotificationMessage[] = [
    { emoji: '🎁', text: 'Cơ hội trúng thưởng đang chờ bạn!' },
    { emoji: '🏆', text: 'Quay ngay để nhận quà khủng!' },
    { emoji: '💎', text: 'SCLM Global - Vòng quay may mắn!' },
    { emoji: '🎯', text: 'Thử vận may của bạn ngay!' },
    { emoji: '⭐', text: 'Giải thưởng giá trị đang chờ!' },
    { emoji: '🎊', text: 'Sự kiện đặc biệt - Tham gia ngay!' },
    { emoji: '💰', text: 'Cơ hội vàng - Không thể bỏ lỡ!' },
    { emoji: '🎉', text: 'SCLM Global mang đến may mắn!' }
  ];

  // ===== Helper Functions =====
  const createSparkles = React.useCallback((): void => {
    if (!widgetRef.current) return;
    
    for (let i = 0; i < 3; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sclm-sparkle';
      sparkle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${['#fff', '#ffd700', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: sclm-sparkleMove 2s linear infinite;
        animation-delay: ${Math.random() * 2}s;
      `;
      
      widgetRef.current.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 2000);
    }
  }, []);

  const showRandomNotification = React.useCallback((): void => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setNotificationText(`${randomMessage.emoji} ${randomMessage.text}`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, [messages]);

  // ===== Game Controls =====
  const openGame = React.useCallback((): void => {
    // Mở trực tiếp trong tab hiện tại
    window.location.href = gameUrl;
    onGameOpen?.();
    
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'wheel_game_opened', {
        'event_category': 'engagement',
        'event_label': 'sclm_wheel_widget'
      });
    }
    
    console.log('🎯 SCLM Global - Vòng quay may mắn được mở!');
    createSparkles();
  }, [gameUrl, onGameOpen, createSparkles]);

  const closeGame = React.useCallback((): void => {
    setIsModalOpen(false);
    onGameClose?.();
  }, [onGameClose]);

  // ===== Event Handlers =====
  const handleWidgetClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    // Kiểm tra xem có phải drag hay click thật
    const deltaX = Math.abs(e.clientX - dragDataRef.current.startX);
    const deltaY = Math.abs(e.clientY - dragDataRef.current.startY);
    
    // Nếu di chuyển ít hơn 5px thì coi như click
    if (deltaX < 5 && deltaY < 5) {
      e.preventDefault();
      e.stopPropagation();
      openGame();
    }
  }, [openGame]);

  const handleModalClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      closeGame();
    }
  }, [closeGame]);

  // ===== Drag Functionality =====
  const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    // Lưu vị trí bắt đầu để phân biệt click vs drag
    dragDataRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: widgetRef.current?.getBoundingClientRect().left || 0,
      initialY: widgetRef.current?.getBoundingClientRect().top || 0
    };
    
    if (!enableDrag) return;
    
    setIsDragging(true);
  }, [enableDrag]);

  const handleMouseMove = React.useCallback((e: MouseEvent): void => {
    if (!isDragging || !enableDrag) return;
    
    const deltaX = e.clientX - dragDataRef.current.startX;
    const deltaY = e.clientY - dragDataRef.current.startY;
    
    const newLeft = dragDataRef.current.initialX + deltaX;
    const newTop = dragDataRef.current.initialY + deltaY;
    
    setDragPosition({
      left: `${newLeft}px`,
      top: `${newTop}px`,
      bottom: 'auto',
      right: 'auto'
    });
  }, [isDragging, enableDrag]);

  const handleMouseUp = React.useCallback((): void => {
    setIsDragging(false);
  }, []);

  // ===== Effects =====
  React.useEffect(() => {
    // Inject CSS styles
    const styleId = 'sclm-widget-styles';
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement('style');
      styleSheet.id = styleId;
      styleSheet.textContent = `
        .sclm-wheel-widget {
          position: fixed;
          width: 120px;
          height: 120px;
          background: linear-gradient(45deg, #ffd700, #ffed4e, #ffa500);
          background-size: 300% 300%;
          animation: sclm-gradientPulse 2s ease infinite, sclm-bounce 3s ease-in-out infinite;
          border-radius: 50%;
          cursor: pointer;
          z-index: 9999;
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
        
        .sclm-wheel-widget::before {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #ffd700);
          background-size: 400% 400%;
          animation: sclm-borderGlow 3s ease infinite;
          border-radius: 50%;
          z-index: -1;
        }
        
        .sclm-widget-content {
          position: relative; z-index: 2;
          color: #1a202c; font-weight: 900;
          text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
        }
        
        .sclm-widget-icon {
          font-size: 24px; margin-bottom: 2px;
          animation: sclm-spin 4s linear infinite;
        }
        
        .sclm-widget-text {
          font-size: 11px; font-weight: bold; line-height: 1.1;
        }
        
        @keyframes sclm-gradientPulse {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes sclm-borderGlow {
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
        
        .sclm-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px);
          z-index: 10000; display: flex; align-items: center; justify-content: center;
          animation: sclm-fadeIn 0.3s ease;
        }
        
        @keyframes sclm-fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        
        .sclm-modal-content {
          position: relative; 
          width: 100vw; 
          height: 100vh;
          background: transparent; 
          border-radius: 0; 
          overflow: hidden;
          box-shadow: none;
        }
        
        .sclm-modal-close {
          position: fixed; 
          top: 20px; 
          right: 20px;
          background: #ff4444; 
          color: white; 
          border: none;
          border-radius: 50%; 
          width: 50px; 
          height: 50px;
          font-size: 24px; 
          cursor: pointer; 
          z-index: 10001;
          display: flex; 
          align-items: center; 
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        
        .sclm-modal-close:hover {
          background: #ff6666; 
          transform: scale(1.15) rotate(90deg);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }
        
        .sclm-game-iframe {
          width: 100vw; 
          height: 100vh; 
          border: none; 
          border-radius: 0;
        }
        
        .sclm-notification {
          position: fixed; top: 20px; right: 20px;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #1a202c; padding: 15px 25px; border-radius: 15px;
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
          z-index: 10002; font-weight: bold; font-size: 14px;
          transform: translateX(400px); transition: transform 0.5s ease;
          border: 2px solid #fff;
        }
        
        .sclm-notification.sclm-show {
          transform: translateX(0);
        }
        
        @keyframes sclm-sparkleMove {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        .sclm-dragging {
          transition: none !important;
          cursor: grabbing !important;
          animation: none !important;
        }
        
        @media (max-width: 768px) {
          .sclm-wheel-widget {
            width: 80px !important; 
            height: 80px !important;
            bottom: 12px !important;
            right: 12px !important;
          }
          .sclm-widget-icon { font-size: 18px !important; }
          .sclm-widget-text { font-size: 9px !important; }
          .sclm-notification {
            top: 12px !important;
            right: 12px !important;
            font-size: 12px !important;
            padding: 12px 18px !important;
          }
          .sclm-modal-close {
            width: 36px !important;
            height: 36px !important;
            font-size: 18px !important;
            top: 10px !important;
            right: 10px !important;
          }
          .sclm-game-iframe {
            height: 70vh !important;
          }
        }
        
        @media (max-width: 480px) {
          .sclm-wheel-widget {
            width: 70px !important;
            height: 70px !important;
            bottom: 10px !important;
            right: 10px !important;
          }
          .sclm-widget-icon { font-size: 16px !important; }
          .sclm-widget-text { font-size: 8px !important; }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  React.useEffect(() => {
    if (autoShow) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoShow]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * icons.length);
      setCurrentIcon(icons[randomIndex]);
      setCurrentText(texts[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [icons, texts]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isModalOpen) showRandomNotification();
    }, notificationInterval);
    return () => clearInterval(interval);
  }, [isModalOpen, notificationInterval, showRandomNotification]);

  React.useEffect(() => {
    const interval = setInterval(createSparkles, sparkleInterval);
    return () => clearInterval(interval);
  }, [createSparkles, sparkleInterval]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) closeGame();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeGame]);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // ===== Render =====
  return React.createElement(React.Fragment, null,
    // Widget
    React.createElement('div', {
      ref: widgetRef,
      className: `sclm-wheel-widget ${isDragging ? 'sclm-dragging' : ''} ${className}`,
      style: { 
        ...dragPosition,
        width: size,
        height: size,
        cursor: enableDrag ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
        ...style
      },
      onClick: handleWidgetClick,
      onMouseDown: handleMouseDown
    },
      React.createElement('div', { className: 'sclm-widget-content' },
        React.createElement('div', { className: 'sclm-widget-icon' }, currentIcon),
        React.createElement('div', { 
          className: 'sclm-widget-text',
          dangerouslySetInnerHTML: { __html: currentText }
        })
      )
    ),
    
    // Modal
    isModalOpen && React.createElement('div', {
      className: 'sclm-modal-overlay',
      onClick: handleModalClick
    },
      React.createElement('div', {
        className: 'sclm-modal-content',
        onClick: (e: React.MouseEvent) => e.stopPropagation()
      },
        React.createElement('button', {
          className: 'sclm-modal-close',
          onClick: closeGame
        }, '×'),
        React.createElement('iframe', {
          className: 'sclm-game-iframe',
          src: gameUrl,
          title: 'SCLM Global Wheel Game'
        })
      )
    ),
    
    // Notification
    React.createElement('div', {
      ref: notificationRef,
      className: `sclm-notification ${showNotification ? 'sclm-show' : ''}`
    }, notificationText)
  );
};

export default SCLMWheelWidget;

// ===== Usage Example =====
/*
// App.tsx hoặc component chính
import SCLMWheelWidget from './SCLMWheelWidget-Ready';

function App() {
  return (
    <div className="App">
      <h1>Website SCLM Global</h1>
      
      <SCLMWheelWidget 
        gameUrl="/vong-quay-may-man.html"
        position={{ bottom: '20px', right: '20px' }}
        size="120px"
        autoShow={true}
        enableDrag={true}
        onGameOpen={() => console.log('Game opened!')}
        onGameClose={() => console.log('Game closed!')}
      />
    </div>
  );
}
*/