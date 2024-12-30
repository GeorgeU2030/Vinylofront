import YouTube from 'react-youtube';

export const YoutubeVideo = ({ videoId }) => {

    const onPlayerReady = (event) => {
        event.target.pauseVideo();
    };

    const opts = {
        height: '280',
        width: '500',
        playerVars: {
            autoplay: 1,
        },
    };

    if (!opts) {
      return <div>Loading...</div>; 
    }

    return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
}