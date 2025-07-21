import { useState } from "react";
import { Save, PlusCircle, Trash2 } from "lucide-react";
import jsPDF from "jspdf";

interface Scenario {
  period: number;
  down: number;
  distance: number;
  yards_to_goal: number;
  clock_seconds: number;
  offense_score: number;
  defense_score: number;
  play_type: "Pass" | "Rush";
  prediction?: number;
}

const ReportsPage = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      period: 1,
      down: 1,
      distance: 10,
      yards_to_goal: 50,
      clock_seconds: 600,
      offense_score: 0,
      defense_score: 0,
      play_type: "Pass",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Scenario[]>([]);

  const handleChange = (
    index: number,
    field: keyof Scenario,
    value: string | number
  ) => {
    const updated = [...scenarios];
    if (field === "clock_seconds" && typeof value === "string") {
      const [min, sec] = value.split(":").map(Number);
      updated[index][field] = min * 60 + sec;
    } else {
      updated[index][field] = value as never;
    }
    setScenarios(updated);
  };

  const addScenario = () => {
    setScenarios([
      ...scenarios,
      {
        period: 1,
        down: 1,
        distance: 10,
        yards_to_goal: 50,
        clock_seconds: 600,
        offense_score: 0,
        defense_score: 0,
        play_type: "Pass",
      },
    ]);
  };

  const removeScenario = (index: number) => {
    const updated = scenarios.filter((_, i) => i !== index);
    setScenarios(updated);
  };

  const fetchPredictions = async () => {
    setLoading(true);
    const predicted: Scenario[] = [];

    for (const scenario of scenarios) {
      const body = {
        ...scenario,
        "play_type_Pass Reception": scenario.play_type === "Pass" ? 1 : 0,
        play_type_Rush: scenario.play_type === "Rush" ? 1 : 0,
      };

      try {
        const response = await fetch(
          "https://offense-api.onrender.com/predictoffense",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        const data = await response.json();
        predicted.push({ ...scenario, prediction: data.predicted_yards });
      } catch (error) {
        console.error("Prediction error:", error);
      }
    }

    setResults(predicted);
    setLoading(false);
  };

  const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Offensive Scenario Report", 20, 20);

    results.forEach((s, i) => {
      const y = 30 + i * 25;
      doc.setFontSize(11);
      doc.text(`Scenario ${i + 1}:`, 20, y);
      doc.text(
        `Period: ${s.period}, Down: ${s.down}, Distance: ${s.distance}, YTG: ${
          s.yards_to_goal
        }, Clock: ${formatTime(s.clock_seconds)}, Play Type: ${
          s.play_type
        }, Predicted Yards: ${s.prediction?.toFixed(2)}`,
        20,
        y + 8
      );
    });

    doc.save("offense-report.pdf");
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Scenario Reports</h2>

      {scenarios.map((scenario, index) => (
        <div key={index} className="card p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Scenario {index + 1}</h3>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeScenario(index)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex flex-col">
              Period
              <input
                type="number"
                value={scenario.period}
                onChange={(e) =>
                  handleChange(index, "period", Number(e.target.value))
                }
                className="input-field"
              />
            </label>
            <label className="flex flex-col">
              Down
              <input
                type="number"
                value={scenario.down}
                onChange={(e) =>
                  handleChange(index, "down", Number(e.target.value))
                }
                className="input-field"
              />
            </label>
            <label className="flex flex-col">
              Distance
              <input
                type="number"
                value={scenario.distance}
                onChange={(e) =>
                  handleChange(index, "distance", Number(e.target.value))
                }
                className="input-field"
              />
            </label>
            <label className="flex flex-col">
              Yards to Goal
              <input
                type="number"
                value={scenario.yards_to_goal}
                onChange={(e) =>
                  handleChange(index, "yards_to_goal", Number(e.target.value))
                }
                className="input-field"
              />
            </label>
            <label className="flex flex-col">
              Clock (MM:SS)
              <input
                type="text"
                onChange={(e) =>
                  handleChange(index, "clock_seconds", e.target.value)
                }
                className="input-field"
              />
            </label>
            <label className="flex flex-col">
              Offense Score
              <input
                type="number"
                value={scenario.offense_score}
                onChange={(e) =>
                  handleChange(index, "offense_score", Number(e.target.value))
                }
                className="input-field"
              />
            </label>
            <label className="flex flex-col">
              Defense Score
              <input
                type="number"
                value={scenario.defense_score}
                onChange={(e) =>
                  handleChange(index, "defense_score", Number(e.target.value))
                }
                className="input-field"
              />
            </label>
            <label className="flex flex-col">
              Play Type
              <select
                value={scenario.play_type}
                onChange={(e) =>
                  handleChange(index, "play_type", e.target.value)
                }
                className="input-field"
              >
                <option value="Pass">Pass</option>
                <option value="Rush">Rush</option>
              </select>
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={addScenario}
        className="btn-secondary flex items-center space-x-2"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Add Scenario</span>
      </button>

      <button
        onClick={fetchPredictions}
        className="btn-primary flex items-center space-x-2"
        disabled={loading}
      >
        <Save className="w-4 h-4" />
        <span>{loading ? "Generating..." : "Generate Report"}</span>
      </button>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((s, i) => (
            <div key={i} className="card p-4">
              <p>
                <strong>Scenario {i + 1}</strong>
              </p>
              <p>
                Period {s.period}, Down {s.down}, Distance {s.distance}, Yards
                to Goal {s.yards_to_goal}, Time {formatTime(s.clock_seconds)},
                Play Type: {s.play_type}, Predicted Yards:{" "}
                <strong>{s.prediction?.toFixed(2)}</strong>
              </p>
            </div>
          ))}

          <button onClick={exportPDF} className="btn-secondary mt-4">
            Export to PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
