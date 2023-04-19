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
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { InputField } from "../Components";
import { API_URL, signupFields, signupState } from "../Constants";
import { useEmailValidator, useForm, usePasswordValidator } from "../Hooks";

const Signup = () => {
  const { formState, resetForm, setField } = useForm({
    ...signupState,
    error: "",
  });

  const { passwordErrors, isPasswordValid } = usePasswordValidator(
    formState.password
  );

  const { isEmailValid } = useEmailValidator(formState.email_id);

  const navigate = useNavigate();
  const toast = useToast();

  const createUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        name: formState.name,
        register_id: formState.register_id,
        email_id: formState.email_id,
        password: formState.password,
      });
      console.log(response.data);

      setTimeout(() => {
        navigate("/login");
        toast({
          title: "SUCCESS",
          description: "SIGNUP SUCCESSFULL",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }, 2000);
    } catch (error) {
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
    console.log("isPasswordValid:", isPasswordValid);
    if (isPasswordValid && isEmailValid) {
      createUser();
      resetForm();
    } else {
      console.log(isEmailValid);
      console.log("hasSymbol:", passwordErrors.hasSymbol);
      console.log("hasLowerCase:", passwordErrors.hasLowerCase);
      console.log("hasNumber:", passwordErrors.hasNumber);
      console.log("hasUpperCase:", passwordErrors.hasUpperCase);
      console.log("minLength:", passwordErrors.minLength);
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
            SIGNUP
          </Heading>
          {signupFields.map((field) => (
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
              helperText={field.helperText}
            />
          ))}
          <Stack spacing={6}>
            <Button bg={"blue.400"} color={"white"} onClick={handleSubmit}>
              SUBMIT
            </Button>
          </Stack>
          <Box as="center">
            Already have an account? Click here to{" "}
            <Link color="blue.500" as={ReachLink} to="/login">
              log in
            </Link>
            .
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Signup;
