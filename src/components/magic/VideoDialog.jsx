import HeroVideoDialog from "../ui/hero-video-dialog";

export const VideoDialog = ({videoSrc, thumbnailSrc}) => {
    return (
        <div className="relative">
          <HeroVideoDialog
            className="dark:hidden block"
            animationStyle="top-in-bottom-out"
            videoSrc={videoSrc}
            thumbnailSrc={thumbnailSrc}
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="top-in-bottom-out"
            videoSrc={videoSrc}
            thumbnailSrc={thumbnailSrc}
            thumbnailAlt="Hero Video"
          />
        </div>
    );
}