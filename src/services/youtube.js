import axios, { all } from "axios";

export const getMainVideos = async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

    const cacheKey = "mainVideos"
    const cacheExpirationKey = "mainVideosExpiration"

    // check if these are cached videos

    const cachedVideos = localStorage.getItem(cacheKey)
    const cacheExpiration = localStorage.getItem(cacheExpirationKey)
    const currentTime = new Date().getTime()


    if(cachedVideos && cacheExpiration && currentTime < cacheExpiration){
        return JSON.parse(cachedVideos)
    }else{

        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=10&maxResults=20&key=${apiKey}`;
        const response = await axios.get(url);
        const allVideos = response.data.items;
       
        // Save the data in storage 24 hrs for the videos
        localStorage.setItem(cacheKey, JSON.stringify(allVideos.slice(5,20)))
        localStorage.setItem(cacheExpirationKey, currentTime+86400000)

        return allVideos.slice(5,20);
    }
}

export const fiveVideos = async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

    const cacheKey = "fiveVideos"
    const cacheExpirationKey = "fiveVideosExpiration"

    // check if these are cached videos

    const cachedVideos = localStorage.getItem(cacheKey)
    const cacheExpiration = localStorage.getItem(cacheExpirationKey)
    const currentTime = new Date().getTime()

    if(cachedVideos && cacheExpiration && currentTime < cacheExpiration){
        
        return JSON.parse(cachedVideos)
    }else{

        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=10&maxResults=5&key=${apiKey}`;
        const response = await axios.get(url);
       
        // Save the data in storage 24 hrs for the videos
        localStorage.setItem(cacheKey, JSON.stringify(response.data.items))
        localStorage.setItem(cacheExpirationKey, currentTime+86400000)
        
        return response.data.items;
    }
}

export const getChannelDetails = async (channelId) => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const cacheKey = `channelDetails-${channelId}`;  // Key for every channel
    const cacheExpirationKey = `channelDetailsExpiration-${channelId}`;

    // Check if the channel data is cached
    const cachedChannel = localStorage.getItem(cacheKey);
    const cacheExpiration = localStorage.getItem(cacheExpirationKey);
    const currentTime = new Date().getTime();
    
    if (cachedChannel && cacheExpiration && currentTime < cacheExpiration) {
        
        return JSON.parse(cachedChannel);
    } else {
       
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;
        const response = await axios.get(url);

        // Save the data in storage for 24 hours
        localStorage.setItem(cacheKey, JSON.stringify(response.data.items[0]));
        localStorage.setItem(cacheExpirationKey, currentTime + 86400000); 

        return response.data.items[0];
    }
};


export const searchVideoandGetId = async (searchTerm) => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const cacheKey = `search-${searchTerm}`;  // Key for every search term
    const cacheExpirationKey = `searchExpiration-${searchTerm}`;

    // Check if the video ID is cached
    const cachedVideoId = localStorage.getItem(cacheKey);
    const cacheExpiration = localStorage.getItem(cacheExpirationKey);
    const currentTime = new Date().getTime();
    
    if (cachedVideoId && cacheExpiration && currentTime < cacheExpiration) {
        
        return cachedVideoId;
    } else {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerm}&type=video&key=${apiKey}`;
        const response = await axios.get(url);
        const videoId = response.data.items[0].id.videoId;
        
        // Save the data in storage for 24 hours
        localStorage.setItem(cacheKey, videoId);
        localStorage.setItem(cacheExpirationKey, currentTime + 86400000); // Expira en 24 horas

        return videoId;
    }
};

