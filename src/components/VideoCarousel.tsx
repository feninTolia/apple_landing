import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { highlightsSlides } from '../constants';
import { pauseImg, playImg, replayImg } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);
  const [video, setVideo] = useState({
    isPlaying: false,
    isStartToPlay: false,
    isEnd: false,
    videoId: 0,
    isLastVideo: false,
  });
  const [loadedData, setLoadedData] = useState<
    SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);

  const { isPlaying, isStartToPlay, isEnd, videoId, isLastVideo } = video;

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, isStartToPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3 && videoRef) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else if (isStartToPlay) {
        videoRef.current[videoId].play();
      }
    }
  }, [isStartToPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // animate progress bar
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? '10vw'
                  : window.innerWidth < 1200
                  ? '8vw'
                  : '4vw ',
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], { width: 12 });
            gsap.to(span[videoId], { backgroundColor: '#afafaf' });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, isStartToPlay]);

  const handleProcess = (
    type: 'reset-video' | 'play' | 'pause' | 'video-end' | 'video-last',
    idx = 0
  ) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: idx + 1,
        }));
        break;
      case 'video-last':
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case 'reset-video':
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      case 'play':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case 'pause':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetadata = (
    // idx: number,
    event: SyntheticEvent<HTMLVideoElement, Event>
  ) => setLoadedData((prev) => [...prev, event]);

  return (
    <>
      <div className=" flex items-center">
        {highlightsSlides.map((list, idx) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  muted
                  className={`${
                    list.id === 2 && 'translate-x-44'
                  } pointer-events-none `}
                  preload="auto"
                  ref={(el) => {
                    if (el) {
                      videoRef.current[idx] = el;
                    }
                  }}
                  onPlay={() => {
                    setVideo((prev) => ({ ...prev, isPlaying: true }));
                  }}
                  onEnded={() =>
                    idx !== 3
                      ? handleProcess('video-end', idx)
                      : handleProcess('video-last')
                  }
                  onLoadedMetadata={(e) => handleLoadedMetadata(e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p className="md:text-2xl text-xl font-medium" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-6 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, idx) => (
            <span
              key={idx}
              className="mx-3 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => {
                if (el) {
                  videoDivRef.current[idx] = el;
                }
              }}
            >
              <span
                className="absolute h-full w-full rounded-full "
                ref={(el) => {
                  if (el) {
                    videoSpanRef.current[idx] = el;
                  }
                }}
              ></span>
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('reset-video')
                : !isPlaying
                ? () => handleProcess('play')
                : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
