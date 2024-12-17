import axios from "axios";

export const getMainVideos = async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=10&maxResults=20&key=${apiKey}`;
    const response = await axios.get(url);
    const allVideos = response.data.items;
    return allVideos.slice(5,20);
}

export const fiveVideos = async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=10&maxResults=5&key=${apiKey}`;
    const response = await axios.get(url);
    return response.data.items;
}

export const getChannelDetails = async (channelId) => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const url =   `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`
    const response = await axios.get(url);
    return response.data.items[0];
};