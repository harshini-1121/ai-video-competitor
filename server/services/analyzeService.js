function calculateMetrics(videos) {
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);

  const totalLikes = videos.reduce((sum, v) => sum + v.likes, 0);

  const totalComments = videos.reduce(
    (sum, v) => sum + v.comments,
    0
  );

  const avgViews = Math.floor(totalViews / videos.length);

  const avgLikes = Math.floor(totalLikes / videos.length);

  const avgComments = Math.floor(
    totalComments / videos.length
  );

  const engagementRate =
    ((totalLikes + totalComments) / totalViews) * 100;

  return {
    avgViews,
    avgLikes,
    avgComments,
    engagementRate: engagementRate.toFixed(2),
  };
}

function generateInsights(companyData) {
  const insights = [];

  if (companyData.metrics.engagementRate > 5) {
    insights.push(
      `${companyData.company} has exceptionally strong audience engagement.`
    );
  }

  if (companyData.metrics.avgViews > 100000) {
    insights.push(
      `${companyData.company} generates high average video reach.`
    );
  }

  if (companyData.stats.totalVideos > 1000) {
    insights.push(
      `${companyData.company} maintains a highly active content strategy.`
    );
  }

  if (insights.length === 0) {
    insights.push(
      `${companyData.company} has moderate video marketing performance with room for stronger engagement and consistency.`
    );
  }

  return insights;
}

function rankCompanies(allCompanies) {
  return allCompanies
    .map((company) => {
      const score =
        company.metrics.avgViews * 0.4 +
        company.metrics.engagementRate * 1000 * 0.4 +
        company.stats.subscribers * 0.2;

      return {
        ...company,
        score: Math.floor(score),
      };
    })
    .sort((a, b) => b.score - a.score);
}

module.exports = {
  calculateMetrics,
  generateInsights,
  rankCompanies,
};