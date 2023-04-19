import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, aidedDept, unaidedDept } from "../Constants";

const initialState = {
  aidedData: [],
  unaidedData: [],
  department: "",
  course: "",
  course_selected: "",
  phone_no: "+91-",
  isValidPhoneNumber: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSE":
      return {
        ...state,
        course: action.payload,
      };
    case "SET_PHONE_NO":
      return {
        ...state,
        phone_no: action.payload.phoneNumber,
        isValidPhoneNumber: action.payload.isValidPhoneNumber,
      };
    case "SET_AIDED_DATA":
      return {
        ...state,
        aidedData: action.payload,
      };
    case "SET_UNAIDED_DATA":
      return {
        ...state,
        unaidedData: action.payload,
      };
    case "SET_COURSE_SELECTED":
      return {
        ...state,
        course_selected: action.payload,
      };
    case "SET_DEPARTMENT":
      return {
        ...state,
        department: action.payload,
      };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    course,
    phone_no,
    aidedData,
    unaidedData,
    course_selected,
    department,
    isValidPhoneNumber,
  } = state;

  const { name, register_id, email_id } = useParams();

  useEffect(() => {
    // Fetch aided data
    axios
      .get(`${API_URL}/api/aided-courses`)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "SET_AIDED_DATA", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching aided data:", error);
      });

    // Fetch unaided data
    axios
      .get(`${API_URL}/api/unaided-courses`)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "SET_UNAIDED_DATA", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching unaided data:", error);
      });
  }, []);

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    const phoneRegex = /^(\+91|\+91-|0)?[789]\d{9}$/;
    const isValidPhoneNumber = phoneRegex.test(value);

    dispatch({
      type: "SET_PHONE_NO",
      payload: {
        phoneNumber: value,
        isValidPhoneNumber: isValidPhoneNumber,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValidPhoneNumber) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/register-course",
          {
            register_id,
            name,
            email_id,
            course,
            course_selected,
            department,
            phone_no,
          }
        );
        console.log(response.data);
        // Show success message to the user
        toast({
          title: "SUCCESS",
          description: "REGISTERED SUCCESSFULLY",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } catch (error) {
        console.error(error);
        // Show error message to the user
        dispatch({ type: "RESET", initialState });
        toast({
          title: "ERROR",
          description: error.response.data,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Box
        borderWidth={"1px"}
        boxShadow={"lg"}
        rounded={"xl"}
        maxWidth={850}
        p={5}
        mx={"auto"}
        my={"12"}
        as="form"
      >
        <SimpleGrid columns={1} spacing={5}>
          <Heading
            w="100%"
            textAlign={"center"}
            fontWeight="normal"
            noOfLines={1}
            size={"lg"}
            mb="2%"
          >
            ONLINE SBS REGISTERATION FORM
          </Heading>
          <Text>
            NAME :{" "}
            <Text fontWeight="bold" as="span">
              {name}
            </Text>
          </Text>

          <Text>
            REGISTER ID :{" "}
            <Text fontWeight="bold" as="span">
              {register_id}
            </Text>
          </Text>

          <Text>
            EMAIL ADDRESS :{" "}
            <Text fontWeight="bold" as="span">
              {email_id}
            </Text>
          </Text>
          <FormControl isRequired>
            <FormLabel fontWeight={"normal"}>COURSE :</FormLabel>
            <Select
              placeholder="SELECT OPTION"
              shadow="sm"
              size="md"
              w="full"
              rounded="md"
              value={course}
              onChange={(e) =>
                dispatch({ type: "SET_COURSE", payload: e.target.value })
              }
            >
              <option value="aided">aided</option>
              <option value="unaided">unaided</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight={"normal"}>
              SELECT YOUR DEPARTMENT :
            </FormLabel>
            <Select
              placeholder="SELECT OPTION"
              shadow="sm"
              size="md"
              w="full"
              rounded="md"
              value={department}
              onChange={(e) =>
                dispatch({ type: "SET_DEPARTMENT", payload: e.target.value })
              }
            >
              {state.course === "aided" &&
                aidedDept.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              {state.course === "unaided" &&
                unaidedDept.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight={"normal"}>COURSE OFFERED :</FormLabel>
            <Select
              placeholder="SELECT OPTION"
              shadow="sm"
              size="md"
              w="full"
              rounded="md"
              value={course_selected}
              onChange={(e) =>
                dispatch({
                  type: "SET_COURSE_SELECTED",
                  payload: e.target.value,
                })
              }
            >
              {state.course === "aided" &&
                aidedData.map((course) => (
                  <option key={course.value} value={course.value}>
                    {course.label}
                  </option>
                ))}
              {state.course === "unaided" &&
                unaidedData.map((course) => (
                  <option key={course.value} value={course.value}>
                    {course.label}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="phone_no">ENTER PHONE NUMBER :</FormLabel>
            <Input
              type="tel"
              name="phone_no"
              value={phone_no}
              _placeholder={{ color: "gray.500" }}
              placeholder="Phone Number"
              onChange={handlePhoneNumberChange}
            />
            <FormHelperText>
              Please enter your phone number in the following format:
              +91-XXXXXXXXXX.
            </FormHelperText>
          </FormControl>

          <Center>
            <Button
              bg={"blue.400"}
              color={"white"}
              onClick={(e) => handleSubmit(e)}
            >
              SUBMIT
            </Button>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Register;
