'use client'
import styles from './page.module.scss'
import { useState } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from './utils/useMousePosition';
import Header from '@/components/Header';

export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

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
        <p onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }} className={styles.p}>
          I&apos;m a UX/UI DESIGNER that knits solutions and intuitive experiences together.
        </p>
      </motion.div>

      <div className={styles.body}>
        <p className={styles.p}>I&apos;m a <span className={styles.span}> UX/UI DESIGNER </span> that knits solutions and intuitive experiences together.</p>
      </div>

    </main >
  )
}
