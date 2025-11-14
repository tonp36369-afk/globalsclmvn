import React, { useState } from 'react';
import './LuckyWheel.css';

const prizes = [
  'Voucher 100k',
  'iPhone 15',
  'Tai nghe',
  'Áo thun',
  'Không trúng',
  'Balo',
  'Chuột máy tính',
  'Gift Card 50k'
];

function getRandomPrize() {
  return Math.floor(Math.random() * prizes.length);
}

const LuckyWheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setSelected(null);
    setTimeout(() => {
      const prizeIndex = getRandomPrize();
      setSelected(prizeIndex);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="lucky-wheel-container">
      <div className={`wheel ${spinning ? 'spinning' : ''}`}>🎡</div>
      <button onClick={handleSpin} disabled={spinning} className="spin-btn">
        {spinning ? 'Đang quay...' : 'Quay'}
      </button>
      {selected !== null && (
        <div className="result">
          Kết quả: <strong>{prizes[selected]}</strong>
        </div>
      )}
    </div>
  );
};

export default LuckyWheel;
