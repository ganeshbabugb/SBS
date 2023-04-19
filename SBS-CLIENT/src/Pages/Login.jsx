import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { InputField } from "../Components";
import { API_URL, loginFields, loginState } from "../Constants";
import { useForm, usePasswordValidator } from "../Hooks";

const Login = () => {
  const { formState, resetForm, setField } = useForm(loginState);

  const { passwordErrors, isPasswordValid } = usePasswordValidator(
    formState.password
  );

  const navigate = useNavigate();
  const toast = useToast();

  const authenticateUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        name: formState.name,
        register_id: formState.register_id,
        email_id: formState.email_id,
        password: formState.password,
      });
      // geting data from database
      const { name, register_id, email_id } = response.data;
      // redirecton to register-page
      setTimeout(() => {
        navigate(`/register/${name}/${register_id}/${email_id}`);
        toast({
          title: "SUCCESS",
          description: "LOGIN SUCCESSFULLY",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }, 2000);
    } catch (error) {
      console.log(error);
      toast({
        title: "ERROR",
        description: error.response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
    if (isPasswordValid) {
      authenticateUser();
      resetForm();
    } else {
      console.log("isPasswordValid:", isPasswordValid);
      console.log("passwordErrors:", passwordErrors);
    }
  }

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Stack
          m={"5"}
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading
            w="100%"
            textAlign={"center"}
            fontWeight="normal"
            size={"lg"}
            mb="2%"
          >
            LOGIN
          </Heading>
          {loginFields.map((field) => (
            <InputField
              key={field.id}
              onChange={(e) => {
                const value =
                  field.name === "register_id"
                    ? e.target.value.toUpperCase()
                    : e.target.value;
                setField(e.target.name, value);
              }}
              value={formState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <Stack spacing={6}>
            <Button bg={"blue.400"} color={"white"} onClick={handleSubmit}>
              SUBMIT
            </Button>
          </Stack>
          <Box as="center">
            Don't have an account yet? Click here to{" "}
            <Link color="blue.500" as={ReachLink} to="/">
              sign up
            </Link>
            .
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
