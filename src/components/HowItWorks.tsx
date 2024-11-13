import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { chipImg, frameImg, frameVideo } from '../utils';
import { useRef } from 'react';
import { animateWithGSAP } from '../utils/animations';

const HowItWorks = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useGSAP(() => {
    gsap.from('#chip', {
      scrollTrigger: { trigger: '#chip', start: '20% bottom' },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut',
    });

    animateWithGSAP(
      '.g_fadeIn',
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.inOut',
      },
      { start: '0% bottom' }
    );
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div className="flex-center w-full my-20" id="chip">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A18 Pro chip <br /> A monster for gaming.
          </h2>

          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple GPU
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className={'bg-transparent relative z-10'}
              />
            </div>

            <div className="hiw-video">
              <video
                className="pointer-events-none"
                preload="none"
                muted
                playsInline
                autoPlay
                loop
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          <p className="text-gray font-semibold text-center mt-3">
            Honkai: Star Rail
          </p>

          <div className="hiw-text-container mt-10 ">
            <div className="flex-1 flex justify-center flex-col gap-5">
              <p className="hiw-text g_fadeIn">
                A18 Pro is an entirely new class of iPhone chip{' '}
                <span className="text-white">
                  best graphic performance by far
                </span>
                .
              </p>

              <p className="hiw-text g_fadeIn">
                Mobile{' '}
                <span className="text-white">
                  games will look and feel so immersive
                </span>
                , with incredibly detailed environments and more realistic
                characters. And with industry-leading speed and efficiency, A17
                Pro takes fast and runs with it.
              </p>
            </div>

            <div className="flex-1 flex justify-center flex-col g_fadeIn">
              <p className="hiw-text">New</p>
              <p className="hiw-bigtext">Pro-class GPU</p>
              <p className="hiw-text">with 6 cores</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
