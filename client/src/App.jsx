import { useState } from "react";
import axios from "axios";

import ReportDashboard from "./components/ReportDashboard";

function App() {
  const [company, setCompany] = useState("");

  const [competitors, setCompetitors] = useState([
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);

  const [reportData, setReportData] = useState(null);

  const handleCompetitorChange = (index, value) => {
    const updated = [...competitors];

    updated[index] = value;

    setCompetitors(updated);
  };

  const generateReport = async () => {
    try {
      setLoading(true);

      const filteredCompetitors = competitors.filter(
        (c) => c.trim() !== ""
      );

      const response = await axios.post(
        "http://localhost:5000/api/report/generate-report",
        {
          company,
          competitors: filteredCompetitors,
        }
      );

      setReportData(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-3">
            Video Competitor Intelligence
          </h1>

          <p className="text-center text-slate-400 mb-8">
            Compare YouTube video marketing performance
          </p>

          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Company"
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              className="p-4 rounded-xl bg-slate-700 outline-none"
            />

            {competitors.map((comp, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Competitor ${index + 1}`}
                value={comp}
                onChange={(e) =>
                  handleCompetitorChange(
                    index,
                    e.target.value
                  )
                }
                className="p-4 rounded-xl bg-slate-700 outline-none"
              />
            ))}
          </div>

          {/* Button */}
          <button
            onClick={generateReport}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 transition-all p-4 rounded-xl font-semibold text-lg"
          >
            {loading
              ? "Analyzing Competitors..."
              : "Generate Intelligence Report"}
          </button>
        </div>

        {/* Dashboard */}
        <ReportDashboard data={reportData} />

        <div className="text-center text-slate-500 mt-10 pb-10">
           AI-Powered Video Competitor intelligence Platform
        </div>
      </div>
    </div>
  );
}
export default App;