import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Activity className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Route Science</h1>
              <p className="text-blue-200 text-sm">Performance Dashboard</p>
            </div>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link to="/Reports" className="hover:text-blue-200 transition-colors font-medium">
              Reports
            </Link>
            <Link to="/Settings" className="hover:text-blue-200 transition-colors font-medium">
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
