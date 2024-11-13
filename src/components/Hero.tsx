import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 640 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 640) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };
  useEffect(() => {
    addEventListener('resize', handleVideoSrcSet);
    return () => {
      removeEventListener('resize', handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to('.hero-title', { opacity: 1, delay: 2, duration: 1 });
    gsap.to('#cta', { opacity: 1, y: '-70%', delay: 2, duration: 1 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 flex-center w-full flex-col gap-5">
        <p className="hero-title">iPhone 16 Pro</p>
        <div className="w-9/12 md:w-10/12">
          <video
            className=" pointer-events-none"
            muted
            autoPlay
            key={videoSrc}
            playsInline={true}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-[-60%] "
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className=" font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
