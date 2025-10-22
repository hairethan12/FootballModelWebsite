import { useState } from "react";
import { Save, Shield } from "lucide-react";

interface Game {
  id: string;
  opponent: string;
  date: string;
  venue: string;
  type: "home" | "away";
  status: "upcoming" | "completed";
  winProbability: number;
}

interface OpponentAnalysisProps {
  game: Game;
}

const OpponentAnalysis = ({ game }: OpponentAnalysisProps) => {
  const [formData, setFormData] = useState({
    period: "",
    clock_seconds: "",
    offense_score: "",
    defense_score: "",
    yards_to_goal: "",
    down: "",
    distance: "",
    play_type: "",
  });

  const [prediction, setPrediction] = useState<{
    pass: number;
    rush: number;
  } | null>(null);
  const [receivers, setReceivers] = useState<string[]>([]);
  const [rushers, setRushers] = useState([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClockChange = (minutes: string, seconds: string) => {
    const min = parseInt(minutes) || 0;
    const sec = parseInt(seconds) || 0;
    handleInputChange("clock_seconds", (min * 60 + sec).toString());
  };

  const handleSubmit = async () => {
    const requestBody = {
      period: Number(formData.period),
      clock_sec: formData.clock_seconds,
      offenseScore: Number(formData.offense_score),
      defenseScore: Number(formData.defense_score),
      yards_to_goal: Number(formData.yards_to_goal),
      down: Number(formData.down),
      distance: Number(formData.distance),
      playType: formData.play_type,
    };

    try {
      const response = await fetch("https://opponent-api.onrender.com/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("API Response:", data);

      setPrediction(data.play_type_probabilities);
      setReceivers(data.possible_receivers);
      setRushers(data.top_rushers);
    } catch (error) {
      console.error("Opponent prediction error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Opponent Defensive Metrics
            </h2>
          </div>
          <button
            onClick={handleSubmit}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Analysis</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Period
            </label>
            <div>
              {[1, 2, 3, 4].map((num) => (
                <label key={num} className="mr-4">
                  <input
                    type="radio"
                    name="period"
                    value={num}
                    checked={formData.period === String(num)}
                    onChange={(e) =>
                      handleInputChange("period", e.target.value)
                    }
                  />{" "}
                  {num}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time of Possession (MM:SS)
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="MM"
                className="input-field w-1/2"
                onChange={(e) => handleClockChange(e.target.value, "0")}
              />
              <input
                type="number"
                placeholder="SS"
                className="input-field w-1/2"
                onChange={(e) => handleClockChange("0", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Offense Score
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.offense_score}
              onChange={(e) =>
                handleInputChange("offense_score", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Defense Score
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.defense_score}
              onChange={(e) =>
                handleInputChange("defense_score", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yards to Goal
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.yards_to_goal}
              onChange={(e) =>
                handleInputChange("yards_to_goal", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down
            </label>
            <div>
              {[1, 2, 3, 4].map((num) => (
                <label key={num} className="mr-4">
                  <input
                    type="radio"
                    name="down"
                    value={num}
                    checked={formData.down === String(num)}
                    onChange={(e) => handleInputChange("down", e.target.value)}
                  />{" "}
                  {num}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distance
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.distance}
              onChange={(e) => handleInputChange("distance", e.target.value)}
            />
          </div>
        </div>
      </div>

      {prediction && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Prediction Results</h3>

          <p className="mb-2">
            <strong>Pass Probability:</strong>{" "}
            {(prediction.pass * 100).toFixed(1)}%
          </p>
          <p className="mb-4">
            <strong>Rush Probability:</strong>{" "}
            {(prediction.rush * 100).toFixed(1)}%
          </p>

          {prediction &&
            prediction.pass > prediction.rush &&
            (receivers.length > 0 ? (
              <div>
                <strong>Possible Targeted Receivers:</strong>
                <ul className="list-disc list-inside text-sm mt-2">
                  {receivers.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No receiver data available for this scenario.
              </p>
            ))}
          {prediction &&
            prediction.rush > prediction.pass &&
            (rushers.length > 0 ? (
              <div className="mt-4">
                <strong>Possible Ball Carriers:</strong>
                <ul className="list-disc list-inside text-sm mt-2">
                  {rushers.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic mt-2">
                No rusher data available for this scenario.
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default OpponentAnalysis;
