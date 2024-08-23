import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading } from '@chakra-ui/react';
import Webcam from 'react-webcam';

export const Scores = () => {
  const { correctAnswer } = useSelector((store) => store.quiz);

  return (
    <Box height="100vh" bg="#07161B" color="white" display="flex" justifyContent="center" alignItems="center" position="relative">
      <Box position="absolute" top="70px" right="20px">
        <Webcam style={{ borderRadius: '50%', width: '100px', height: '100px', border: '2px solid white' }} />
      </Box>
      <Box width="100%" maxW="600px" textAlign="center">
        <Heading size="lg">Your Score</Heading>
        <Heading size="2xl" mt={4}>{correctAnswer}</Heading>
      </Box>
    </Box>
  );
};
