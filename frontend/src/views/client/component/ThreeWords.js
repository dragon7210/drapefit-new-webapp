import { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import 'assets/scss/_threejs.scss';

const itemStrArr = [
  { key: "Men's Clothing", val: '/men' },
  { key: "Big & Tall Men's Clothing", val: '/men/big-tall' },
  { key: "Women's Clothing", val: '/women' },
  { key: 'Plus Size Clothing', val: '/women/plus-size' },
  { key: 'Women Jeans Clothing', val: '/women/women-jeans' },
  { key: 'Women Business Clothing', val: '/women/women-business' },
  { key: "Women's Activewear", val: '/women' },
  { key: 'Maternity Activewear', val: '/women/maternity' },
  { key: 'Plus Activewear', val: '/women/plus-size' },
  { key: 'Kids Clothing Box', val: '/kids' },
  { key: 'Size Inclusive Clothing', val: '/women' },
  { key: 'How Drape Fit Works', val: '/recommended/how-drape-fit-works' },
  { key: 'Fit Box Pricing', val: '/recommended/fit-box-pricing' },
  { key: 'Personal Stylist', val: '/recommended/personal-stylist' },
  { key: 'FAQ', val: '/customer-care/faq' },
  { key: 'Gift Card', val: '/customer-care/help-center' },
  { key: 'Return & Exchange', val: '/customer-care/return-and-exchange' },
  { key: 'Track Order', val: '/customer-care/track-order' },
  { key: 'Help Center', val: '/customer-care/help-center' },
  { key: 'Contact Us', val: '/customer-care/contact-us' },
  { key: 'News', val: '/the-company/news' },
  { key: 'Investors Relation', val: '/the-company/investors-relation' },
  { key: 'Careers', val: '/the-company/careers' },
  { key: "Women's Clothing", val: '/women' },
  { key: 'Plus Size Clothing', val: '/women/plus-size' },
  { key: 'Women Jeans Clothing', val: '/women/women-jeans' },
  { key: 'Women Business Clothing', val: '/women/women-business' },
  { key: "Women's Activewear", val: '/women' },
  { key: 'Maternity Activewear', val: '/women/maternity' },
  { key: 'Plus Activewear', val: '/women/plus-size' },
  { key: "Men's Clothing", val: '/men' },
  { key: "Big & Tall Men's Clothing", val: '/men/big-tall' },
  { key: 'How Drape Fit Works', val: '/recommended/how-drape-fit-works' },
  { key: 'Fit Box Pricing', val: '/recommended/fit-box-pricing' },
  { key: 'Personal Stylist', val: '/recommended/personal-stylist' }
];

const Word = ({ children, ...props }) => {
  const navigate = useNavigate();
  const color = new THREE.Color();
  const fontProps = {
    font: '/fonts/Inter-Bold.woff',
    fontSize: 1.2,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer';
    return () => (document.body.style.cursor = 'auto');
  }, [hovered]);

  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);
    ref.current.material.color.lerp(color.set(hovered ? '#fe6c00' : '#232f3e'), 0.1);
  });

  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      onClick={() => navigate(`${ref.current.path}`)}
      {...props}
      {...fontProps}
      children={children}
    />
  );
};

Word.propTypes = {
  children: PropTypes.node.isRequired
};

const Cloud = ({ count, radius }) => {
  const gap = Math.pow(count, 2) - itemStrArr.length;
  if (gap > 0) {
    for (let n = 0; n < gap; n++) {
      itemStrArr.push({ key: '', val: '' });
    }
  }
  const words = useMemo(() => {
    let temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        temp.push([
          new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * (i + 1), thetaSpan * j)),
          itemStrArr[i * count + j].key,
          itemStrArr[i * count + j].val
        ]);
      }
    }
    return temp;
  }, [count, radius]);

  return words.map(([pos, word, link], index) => <Word key={index} children={word} position={pos} path={link} />);
};

const ThreeWords = () => {
  const count = Math.ceil(Math.sqrt(itemStrArr.length));

  return (
    <div className="three-section-wrapper">
      <div className="three-canvas-wrap">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
          <fog attach="fog" args={['#232f3e', 0, 80]} />
          <Cloud count={count} radius={20} />
          <OrbitControls
            enableZoom={true}
            minZoom={1}
            maxZoom={5}
            minDistance={10}
            maxDistance={40}
            rotateSpeed={0.3}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeWords;
