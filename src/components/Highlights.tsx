import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { rightImg, watchImg } from '../utils';
import VideoCarousel from './VideoCarousel';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  useGSAP(() => {
    gsap.to('#title', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      scrollTrigger: '#title',
    });
    gsap.to('.link', {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      scrollTrigger: '.link',
    });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-baseline justify-between ">
          <h2 id="title" className="section-heading w-fit">
            Get the highlights
          </h2>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event{' '}
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
