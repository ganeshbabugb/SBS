import React from "react";
import {
  useGlobalFilter,
  usePagination,
  useTable,
  useSortBy,
} from "react-table";
import GlobalFilter from "./Filter/GlobalFilter";
import Pagination from "./Pagination/Pagination";
import TableSection from "./TableSection/TableSection";
import { Box, Flex, Heading, Stack, Center } from "@chakra-ui/react";

const TableGroup = ({ columns, data, TableFor }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <Stack spacing={5}>
        <Flex justifyContent="space-between" alignItems="center" mx="10">
          <Flex>
            <Heading as="h4" size="md" noOfLines={1}>
              {TableFor} Table
            </Heading>
          </Flex>
          <Flex>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Flex>
        </Flex>
        <Center>
          <Box width="95%">
            <TableSection
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              prepareRow={prepareRow}
              page={page}
            />
          </Box>
        </Center>
        <Pagination
          preGlobalFilteredRows={preGlobalFilteredRows}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageCount={pageCount}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          setPageSize={setPageSize}
          state={state}
        />
      </Stack>
    </>
  );
};

export default TableGroup;
