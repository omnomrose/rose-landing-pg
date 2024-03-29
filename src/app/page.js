'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import { useTransform, useScroll, motion } from 'framer-motion';
import useMousePosition from './utils/useMousePosition';
import Header from '@/components/Header';

const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.jpg",
  "6.jpg",
  "7.png",
  "8.png",
  "9.jpg",
  "10.jpg",
  "11.png",
  "12.png",
];

export default function Home() {

  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const { x, y: mouseY } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <main className={styles.main}>
      <Header />
      <motion.div
        className={styles.mask}
        animate={{
          WebkitMaskPosition: `${x - (size / 2)}px ${mouseY - (size / 2)}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className={styles.p}>
          I&apos;m a UX/UI DESIGNER that knits solutions and intuitive experiences together.
        </p>
      </motion.div>

      <div className={styles.body}>
        <p className={styles.p}>
          I&apos;m a <span className={styles.span}> UX/UI DESIGNER </span> that knits solutions and intuitive experiences together.
        </p>
      </div>
      <div className={styles.spacer}></div>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <footer className={styles.footer}>
        <a href="https://maryrosenguyen.com" className={styles.ctaLink}>Visit my Portfolio</a>
      </footer>
    </main>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div
      className={styles.column}
      style={{ y }}
    >
      {
        images.map((src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <Image
              src={`/images/${src}`}
              alt='image'
              fill
            />
          </div>
        })
      }
    </motion.div>
  );
};
