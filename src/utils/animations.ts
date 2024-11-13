import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Group, Object3DEventMap } from 'three';

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsapTimeLine = (
  timeline: gsap.core.Timeline,
  rotationRef: React.MutableRefObject<Group<Object3DEventMap>>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: gsap.TweenVars
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut',
  });
  timeline.to(firstTarget, { ...animationProps, ease: 'power2.inOut' }, '<');
  timeline.to(secondTarget, { ...animationProps, ease: 'power2.inOut' }, '<');
};

export const animateWithGSAP = (
  target: gsap.TweenTarget,
  animationProps: gsap.TweenVars,
  scrollProps?: ScrollTrigger.Vars
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target as unknown as gsap.DOMTarget,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    },
  });
};
