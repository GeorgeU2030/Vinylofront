import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

export const YoutubeComponent = ({ videoId }) => {
    const [opts, setOpts] = useState(null); 

    const onPlayerReady = (event) => {
        event.target.pauseVideo();
    };

    useEffect(() => {
        const updatePlayerSize = () => {
            const width = window.innerWidth;
            let newOpts;

            if (width < 480) {
                newOpts = {
                    height: '200',
                    width: '320',
                    playerVars: { autoplay: 1 },
                };
            } else if (width < 768) {
                newOpts = {
                    height: '300',
                    width: '480',
                    playerVars: { autoplay: 1 },
                };
            } else if (width < 1024) {
                newOpts = {
                    height: '390',
                    width: '640',
                    playerVars: { autoplay: 1 },
                };
            } else {
                newOpts = {
                    height: '480',
                    width: '853',
                    playerVars: { autoplay: 1 },
                };
            }

            setOpts(newOpts);
        };

        updatePlayerSize();
        window.addEventListener('resize', updatePlayerSize);

        return () => window.removeEventListener('resize', updatePlayerSize);
    }, []);

    if (!opts) {
      return <div>Loading...</div>; 
    }

    return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
};


