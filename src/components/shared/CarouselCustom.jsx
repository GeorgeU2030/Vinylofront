import { Carousel } from "react-bootstrap";
import { VideoDialog } from "../magic/VideoDialog";

export function CarouselCustom({videos}){
    return (
        <Carousel className='w-3/4 border-2 border-prim rounded-lg'>
          {videos.map((video)=>(
            <Carousel.Item key={video.id} interval={3000}>
                <VideoDialog videoSrc={`https://www.youtube.com/embed/${video.id}`} thumbnailSrc={video.snippet.thumbnails.maxres.url} />
                <Carousel.Caption className='hidden sm:block'>
                    <h3 className='bg-strong text-black rounded-lg text-base py-1 border-2 border-violetneon'>{video.snippet.title}</h3>
                </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
    );
}