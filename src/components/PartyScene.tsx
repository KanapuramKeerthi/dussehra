import { useState, useEffect } from 'react';
import { Beer } from 'lucide-react';

interface PartySceneProps {
  onComplete: () => void;
}

export default function PartyScene({ onComplete }: PartySceneProps) {
  const [beersDrunk, setBeersDrunk] = useState(0);
  const [blueBirdFound, setBlueBirdFound] = useState(false);
  const [blueBirdPosition, setBlueBirdPosition] = useState({ x: 0, y: 0 });
  const [showClickHint, setShowClickHint] = useState(false);

  useEffect(() => {
    const randomX = Math.random() * 80 + 10;
    const randomY = Math.random() * 50 + 10;
    setBlueBirdPosition({ x: randomX, y: randomY });

    const hintTimer = setTimeout(() => {
      setShowClickHint(true);
    }, 3000);

    return () => clearTimeout(hintTimer);
  }, []);

  const handleBeerClick = () => {
    const newCount = beersDrunk + 1;
    setBeersDrunk(newCount);

    if (newCount >= 3 && blueBirdFound) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleBlueBirdClick = () => {
    if (!blueBirdFound) {
      setBlueBirdFound(true);
      setShowClickHint(false);

      if (beersDrunk >= 3) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-amber-900 via-orange-800 to-yellow-700">
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-40"></div>

      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-yellow-200 opacity-60 animate-twinkle"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 60 + '%',
            animationDelay: Math.random() * 2 + 's',
          }}
        ></div>
      ))}

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-4 rounded-full shadow-2xl z-20">
        <p className="text-xl font-bold text-white">
          Celebration Time!
        </p>
      </div>

      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-lg shadow-lg z-20">
        <p className="text-sm font-semibold text-amber-800">
          Beers: {beersDrunk}/3 | Blue Bird: {blueBirdFound ? '✓' : '✗'}
        </p>
      </div>

      <div className="absolute top-40 left-1/2 transform -translate-x-1/2 max-w-md text-center z-10">
        <div className="bg-white bg-opacity-90 rounded-lg px-6 py-3 shadow-lg">
          <p className="text-sm text-gray-700 font-semibold">
            Celebrate with drinks and spot the rare blue bird!
          </p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="text-9xl mb-8 animate-bounce-slow">🎉</div>

          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-7xl animate-dance">🕺</div>
            <div className="text-7xl animate-dance-delayed">💃</div>
          </div>

          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={handleBeerClick}
                disabled={beersDrunk >= i}
                className={`text-6xl transform transition-all duration-300 ${
                  beersDrunk >= i
                    ? 'opacity-30 scale-90'
                    : 'hover:scale-110 cursor-pointer animate-pulse'
                }`}
              >
                🍺
              </button>
            ))}
          </div>

          {beersDrunk >= 3 && !blueBirdFound && (
            <div className="mt-8 bg-amber-100 rounded-lg px-6 py-3 shadow-lg animate-scale-in">
              <p className="text-sm text-amber-900 font-bold">
                The blue bird is hiding somewhere... can you find it?
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-30"
        style={{
          left: `${blueBirdPosition.x}%`,
          top: `${blueBirdPosition.y}%`,
        }}
        onClick={handleBlueBirdClick}
      >
        <div
          className={`text-4xl transition-all duration-300 ${
            blueBirdFound ? 'scale-150 animate-bounce' : 'hover:scale-125'
          }`}
        >
          🐦
        </div>
        {showClickHint && !blueBirdFound && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-bounce">
            Click me!
          </div>
        )}
      </div>

      <div className="absolute bottom-20 left-0 right-0 flex justify-around items-end z-10">
        <div className="text-6xl animate-sway">🌴</div>
        <div className="text-7xl animate-sway-delayed">🌳</div>
        <div className="text-6xl animate-sway">🌴</div>
      </div>

      {beersDrunk >= 3 && blueBirdFound && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-40">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-12 max-w-lg text-center animate-scale-in shadow-2xl">
            <div className="text-7xl mb-6">🎊🍺🐦</div>
            <h2 className="text-4xl font-bold text-amber-700 mb-4">
              Party Complete!
            </h2>
            <p className="text-xl text-gray-700 mb-2">
              You celebrated with friends and found the rare blue bird!
            </p>
            <p className="text-lg text-amber-600 font-serif italic">
              What a perfect Dussehra celebration!
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes dance {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-dance {
          animation: dance 1s ease-in-out infinite;
        }

        .animate-dance-delayed {
          animation: dance 1s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-sway {
          animation: sway 2s ease-in-out infinite;
        }

        .animate-sway-delayed {
          animation: sway 2s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
