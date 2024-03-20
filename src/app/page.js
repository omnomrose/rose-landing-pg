'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from './utils/useMousePosition';
import styles from '@/app/page.module.css'
import Header from '@/components/Header';
export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 300 : 40;

  return (
    <main className={styles.main}>
      <Header />
      <motion.div
        className={styles.mask}
        animate={{
          WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p className={styles.para} onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }}>
          I'm a <span className={styles.span}>UX/UI Designer</span> that knits solutions and intuitive experiences together.
        </p>
      </motion.div>

      <div className={styles.body}>
        <p className={styles.para}>
          I'm a <span>UX/UI Designer</span> that knits solutions and intuitive experiences together.
        </p>
      </div>
    </main>
  );
}
