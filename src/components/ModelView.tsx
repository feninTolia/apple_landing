import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from '@react-three/drei';
import { Dispatch, MutableRefObject, Suspense } from 'react';
import { Group, Vector3 } from 'three';
import { Iphone } from './Iphone';
import Lights from './Lights';
import Loader from './Loader';

interface IModel {
  title: string;
  color: string[];
  img: string;
}

interface IProps {
  index: number;
  groupRef: MutableRefObject<Group>;
  gsapType: 'view1' | 'view2';
  controlRef: React.MutableRefObject<null>;
  setRotationState: Dispatch<React.SetStateAction<number>>;
  item: IModel;
  size: string;
}

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: IProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={` w-full h-full absolute ${
        index === 2 ? 'right-[-100%]' : ''
      }`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        enableZoom={false}
        ref={controlRef}
        enablePan={false}
        rotateSpeed={0.4}
        target={new Vector3(0, 0, 0)}
        // @ts-expect-error !!!
        onEnd={() => setRotationState(controlRef?.current?.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1 ? 'small' : 'large'}`}
        position={[0, 0, 0]}
      >
        <Suspense
          fallback={
            <Html>
              <Loader />
            </Html>
          }
        >
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
