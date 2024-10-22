import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Text = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const AnimatedText = ({ text }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Text
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {text}
    </Text>
  );
};

export default AnimatedText;
