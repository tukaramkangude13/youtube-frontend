import { YOUR_API_KEY } from "./utils/constant";

/**
 * Fetch YouTube channel details by channel ID.
 * 
 * @param {string} channelId - The unique ID of the YouTube channel.
 * @returns {Promise<Object>} - The JSON response containing channel details.
 */
export const getChannelDetails = async (channelId) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${YOUR_API_KEY}`
    );

    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status} ${response.statusText}`);
    // }

    const json = await response.json();

    // if (!json.items || json.items.length === 0) {
    //   throw new Error("No channel found for the provided ID.");
    // }

    // console.log("Channel Details:", json);
    return json;
  } catch (error) {
    console.error("Error fetching channel details:", error.message);
    return { error: error.message };
  }
};
