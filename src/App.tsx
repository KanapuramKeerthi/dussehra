import { useState } from 'react';
import JammiTree from './components/JammiTree';
import EldersBlessing from './components/EldersBlessing';
import RavanGame from './components/RavanGame';
import PartyScene from './components/PartyScene';
import { Flame, Users, Trees, PartyPopper } from 'lucide-react';

type Stage = 'intro' | 'jammi' | 'blessing' | 'ravan' | 'party' | 'complete';

function App() {
  const [stage, setStage] = useState<Stage>('intro');
  const [leaves, setLeaves] = useState(0);
  const [blessings, setBlessings] = useState(0);

  const handleJammiComplete = (leafCount: number) => {
    setLeaves(leafCount);
    setStage('blessing');
  };

  const handleBlessingComplete = (blessingCount: number) => {
    setBlessings(blessingCount);
    setStage('ravan');
  };

  const handleRavanDefeat = () => {
    setStage('party');
  };

  const handlePartyComplete = () => {
    setStage('complete');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {stage === 'intro' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <div className="text-center max-w-3xl">
            <h1 className="text-6xl font-bold text-orange-700 mb-4 animate-pulse">
              🙏 Happy Dussehra 🙏
            </h1>
            <p className="text-2xl text-amber-800 mb-8 font-serif">
              Celebrate the Victory of Good over Evil
            </p>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              Experience the sacred traditions of Dussehra: Collect blessed Jammi leaves,
              seek blessings from elders, and participate in the symbolic victory over Ravan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform">
                <Trees className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2 text-green-700">Jammi Tree</h3>
                <p className="text-sm text-gray-600">Collect sacred leaves from the holy tree</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2 text-blue-700">Elder's Blessings</h3>
                <p className="text-sm text-gray-600">Hug relatives and exchange jammi leaves</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform">
                <Flame className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2 text-red-700">Defeat Ravan</h3>
                <p className="text-sm text-gray-600">Aim your arrow and vanquish evil</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform">
                <PartyPopper className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2 text-amber-700">Celebration</h3>
                <p className="text-sm text-gray-600">Party and spot the blue bird</p>
              </div>
            </div>

            <button
              onClick={() => setStage('jammi')}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all shadow-lg"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      )}

      {stage === 'jammi' && <JammiTree onComplete={handleJammiComplete} />}
      {stage === 'blessing' && <EldersBlessing onComplete={handleBlessingComplete} leaves={leaves} />}
      {stage === 'ravan' && <RavanGame onComplete={handleRavanDefeat} blessings={blessings} />}
      {stage === 'party' && <PartyScene onComplete={handlePartyComplete} />}

      {stage === 'complete' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <div className="text-center max-w-2xl bg-white rounded-2xl p-12 shadow-2xl">
            <h1 className="text-5xl font-bold text-orange-600 mb-6">
              🎉 Congratulations! 🎉
            </h1>
            <p className="text-2xl text-amber-700 mb-4 font-serif">
              You have completed all sacred rituals
            </p>
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6 mb-8">
              <p className="text-lg text-gray-700 mb-2">
                ✨ Jammi Leaves Collected: <span className="font-bold text-green-600">{leaves}</span>
              </p>
              <p className="text-lg text-gray-700 mb-2">
                🙏 Blessings Received: <span className="font-bold text-blue-600">{blessings}</span>
              </p>
              <p className="text-lg text-gray-700">
                🏹 Ravan Defeated: <span className="font-bold text-red-600">Victory!</span>
              </p>
            </div>
            <p className="text-xl text-orange-700 font-serif mb-8">
              May truth always triumph over falsehood!
            </p>
            <button
              onClick={() => {
                setStage('intro');
                setLeaves(0);
                setBlessings(0);
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-bold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all"
            >
              Experience Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
