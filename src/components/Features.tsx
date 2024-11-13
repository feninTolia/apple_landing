import { useGSAP } from '@gsap/react';
import { animateWithGSAP } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import { useRef } from 'react';

const Features = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useGSAP(() => {
    animateWithGSAP(
      '#features_title',
      { y: 0, opacity: 1 },
      { toggleActions: 'play' }
    );
    animateWithGSAP(
      '#explore-video',
      {
        y: 0,
        opacity: 1,
        onComplete: () => {
          videoRef.current?.play();
        },
      },
      {
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      }
    );
    animateWithGSAP(
      '.g-grow',
      { opacity: 1, scale: 1, ease: 'power1' },
      { scrub: 5.5 }
    );
    animateWithGSAP(
      '.g_text',
      {
        opacity: 1,
        y: 0,
        ease: 'power2.inOut',
        duration: 1,
      },
      { toggleActions: 'play' }
    );
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore the full story.
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium.
            </h2>
          </div>
        </div>

        <div className="flex-center flex-col sm:px-10" id="test">
          <div className="relative h-[50vh] w-full flex items-center">
            <video
              autoPlay
              muted
              playsInline
              id="explore-video"
              className="w-full h-full object-cover object-center"
              preload="none"
              ref={videoRef}
            >
              <source src={exploreVideo} type="video/mp4" />
            </video>
          </div>

          <div className="flex flex-col w-full relative">
            <div className="feature-video-container">
              <div className="overflow-hidden flex-1 h-[50vh]">
                <img
                  src={explore1Img}
                  alt="titanium"
                  className="feature-video g-grow"
                />
              </div>
              <div className="overflow-hidden flex-1 h-[50vh]">
                <img
                  src={explore2Img}
                  alt="titanium"
                  className="feature-video g-grow"
                />
              </div>
            </div>

            <div className="feature-text-container">
              <div className="flex-1 flex-center">
                <p className="feature-text g_text">
                  iPhone 16 Pro is{' '}
                  <span className="text-white">
                    the first iPhone to feature aerospace-grade titanium design
                  </span>
                  using the same alloy spacecrafts use for missions to mars.
                </p>
              </div>

              <div className="flex-1 flex-center">
                <p className="feature-text g_text">
                  Titanium has one of the best strength-to-weight ratios of any
                  metal, making these our{' '}
                  <span className="text-white">lightest Pro models ever.</span>
                  You'll notice the difference the moment you pick one up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
