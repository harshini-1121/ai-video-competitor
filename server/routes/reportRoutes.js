const express = require("express");

const router = express.Router();

const {
  searchChannel,
  getChannelStats,
  getRecentVideos,
} = require("../services/youtubeService");

const {
  calculateMetrics,
  generateInsights,
  rankCompanies,
} = require("../services/analyzeService");

const generatePPT = require("../ppt/generatePPT");

// ======================================
// GENERATE REPORT ROUTE
// ======================================

router.post("/generate-report", async (req, res) => {
  try {
    const { company, competitors = [] } = req.body;

    const allCompanies = [company, ...competitors];

    const reportData = [];

    for (const companyName of allCompanies) {
      try {
        const channel = await searchChannel(companyName);

        const stats = await getChannelStats(
          channel.channelId
        );

        const videos = await getRecentVideos(
          channel.channelId
        );

        // Skip if no videos
        if (!videos || videos.length === 0) {
          continue;
        }

        const metrics = calculateMetrics(videos);

        const insights = generateInsights({
          company: companyName,
          stats,
          metrics,
        });

        reportData.push({
          company: companyName,
          channel,
          stats,
          videos,
          metrics,
          insights,
        });
      } catch (err) {
        console.log(
          `Skipping company: ${companyName}`
        );

        console.log(err.message);
      }
    }

    // Safety check
    if (reportData.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Could not fetch company data",
      });
    }

    const rankings = rankCompanies(reportData);

    const executiveSummary = `
${rankings[0].company} currently leads the competitive video marketing landscape based on engagement performance, subscriber strength, and audience reach.

The analysis shows clear differences in upload consistency, engagement quality, and content reach across competitors.

Brands with stronger engagement appear to benefit from better storytelling and audience-focused content strategies.
`;

    res.json({
      success: true,
      executiveSummary,
      rankings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================================
// DOWNLOAD PPT ROUTE
// ======================================

router.post("/download-ppt", async (req, res) => {
  try {
    const reportData = req.body;

    const pptPath = await generatePPT(
      reportData
    );

    res.download(pptPath);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;