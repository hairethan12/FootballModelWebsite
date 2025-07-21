import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Shield, Zap } from 'lucide-react';
import { mockGames } from '../data/mockData';
import OffenseAnalysis from './OffenseAnalysis';
import OpponentAnalysis from './OpponentAnalysis';

const GameAnalysis = () => {
  const { gameId } = useParams();
  const [activeTab, setActiveTab] = useState<'offense' | 'opponent'>('offense');
  
  const game = mockGames.find(g => g.id === gameId);
  
  if (!game) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Game not found</p>
        <Link to="/" className="btn-primary mt-4">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Game Info */}
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {game.type === 'home' ? 'vs' : '@'} {game.opponent}
            </h1>
            <p className="text-gray-600 mb-4">{game.date} • {game.venue}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span className="text-lg font-semibold text-green-600">
                  {game.winProbability}% Win Probability
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  game.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                  game.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('offense')}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
            activeTab === 'offense' ? 'tab-active' : 'tab-inactive'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Offense Analysis</span>
        </button>
        <button
          onClick={() => setActiveTab('opponent')}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
            activeTab === 'opponent' ? 'tab-active' : 'tab-inactive'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Opponent Analysis</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'offense' ? (
          <OffenseAnalysis game={game} />
        ) : (
          <OpponentAnalysis game={game} />
        )}
      </div>
    </div>
  );
};

export default GameAnalysis;