import { YOUR_API_KEY } from './utils/constant';

export const fetchVideoDetails = async (videoId) => {
  try {
    console.log('Fetching details for video ID:', videoId);
    
    // Fetch video details from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUR_API_KEY}`
    );
    
    // Check if the response is OK (status 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch video details: ${response.statusText}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    // Check if the data contains video details
    if (data.items && data.items.length > 0) {
      return data.items[0]; // Return the first video details
    } else {
      throw new Error('No video details found.');
    }
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null; // Return null in case of an error
  }
};
