const pptxgen = require("pptxgenjs");

async function generatePPT(reportData) {
  const pptx = new pptxgen();

  pptx.layout = "LAYOUT_WIDE";

  pptx.author = "Harshini";
  pptx.company = "MyPromoVideo";
  pptx.subject =
    "Video Competitor Intelligence";
  pptx.title =
    "Competitor Intelligence Report";

  const primaryColor = "2563EB";
  const darkColor = "0F172A";
  const whiteColor = "FFFFFF";

  // ====================================
  // COVER SLIDE
  // ====================================

  const cover = pptx.addSlide();

  cover.background = {
    color: darkColor,
  };

  cover.addText(
    "Video Competitor Intelligence",
    {
      x: 1,
      y: 1.5,
      w: 10,
      h: 1,
      fontSize: 28,
      bold: true,
      color: whiteColor,
      align: "center",
    }
  );

  cover.addText(
    `Generated on ${new Date().toLocaleDateString()}`,
    {
      x: 1,
      y: 3,
      w: 10,
      h: 0.5,
      fontSize: 16,
      color: "D1D5DB",
      align: "center",
    }
  );

  // ====================================
  // EXECUTIVE SUMMARY
  // ====================================

  const summary = pptx.addSlide();

  summary.addText(
    "Executive Summary",
    {
      x: 0.5,
      y: 0.5,
      fontSize: 24,
      bold: true,
      color: darkColor,
    }
  );

  summary.addText(
    reportData.executiveSummary,
    {
      x: 0.8,
      y: 1.5,
      w: 11,
      h: 2,
      fontSize: 18,
      color: "374151",
    }
  );

  // ====================================
  // RANKINGS SLIDE
  // ====================================

  const rankingsSlide = pptx.addSlide();

  rankingsSlide.addText(
    "Company Rankings",
    {
      x: 0.5,
      y: 0.5,
      fontSize: 24,
      bold: true,
    }
  );

  let rankingY = 1.5;

  reportData.rankings.forEach(
    (company, index) => {
      rankingsSlide.addShape(
        pptx.ShapeType.roundRect,
        {
          x: 0.8,
          y: rankingY,
          w: 11,
          h: 0.8,
          fill: {
            color:
              index === 0
                ? "DBEAFE"
                : "F3F4F6",
          },
          radius: 0.1,
        }
      );

      rankingsSlide.addText(
        `#${index + 1} ${
          company.company
        }`,
        {
          x: 1,
          y: rankingY + 0.2,
          fontSize: 18,
          bold: true,
        }
      );

      rankingsSlide.addText(
        `Score: ${company.score.toLocaleString()}`,
        {
          x: 8,
          y: rankingY + 0.2,
          fontSize: 16,
          color: primaryColor,
        }
      );

      rankingY += 1;
    }
  );

  // ====================================
  // COMPANY SLIDES
  // ====================================

  reportData.rankings.forEach(
    (company) => {
      // OVERVIEW SLIDE

      const overview = pptx.addSlide();

      overview.addText(
        `${company.company} Overview`,
        {
          x: 0.5,
          y: 0.5,
          fontSize: 24,
          bold: true,
          color: darkColor,
        }
      );

      overview.addText(
        `Subscribers: ${company.stats.subscribers.toLocaleString()}`,
        {
          x: 1,
          y: 1.5,
          fontSize: 18,
        }
      );

      overview.addText(
        `Average Views: ${company.metrics.avgViews.toLocaleString()}`,
        {
          x: 1,
          y: 2.2,
          fontSize: 18,
        }
      );

      overview.addText(
        `Engagement Rate: ${company.metrics.engagementRate}%`,
        {
          x: 1,
          y: 2.9,
          fontSize: 18,
        }
      );

      // INSIGHTS

      overview.addText(
        "Key Insights",
        {
          x: 1,
          y: 4,
          fontSize: 20,
          bold: true,
          color: primaryColor,
        }
      );

      company.insights.forEach(
        (insight, idx) => {
          overview.addText(
            `• ${insight}`,
            {
              x: 1.2,
              y: 4.6 + idx * 0.5,
              fontSize: 16,
            }
          );
        }
      );

      // TOP VIDEOS SLIDE

      const videosSlide = pptx.addSlide();

      videosSlide.addText(
        `${company.company} Top Videos`,
        {
          x: 0.5,
          y: 0.5,
          fontSize: 24,
          bold: true,
        }
      );

      const topVideos = [
        ...company.videos,
      ]
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      let videoY = 1.5;

      topVideos.forEach(
        (video, index) => {
          videosSlide.addShape(
            pptx.ShapeType.roundRect,
            {
              x: 0.7,
              y: videoY,
              w: 11,
              h: 0.8,
              fill: {
                color: "EFF6FF",
              },
              radius: 0.1,
            }
          );

          videosSlide.addText(
            `${index + 1}. ${
              video.title
            }`,
            {
              x: 1,
              y: videoY + 0.1,
              w: 6,
              fontSize: 14,
              bold: true,
            }
          );

          videosSlide.addText(
            `${video.views.toLocaleString()} views`,
            {
              x: 8,
              y: videoY + 0.2,
              fontSize: 14,
              color: primaryColor,
            }
          );

          videoY += 1;
        }
      );
    }
  );

  // ====================================
  // RECOMMENDATIONS SLIDE
  // ====================================

  const recommendations =
    pptx.addSlide();

  recommendations.addText(
    "Video Marketing Recommendations",
    {
      x: 0.5,
      y: 0.5,
      fontSize: 24,
      bold: true,
    }
  );

  const recs = [
    "Increase upload consistency to improve audience retention.",
    "Focus more on storytelling and product demo content.",
    "Use YouTube Shorts to improve discoverability.",
    "Improve audience interaction through comments and CTAs.",
    "Analyze competitor content gaps regularly.",
  ];

  recs.forEach((rec, index) => {
    recommendations.addText(
      `• ${rec}`,
      {
        x: 1,
        y: 1.5 + index * 0.7,
        fontSize: 18,
      }
    );
  });

  // ====================================
  // SAVE FILE
  // ====================================

  const fileName = "report.pptx";

  await pptx.writeFile({
    fileName,
  });

  return fileName;
}

module.exports = generatePPT;