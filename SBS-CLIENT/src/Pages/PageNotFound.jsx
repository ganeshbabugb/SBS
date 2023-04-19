import { Flex, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import React from "react";

const PageNotFound = () => {
  const location = useLocation();
  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Text fontSize="3xl">PAGE {location.pathname} NOT FOUND</Text>
      </Flex>
    </>
  );
};

export default PageNotFound;
