'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
  hidden: { opacity: 0, x: -20, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 20, y: 0 },
};

export default function PageTransition({ children }) {
  const pathname = usePathname();
  
  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: 'linear', duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}