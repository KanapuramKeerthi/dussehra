import { useState, useEffect, useRef } from 'react';
import { Target } from 'lucide-react';

interface RavanGameProps {
  onComplete: () => void;
  blessings: number;
}

export default function RavanGame({ onComplete, blessings }: RavanGameProps) {
  const [bowAngle, setBowAngle] = useState(45);
  const [power, setPower] = useState(50);
  const [isCharging, setIsCharging] = useState(false);
  const [arrow, setArrow] = useState<{ x: number; y: number; active: boolean } | null>(null);
  const [ravanHealth, setRavanHealth] = useState(100);
  const [hits, setHits] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const chargeIntervalRef = useRef<number | null>(null);

  const ravanPosition = { x: 80, y: 30 };
  const archerPosition = { x: 10, y: 70 };

  useEffect(() => {
    if (arrow && arrow.active) {
      const animateArrow = () => {
        const radians = (bowAngle * Math.PI) / 180;
        const velocity = power / 5;
        const gravity = 0.5;
        let t = 0;

        const interval = setInterval(() => {
          t += 0.1;
          const x = archerPosition.x + velocity * Math.cos(radians) * t * 2;
          const y = archerPosition.y - velocity * Math.sin(radians) * t * 2 + gravity * t * t;

          if (y > 100 || x > 100) {
            setArrow(null);
            clearInterval(interval);
            return;
          }

          const hitRavan =
            x >= ravanPosition.x - 5 &&
            x <= ravanPosition.x + 5 &&
            y >= ravanPosition.y - 5 &&
            y <= ravanPosition.y + 10;

          if (hitRavan) {
            setArrow(null);
            clearInterval(interval);
            const newHealth = Math.max(0, ravanHealth - 25);
            setRavanHealth(newHealth);
            setHits((prev) => prev + 1);

            if (newHealth <= 0) {
              setIsBurning(true);
              setTimeout(() => {
                setShowVictory(true);
                setTimeout(() => {
                  onComplete();
                }, 3000);
              }, 2000);
            }
            return;
          }

          setArrow({ x, y, active: true });
        }, 50);
      };

      animateArrow();
    }
  }, [arrow?.active]);

  const handleMouseDown = () => {
    setIsCharging(true);
    setPower(0);
    chargeIntervalRef.current = window.setInterval(() => {
      setPower((prev) => Math.min(prev + 2, 100));
    }, 50);
  };

  const handleMouseUp = () => {
    if (isCharging && !arrow?.active) {
      setIsCharging(false);
      if (chargeIntervalRef.current) {
        clearInterval(chargeIntervalRef.current);
      }
      setArrow({ x: archerPosition.x, y: archerPosition.y, active: true });
    }
  };

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isCharging && !arrow?.active) {
      setBowAngle(Number(e.target.value));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-red-900 via-orange-900 to-amber-800">
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-8 py-4 rounded-full shadow-lg z-20">
        <p className="text-xl font-bold text-red-700">
          Ravan's Power: {ravanHealth}%
        </p>
      </div>

      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-amber-100 px-6 py-3 rounded-lg shadow-md z-20">
        <p className="text-sm font-semibold text-amber-800">
          Arrows Hit: {hits} | Blessings Power: +{blessings}
        </p>
      </div>

      <div className="absolute top-40 left-1/2 transform -translate-x-1/2 max-w-md text-center z-10">
        <div className="bg-white bg-opacity-90 rounded-lg px-6 py-3 shadow-lg">
          <p className="text-sm text-gray-700 font-semibold">
            Adjust angle, then hold and release to shoot!
          </p>
        </div>
      </div>

      <div
        className="absolute"
        style={{
          left: `${ravanPosition.x}%`,
          top: `${ravanPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`relative ${isBurning ? 'animate-shake' : ''}`}>
          <div className="text-9xl filter drop-shadow-2xl relative">
            👹
            {isBurning && (
              <>
                <div className="absolute inset-0 text-9xl animate-pulse">🔥</div>
                <div className="absolute top-0 left-0 text-6xl animate-bounce">🔥</div>
                <div className="absolute top-0 right-0 text-6xl animate-bounce delay-100">
                  🔥
                </div>
                <div className="absolute bottom-0 left-1/2 text-6xl animate-bounce delay-200">
                  🔥
                </div>
              </>
            )}
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full">
            <div className="bg-red-600 h-3 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${ravanHealth}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute"
        style={{
          left: `${archerPosition.x}%`,
          top: `${archerPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative">
          <div className="text-6xl">🏹</div>
          <div
            className="absolute top-0 left-0 w-20 h-1 bg-amber-600 origin-left transform"
            style={{
              transform: `rotate(-${bowAngle}deg)`,
            }}
          ></div>
        </div>
      </div>

      {arrow && arrow.active && (
        <div
          className="absolute w-2 h-8 bg-amber-600 transition-all duration-50"
          style={{
            left: `${arrow.x}%`,
            top: `${arrow.y}%`,
            transform: `translate(-50%, -50%) rotate(-${bowAngle}deg)`,
          }}
        >
          <div className="absolute -right-1 top-0 w-0 h-0 border-l-4 border-l-red-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-20">
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Bow Angle: {bowAngle}°
            </label>
            <input
              type="range"
              min="20"
              max="80"
              value={bowAngle}
              onChange={handleAngleChange}
              disabled={isCharging || (arrow?.active ?? false)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Power: {power}%
            </label>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  power > 66 ? 'bg-red-500' : power > 33 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${power}%` }}
              ></div>
            </div>
          </div>

          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            disabled={arrow?.active ?? false}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Target className="w-6 h-6" />
            {isCharging ? 'Release to Shoot!' : 'Hold to Charge'}
          </button>
        </div>
      </div>

      {showVictory && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-12 max-w-lg text-center animate-scale-in shadow-2xl">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-5xl font-bold text-red-700 mb-4">
              Victory!
            </h2>
            <p className="text-2xl text-amber-800 font-serif mb-4">
              Ravan has been defeated!
            </p>
            <p className="text-lg text-gray-700">
              Truth and righteousness have triumphed over evil
            </p>
            <div className="mt-6 text-6xl">🔥 ✨ 🏹</div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(-50%, -50%) rotate(-5deg); }
          75% { transform: translate(-50%, -50%) rotate(5deg); }
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
