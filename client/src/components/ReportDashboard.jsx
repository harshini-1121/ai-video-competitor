import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ReportDashboard({ data }) {
  if (!data) return null;
  const formatNumber = (num) => {
    new Intl.FormatNumber("en-US").format(num);

  // Download PPT
  const downloadPPT = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/report/download-ppt",
        data,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "competitor-report.pptx"
      );

      document.body.appendChild(link);

      link.click();
    } catch (error) {
      console.log(error);
      alert("Failed to download PowerPoint");
    }
  };

  // Chart data
  const chartData = data.rankings.map((company) => ({
    name: company.company,
    subscribers: company.stats.subscribers,
  }));

  return (
    <div className="mt-10 space-y-8">
      {/* Download Button */}
      <div className="flex justify-end">
        <button
          onClick={downloadPPT}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          Download PowerPoint Report
        </button>
      </div>

      {/* Executive Summary */}
      <div className="bg-slate-800 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Executive Summary
        </h2>

        <p className="text-slate-300 leading-7">
          {data.executiveSummary}
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {data.rankings.slice(0, 3).map((company, index) => (
          <div
            key={index}
            className="bg-slate-800 p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold mb-2">
              {company.company}
            </h3>

            <p className="text-slate-400">
              Subscribers
            </p>

            <p className="text-3xl font-bold text-blue-400 mb-4">
              {new Intl.NumberFormat("en-US").format(
                company.stats.subscribers
              )}
            </p>

            <p className="text-slate-400">
              Avg Views
            </p>

            <p className="text-2xl font-semibold">
              {new Intl.NumberFormat("en-US").format(company.metrics.avgViews)}
            </p>
          </div>
        ))}
      </div>

      {/* Rankings */}
      <div className="bg-slate-800 p-6 rounded-2xl hover:scale-[1.01] transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6">
          Company Rankings
        </h2>

        <div className="space-y-4">
          {data.rankings.map((company, index) => (
            <div
              key={index}
              className="bg-slate-700 p-4 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">
                    #{index + 1} {company.company}
                  </h3>

                  <p className="text-slate-300">
                    Subscribers:{" "}
                    {new Intl.NumberFormat("en-US").format(company.stats.subscribers)}
                  </p>

                  <p className="text-slate-300">
                    Avg Views:{" "}
                    {new Intl.NumberFormat("en-US").format(company.metrics.avgViews)}
                  </p>

                  <p className="text-slate-300">
                    Engagement Rate:{" "}
                    {new Intl.NumberFormat("en-US").format(company.metrics.engagementRate)}%
                  </p>
                </div>

                <div className="text-3xl font-bold text-blue-400">
                  {new Intl.NumberFormat("en-US").format(company.score)}
                </div>
              </div>

              {/* Insights */}
              <div className="mt-4">
                {company.insights.map((insight, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-slate-400"
                  >
                    • {insight}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriber Chart */}
      <div className="bg-slate-800 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">
          Subscriber Comparison
        </h2>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />

              <Bar
                dataKey="subscribers"
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Videos */}
      <div className="bg-slate-800 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">
          Top Performing Videos
        </h2>

        <div className="space-y-6">
          {data.rankings.map((company, index) => {
            const topVideo = [...company.videos].sort(
              (a, b) => b.views - a.views
            )[0];

            return (
              <div
                key={index}
                className="bg-slate-700 p-4 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {company.company}
                </h3>

                <p className="font-medium">
                  {topVideo.title}
                </p>

                <div className="flex gap-6 mt-3 text-slate-300">
                  <span>
                    👁{" "}
                    {new Intl.NumberFormat("en-US").format(topVideo.views)}
                  </span>

                  <span>
                    👍{" "}
                    {new Intl.NumberFormat("en-US").format(topVideo.likes)}
                  </span>

                  <span>
                    💬{" "}
                    {new Intl.NumberFormat("en-US").format(topVideo.comments)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-slate-800 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">
          Video Marketing Recommendations
        </h2>

        <div className="space-y-4 text-slate-300 leading-7">
          <p>
            • Increase upload consistency to improve
            audience retention.
          </p>

          <p>
            • Focus more on storytelling and
            product demo content.
          </p>

          <p>
            • Use YouTube Shorts and trend-driven
            topics for discoverability.
          </p>

          <p>
            • Improve audience engagement using
            comments and CTA strategies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReportDashboard;