import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Heading, Button, Radio, RadioGroup, Card, CardHeader, CardBody, Spinner, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { getData, correct } from '../Redux/Action';
import { useTimer } from 'react-timer-hook';
import Webcam from 'react-webcam';

export const Quiz = () => {
  const { loading, data, error } = useSelector((store) => store.quiz);
  const [answer, setAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const dispatch = useDispatch();

  const quizDuration = 10 * 60;
  const timerExpiry = new Date();
  timerExpiry.setSeconds(timerExpiry.getSeconds() + quizDuration);

  const { seconds, minutes, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: timerExpiry,
    onExpire: () => handleFinish(),
  });

  useEffect(() => {
    dispatch(getData());
    start();
  }, [dispatch]);

  const handleChange = (value) => {
    setAnswer(parseInt(value, 10)); 
  };

  const handleSubmit = () => {
    if (answer !== null) {
      const correctAnswer = data[currentQuestion].correctOptionIndex;
      if (answer === correctAnswer) {
        dispatch(correct());
      }

      setAnswers([...answers, answer]);
      setAnswer(null); 
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSkip = () => {
    setAnswers([...answers, null]);
    setAnswer(null); 
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleFinish = async () => {
    pause(); 
    try {
      const res = await fetch('http://localhost:5000/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      const result = await res.json();
      alert(`Quiz completed. Your score: ${result.score}/${result.total}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <Box height="100vh" bg="#07161B" color="white" display="flex" justifyContent="center" alignItems="center" position="relative">
      <Box position="absolute" top="70px" right="20px">
        <Webcam style={{ borderRadius: '50%', width: '100px', height: '100px', border: '2px solid white' }} />
      </Box>
      <Box width="100%" maxW="600px">
        <Box mb="4" textAlign="center">
          <Heading size="md">Time Remaining: {minutes}:{seconds}</Heading>
        </Box>
        {loading && (
          <Box display="flex" justifyContent="center">
            <Spinner size="xl" />
          </Box>
        )}
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>An error has occurred. Please try again later.</AlertTitle>
          </Alert>
        )}
        {data && data.length > 0 && currentQuestion < data.length ? (
          <Stack spacing="4">
            <Card bg="#CEC7BF" color="black">
              <CardHeader>
                <Heading size="md">{data[currentQuestion].question}</Heading>
              </CardHeader>
              <CardBody>
                <RadioGroup value={answer !== null ? answer : ''} onChange={handleChange}>
                  <Stack direction="column">
                    {data[currentQuestion].options.map((option, index) => (
                      <Radio key={index} value={index}>
                        {option}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </CardBody>
              <Box p={4} display="flex" justifyContent="space-between">
                <Button onClick={handleSubmit} colorScheme="green" mr="2">
                  Submit
                </Button>
                <Button onClick={handleSkip} colorScheme="red">
                  Skip
                </Button>
              </Box>
            </Card>
          </Stack>
        ) : currentQuestion >= data.length ? (
          <Button onClick={handleFinish} colorScheme="blue">
            Finish Quiz
          </Button>
        ) : (
          <Alert status="info">
            <AlertIcon />
            No questions available
          </Alert>
        )}
      </Box>
    </Box>
  );
};
