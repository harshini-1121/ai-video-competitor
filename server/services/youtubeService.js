const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

// Search company channel
async function searchChannel(companyName) {
  try {
    const response = await youtube.search.list({
      part: "snippet",
      q: `${companyName} official`,
      type: "channel",
      maxResults: 1,
    });

    const item = response.data.items[0];

    if (!item) {
      throw new Error("No channel found");
    }

    return {
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get channel statistics
async function getChannelStats(channelId) {
  try {
    const response = await youtube.channels.list({
      part: "statistics,snippet",
      id: channelId,
    });

    const channel = response.data.items[0];

    return {
      subscribers: Number(channel.statistics.subscriberCount),
      totalViews: Number(channel.statistics.viewCount),
      totalVideos: Number(channel.statistics.videoCount),
      createdAt: channel.snippet.publishedAt,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get latest videos
async function getRecentVideos(channelId) {
  try {
    // Search latest videos
    const searchResponse = await youtube.search.list({
      part: "snippet",
      channelId,
      maxResults: 20,
      order: "date",
      type: "video",
    });

    const videoIds = searchResponse.data.items.map(
      (item) => item.id.videoId
    );

    // Get video stats
    const videoResponse = await youtube.videos.list({
      part: "statistics,snippet",
      id: videoIds.join(","),
    });

    return videoResponse.data.items.map((video) => ({
      title: video.snippet.title,
      publishedAt: video.snippet.publishedAt,
      views: Number(video.statistics.viewCount || 0),
      likes: Number(video.statistics.likeCount || 0),
      comments: Number(video.statistics.commentCount || 0),
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  searchChannel,
  getChannelStats,
  getRecentVideos,
};