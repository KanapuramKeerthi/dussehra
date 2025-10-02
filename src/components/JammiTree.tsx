import { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

interface JammiTreeProps {
  onComplete: (leafCount: number) => void;
}

interface FallingLeaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export default function JammiTree({ onComplete }: JammiTreeProps) {
  const [collectedLeaves, setCollectedLeaves] = useState(0);
  const [fallingLeaves, setFallingLeaves] = useState<FallingLeaf[]>([]);
  const [showPerson, setShowPerson] = useState(false);
  const targetLeaves = 7;

  useEffect(() => {
    setShowPerson(true);
    const leafInterval = setInterval(() => {
      if (collectedLeaves < targetLeaves) {
        const newLeaf: FallingLeaf = {
          id: Date.now(),
          left: Math.random() * 60 + 20,
          delay: 0,
          duration: 3 + Math.random() * 2,
        };
        setFallingLeaves((prev) => [...prev, newLeaf]);
      }
    }, 1500);

    return () => clearInterval(leafInterval);
  }, [collectedLeaves]);

  const handleLeafClick = (leafId: number) => {
    setFallingLeaves((prev) => prev.filter((leaf) => leaf.id !== leafId));
    const newCount = collectedLeaves + 1;
    setCollectedLeaves(newCount);

    if (newCount >= targetLeaves) {
      setTimeout(() => {
        onComplete(newCount);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-200 via-amber-50 to-green-100">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-8 py-4 rounded-full shadow-lg z-20">
        <p className="text-xl font-bold text-green-700">
          Leaves Collected: {collectedLeaves} / {targetLeaves}
        </p>
      </div>

      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="w-32 h-64 bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg shadow-xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-green-600 rounded-full opacity-80"></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-green-500 rounded-full opacity-70"></div>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-56 h-56 bg-green-400 rounded-full opacity-60"></div>

            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <div className="text-6xl animate-bounce-slow">🌳</div>
            </div>
          </div>
        </div>
      </div>

      {fallingLeaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute cursor-pointer animate-fall hover:scale-125 transition-transform z-10"
          style={{
            left: `${leaf.left}%`,
            top: '-50px',
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
          }}
          onClick={() => handleLeafClick(leaf.id)}
        >
          <Leaf className="w-12 h-12 text-green-600 drop-shadow-lg" fill="currentColor" />
        </div>
      ))}

      <div
        className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          showPerson ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}
      >
        <div className="text-center">
          <div className="text-6xl mb-2">🚶</div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm font-semibold text-amber-800">Click the falling leaves!</p>
          </div>
        </div>
      </div>

      {collectedLeaves >= targetLeaves && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white rounded-2xl p-8 text-center animate-scale-in">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-3xl font-bold text-green-700 mb-2">
              Jammi Leaves Collected!
            </h2>
            <p className="text-lg text-gray-700">
              You have gathered {targetLeaves} sacred leaves
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fall {
          animation: fall linear forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
