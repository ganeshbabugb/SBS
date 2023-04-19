import React from "react";
import { adminLoginFields, adminLoginState } from "../Constants";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "../Hooks";
import { InputField } from "../Components";

const Admin = () => {
  const { formState, resetForm, setField } = useForm(adminLoginState);
  const navigate = useNavigate();
  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
    if (formState.user === "ADMIN" && formState.password === "ADMIN") {
      setTimeout(() => {
        navigate("/dashboard");
        toast({
          title: "SUCCESS",
          description: "LOGIN SUCCESSFULLY",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }, 2000);
    } else {
      resetForm();
      toast({
        title: "ERROR",
        description: "INVALID LOGIN CREDENTIAL",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
            ADMIN
          </Heading>
          {adminLoginFields.map((field) => (
            <InputField
              key={field.id}
              onChange={(e) => {
                const value =
                  field.name === "user"
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
        </Stack>
      </Flex>
    </>
  );
};

export default Admin;
