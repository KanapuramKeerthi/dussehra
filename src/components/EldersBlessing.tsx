import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface EldersBlessingProps {
  onComplete: (blessingCount: number) => void;
  leaves: number;
}

interface Elder {
  id: number;
  emoji: string;
  name: string;
  blessing: string;
  position: { x: number; y: number };
  type: 'elder' | 'bava' | 'mardal';
}

export default function EldersBlessing({ onComplete, leaves }: EldersBlessingProps) {
  const [personPosition, setPersonPosition] = useState({ x: 50, y: 80 });
  const [blessingsReceived, setBlessingsReceived] = useState<number[]>([]);
  const [showBlessingText, setShowBlessingText] = useState<string | null>(null);
  const [showHugAnimation, setShowHugAnimation] = useState(false);
  const [hugType, setHugType] = useState<'elder' | 'bava' | 'mardal'>('elder');

  const elders: Elder[] = [
    {
      id: 1,
      emoji: '👴',
      name: 'Grandfather',
      blessing: 'May you be blessed with wisdom and prosperity',
      position: { x: 15, y: 25 },
      type: 'elder',
    },
    {
      id: 2,
      emoji: '👵',
      name: 'Grandmother',
      blessing: 'May you always be protected and happy',
      position: { x: 50, y: 20 },
      type: 'elder',
    },
    {
      id: 3,
      emoji: '🧔',
      name: 'Elder Uncle',
      blessing: 'May success follow you in all your endeavors',
      position: { x: 85, y: 25 },
      type: 'elder',
    },
    {
      id: 4,
      emoji: '👨',
      name: 'Brother-in-law (Bava)',
      blessing: 'May your bond of family grow stronger',
      position: { x: 30, y: 45 },
      type: 'bava',
    },
    {
      id: 5,
      emoji: '👩',
      name: 'Sister-in-law (Mardal)',
      blessing: 'May joy and prosperity fill your home',
      position: { x: 70, y: 45 },
      type: 'mardal',
    },
  ];

  const moveToElder = (elder: Elder) => {
    if (blessingsReceived.includes(elder.id)) return;

    setPersonPosition({ x: elder.position.x, y: elder.position.y + 20 });

    setTimeout(() => {
      setHugType(elder.type);
      setShowHugAnimation(true);

      setTimeout(() => {
        setShowHugAnimation(false);
        setBlessingsReceived((prev) => [...prev, elder.id]);
        setShowBlessingText(elder.blessing);

        setTimeout(() => {
          setShowBlessingText(null);
          if (blessingsReceived.length + 1 >= elders.length) {
            setTimeout(() => {
              onComplete(elders.length);
            }, 1000);
          }
        }, 3000);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-orange-100 via-amber-50 to-yellow-100">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-8 py-4 rounded-full shadow-lg z-20">
        <p className="text-xl font-bold text-amber-700">
          Blessings Received: {blessingsReceived.length} / {elders.length}
        </p>
      </div>

      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-green-100 px-6 py-3 rounded-lg shadow-md z-20">
        <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Jammi Leaves: {leaves}
        </p>
      </div>

      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 max-w-md text-center z-10 mt-12">
        <div className="bg-white bg-opacity-90 rounded-lg px-6 py-3 shadow-lg">
          <p className="text-sm text-gray-700">
            Hug relatives and exchange Jammi leaves for blessings
          </p>
        </div>
      </div>

      {elders.map((elder) => (
        <div
          key={elder.id}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${elder.position.x}%`,
            top: `${elder.position.y}%`,
          }}
          onClick={() => moveToElder(elder)}
        >
          <div
            className={`text-center transition-all duration-300 ${
              blessingsReceived.includes(elder.id)
                ? 'opacity-60 scale-90'
                : 'hover:scale-110'
            }`}
          >
            <div className="text-7xl mb-2 relative">
              {elder.emoji}
              {blessingsReceived.includes(elder.id) && (
                <div className="absolute -top-2 -right-2 text-3xl animate-bounce">
                  ✨
                </div>
              )}
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm font-semibold text-amber-800">{elder.name}</p>
              {blessingsReceived.includes(elder.id) && (
                <p className="text-xs text-green-600 font-semibold">Blessed ✓</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-10"
        style={{
          left: `${personPosition.x}%`,
          top: `${personPosition.y}%`,
        }}
      >
        <div className="text-6xl relative">
          {showHugAnimation ? '🤗' : '🙏'}
          {showHugAnimation && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-float">
              <div className="text-3xl">🍃</div>
            </div>
          )}
        </div>
      </div>

      {showBlessingText && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-30">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 max-w-md text-center animate-scale-in shadow-2xl">
            <div className="text-5xl mb-4">🤗🍃</div>
            <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-spin-slow" />
            <p className="text-2xl font-serif text-amber-900 italic">
              "{showBlessingText}"
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="text-2xl">🌟</div>
              <div className="text-3xl">🍃</div>
              <div className="text-2xl">🌟</div>
            </div>
          </div>
        </div>
      )}

      {blessingsReceived.length >= elders.length && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white rounded-2xl p-8 text-center animate-scale-in">
            <div className="text-6xl mb-4">🙏✨</div>
            <h2 className="text-3xl font-bold text-amber-700 mb-2">
              All Blessings Received!
            </h2>
            <p className="text-lg text-gray-700">
              You are now ready for the final ritual
            </p>
          </div>
        </div>
      )}

      <style>{`
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

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-20px) translateX(-50%);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .animate-float {
          animation: float 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
