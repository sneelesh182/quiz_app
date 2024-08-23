import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-around"
      padding="1.5rem"
      bg="#3D737F"
      color="white"
    >
      <Button
        as={Link}
        to='/'
        bg="transparent"
        color="white"
        _hover={{ bg: "#07161B", color: "#CEC7BF" }}
        _active={{ bg: "#07161B", color: "#CEC7BF" }}
      >
        Quiz
      </Button>
      <Button
        as={Link}
        to='/scores'
        bg="transparent"
        color="white"
        _hover={{ bg: "#07161B", color: "#CEC7BF" }}
        _active={{ bg: "#07161B", color: "#CEC7BF" }}
      >
        Scores
      </Button>
    </Flex>
  );
};
