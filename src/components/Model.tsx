import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { yellowImg } from '../utils';
import ModelView from './ModelView';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { models, sizes } from '../constants';
import { animateWithGsapTimeLine } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 in Natural Titanium',
    color: ['#8f8a81', '#ffe7b9', '#6f6c64'],
    img: yellowImg,
  });

  // camera control for model view
  const cameraControlSmall = useRef(null);
  const cameraControlLarge = useRef(null);

  //model
  const small = useRef(new Group());
  const large = useRef(new Group());

  //rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();
  useEffect(() => {
    if (size === 'large') {
      animateWithGsapTimeLine(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2,
      });
    }
    if (size === 'small') {
      animateWithGsapTimeLine(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to('#model-heading', {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: { trigger: '#model-heading' },
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h2 id="model-heading" className="section-heading">
          Take a closer look.
        </h2>

        <div className="flex flex-col items-center">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')!}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item) => (
                  <li key={item.id}>
                    <button
                      className="w-6 h-6 rounded-full mx-2"
                      style={{ backgroundColor: item.color[0] }}
                      onClick={() => setModel(item)}
                    />
                  </li>
                ))}
              </ul>

              <div className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <button
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
