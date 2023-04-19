import { Button, Flex, Heading, Spacer, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { TableGroup } from "../Components";
import { API_URL } from "../Constants";

const Dashboard = () => {
  const [registeredStudentsData, setRegisteredStudentsData] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [aidedData, setAidedData] = useState([]);
  const [unaidedData, setUnaidedData] = useState([]);
  const [showTable, setShowTable] = useState("StudentDetailsList");
  useEffect(() => {
    axios
      .get(`${API_URL}/details`)
      .then((res) => setRegisteredStudentsData(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${API_URL}/aided-courses`)
      .then((res) => setAidedData(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${API_URL}/unaided-courses`)
      .then((res) => setUnaidedData(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${API_URL}/student-details`)
      .then((res) => setStudentDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  const StudentsListHeading = () => [
    {
      Header: "S.NO",
      accessor: "id",
    },
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "REGISTER ID",
      accessor: "register_id",
    },
    {
      Header: "EMAIL ADDRESS",
      accessor: "email_id",
    },
    {
      Header: "PASSWORD",
      accessor: "password",
    },
  ];

  const studentsListColumns = useMemo(() => StudentsListHeading(), []);
  const studentList = useMemo(
    () => registeredStudentsData,
    [registeredStudentsData]
  );

  const aidedCourseListHeading = () => [
    {
      Header: "S.NO",
      accessor: "id",
    },
    {
      Header: "AIDED COURSE",
      accessor: "value",
    },
    {
      Header: "NO OF STUDENTS REGISTERED",
      accessor: "register_count",
    },
    {
      Header: "AVAILABLE SEATS",
      accessor: "available_seats",
    },
  ];

  const aidedCourseListColumn = useMemo(() => aidedCourseListHeading(), []);
  const aidedCourseList = useMemo(() => aidedData, [aidedData]);

  const unaidedCourseListHeading = () => [
    {
      Header: "S.NO",
      accessor: "id",
    },
    {
      Header: "UNAIDED COURSE",
      accessor: "value",
    },
    {
      Header: "NO OF STUDENTS REGISTERD",
      accessor: "register_count",
    },
    {
      Header: "AVAILABLE SEATS",
      accessor: "available_seats",
    },
  ];

  const unaidedCourseListColumn = useMemo(() => unaidedCourseListHeading(), []);
  const unaidedCourseList = useMemo(() => unaidedData, [unaidedData]);

  const studentDetailsListHeading = () => [
    {
      Header: "S.NO",
      accessor: "id",
    },
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "REGISTER ID",
      accessor: "register_id",
    },
    {
      Header: "EMAIL ID",
      accessor: "email_id",
    },
    {
      Header: "COURSE",
      accessor: "course",
    },
    {
      Header: "SELECTED COURSE",
      accessor: "course_selected",
    },
    {
      Header: "DEPARTMENT",
      accessor: "department",
    },
    {
      Header: "PHONE NO",
      accessor: "phone_no",
    },
  ];

  const studentDetailsListColumn = useMemo(
    () => studentDetailsListHeading(),
    []
  );
  const studentDetailsList = useMemo(() => studentDetails, [studentDetails]);

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.200"}>
        <Stack
          m={"8"}
          w={"full"}
          spacing={5}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"base"}
          p={6}
          minH={"85vh"}
        >
          <Heading
            w="100%"
            textAlign={"center"}
            fontWeight="normal"
            size={"lg"}
            mb="2%"
          >
            ADMIN-DASHBOARD
          </Heading>
          <Flex>
            <Spacer />
            <Button
              bg={"blue.400"}
              color={"white"}
              onClick={() => setShowTable("StudentDetailsList")}
            >
              Student Details List Table
            </Button>
            <Spacer />
            <Button
              bg={"blue.400"}
              color={"white"}
              onClick={() => setShowTable("AidedCourseList")}
            >
              Aided Course List Table
            </Button>
            <Spacer />
            <Button
              bg={"blue.400"}
              color={"white"}
              onClick={() => setShowTable("UnaidedCourseList")}
            >
              Unaided Course List Table
            </Button>
            <Spacer />
            <Button
              bg={"blue.400"}
              color={"white"}
              onClick={() => setShowTable("StudentList")}
            >
              Student List Table
            </Button>
            <Spacer />
          </Flex>
          {showTable === "StudentList" && (
            <TableGroup
              TableFor={"Students List"}
              columns={studentsListColumns}
              data={studentList}
            />
          )}
          {showTable === "AidedCourseList" && (
            <TableGroup
              TableFor={"Aided Course List"}
              columns={aidedCourseListColumn}
              data={aidedCourseList}
            />
          )}
          {showTable === "UnaidedCourseList" && (
            <TableGroup
              TableFor={"Unaided Course List"}
              columns={unaidedCourseListColumn}
              data={unaidedCourseList}
            />
          )}
          {showTable === "StudentDetailsList" && (
            <TableGroup
              TableFor={"Student Details List"}
              columns={studentDetailsListColumn}
              data={studentDetailsList}
            />
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default Dashboard;
