import { Calendar, TrendingUp, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockGames, mockUpcomingGame } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Team Dashboard</h2>
          <p className="text-gray-600 mt-1">Analyze performance and prepare for upcoming games</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Season</p>
            <p className="text-lg font-semibold text-gray-900">2024</p>
          </div>
        </div>
      </div>

      {/* Upcoming Game Card */}
      <div className="card p-6 border-l-4 border-l-orange-500">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 text-orange-600 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Next Game</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              vs {mockUpcomingGame.opponent}
            </h3>
            <p className="text-gray-600 mb-4">{mockUpcomingGame.date} • {mockUpcomingGame.venue}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-lg font-semibold text-green-600">
                  {mockUpcomingGame.winProbability}% Win Probability
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Last meeting: {mockUpcomingGame.lastMeeting}</span>
              </div>
            </div>
          </div>
          <Link 
            to={`/game/${mockUpcomingGame.id}`}
            className="btn-primary flex items-center space-x-2"
          >
            <span>Analyze Game</span>
          </Link>
        </div>
      </div>

      {/* Games List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">All Opponents</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{mockGames.length} games scheduled</span>
          </div>
        </div>

        <div className="grid gap-4">
          {mockGames.map((game) => (
            <Link
              key={game.id}
              to={`/game/${game.id}`}
              className="card p-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 group-hover:text-blue-800 transition-colors">
                      {game.type === 'home' ? 'vs' : '@'} {game.opponent}
                    </h4>
                    <p className="text-sm text-gray-600">{game.date} • {game.venue}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Win Probability</p>
                    <p className="text-lg font-semibold text-green-600">{game.winProbability}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`text-sm font-medium ${
                      game.status === 'upcoming' ? 'text-blue-600' : 
                      game.status === 'completed' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;