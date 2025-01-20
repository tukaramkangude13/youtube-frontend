import { GETCHANNEL_DETAILS, YOUR_API_KEY } from "./utils/constant";


export const getChannelDetails = async (channelId) => {
  try {
    const response = await fetch(
      `${GETCHANNEL_DETAILS}${channelId}&key=${YOUR_API_KEY}`
    );

    

    const json = await response.json();

   
    return json;
  } catch (error) {
    console.error("Error fetching channel details:", error.message);
    return { error: error.message };
  }
};
