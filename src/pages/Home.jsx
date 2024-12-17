
import { CarouselCustom } from "@/components/shared/CarouselCustom";
import { Layout } from "@/layout/Layout";
import { fiveVideos } from "@/services/youtube";
import { useEffect, useState } from "react";


export function Home(){

  const [mainVideos, setMainVideos] = useState([]);

  useEffect(() => {
    fiveVideos().then((videos) => setMainVideos(videos));
  },[])

  return (
    <Layout menuActiveItem="home">
      <div className="flex justify-center">
        <CarouselCustom videos={mainVideos} />
      </div>
    </Layout>
  )
}