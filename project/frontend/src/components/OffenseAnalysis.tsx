import { useState } from "react";
import { BarChart as BarChartIcon, Save, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface Game {
  id: string;
  opponent: string;
  date: string;
  venue: string;
  type: "home" | "away";
  status: "upcoming" | "completed";
  winProbability: number;
}

interface OffenseAnalysisProps {
  game: Game;
}

const OffenseAnalysis = ({ game }: OffenseAnalysisProps) => {
  const [formData, setFormData] = useState({
    period: "",
    clock_minutes: "",
    clock_seconds: "",
    offense_score: "",
    defense_score: "",
    yards_to_goal: "",
    down: "",
    distance: "",
    play_type: "",
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [similarPlay, setSimilarPlay] = useState<any>(null);

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
    const minutes = parseInt(formData.clock_minutes) || 0;
    const seconds = parseInt(formData.clock_seconds) || 0;
    const totalSeconds = minutes * 60 + seconds;

    const isPass = formData.play_type === "Pass" ? 1 : 0;
    const isRush = formData.play_type === "Rush" ? 1 : 0;

    const requestBody = {
      period: Number(formData.period),
      clock_seconds: totalSeconds,
      offense_score: Number(formData.offense_score),
      defense_score: Number(formData.defense_score),
      yards_to_goal: Number(formData.yards_to_goal),
      down: Number(formData.down),
      distance: Number(formData.distance),
      "play_type_Pass Reception": isPass,
      play_type_Rush: isRush,
    };

    try {
      const response = await fetch(
        "https://offense-api.onrender.com/predictoffense",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log("📊 Prediction:", data);

      setPrediction(data.predicted_yards);
      setSimilarPlay(data.similar_play); // or leave it out if you're not supporting this part yet
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  const chartData =
    prediction !== null
      ? [
          { name: "Predicted Yards", yards: prediction },
          ...(similarPlay?.actual_yards
            ? [{ name: "Previous Game Yards", yards: similarPlay.actual_yards }]
            : []),
        ]
      : [];

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Offensive Metrics
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
                value={formData.clock_minutes}
                onChange={(e) =>
                  handleInputChange("clock_minutes", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="SS"
                className="input-field w-1/2"
                value={formData.clock_seconds}
                onChange={(e) =>
                  handleInputChange("clock_seconds", e.target.value)
                }
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Play Type
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="play_type"
                  value="Pass"
                  checked={formData.play_type === "Pass"}
                  onChange={(e) =>
                    handleInputChange("play_type", e.target.value)
                  }
                />{" "}
                Pass
              </label>
              <label>
                <input
                  type="radio"
                  name="play_type"
                  value="Rush"
                  checked={formData.play_type === "Rush"}
                  onChange={(e) =>
                    handleInputChange("play_type", e.target.value)
                  }
                />{" "}
                Rush
              </label>
            </div>
          </div>
        </div>
      </div>

      {prediction !== null && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Prediction Results</h3>
          <p className="text-md mb-4">
            <strong>Predicted Yards:</strong> {prediction}
          </p>

          {similarPlay?.actual_yards ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="yards" fill="#3182ce">
                  <LabelList dataKey="yards" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-gray-500 italic mt-2">
              No recent game history found for similar plays.
            </p>
          )}

          {similarPlay?.play_text && (
            <div className="mt-6">
              <p>
                <strong>Similar Play:</strong> {similarPlay.play_text}
              </p>
              <p>
                <em>Previous Game Yards:</em> {similarPlay.actual_yards} on{" "}
                {similarPlay.date}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OffenseAnalysis;
