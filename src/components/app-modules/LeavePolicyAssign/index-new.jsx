"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useDisclosure } from "@mantine/hooks";
import { Grid, Table } from "@mantine/core";
import {
   Button,
   Select,
   Breadcrumbs,
   Anchor,
   Box,
   TextInput,
   MultiSelect,
} from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

const items = [
   { title: "Dashboard", href: "/" },
   { title: "Leave Policy" },
].map((item, index) => (
   <Anchor href={item.href} key={index}>
      {item.title}
   </Anchor>
));

const EmployeeSelect = () => {
   // Select on change a add new div
   const [selectedEmployee, setSelectedEmployee] = useState(null);
   const handleChange = (value) => {
      setSelectedEmployee(value);
   };
   const handleRemove = () => {
      setSelectedEmployee(null);
   };
   // Select on change a add new div

   const elements = [
      { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
      { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
      { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
      { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
      { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
   ];
   const rows = elements.map((element) => (
      <Table.Tr key={element.name}>
         <Table.Td>{element.position}</Table.Td>
         <Table.Td>{element.name}</Table.Td>
         <Table.Td>{element.symbol}</Table.Td>
         <Table.Td>{element.mass}</Table.Td>
      </Table.Tr>
   ));

   return (
      <>
         <div className="pageTop mb-4">
            <h3>Leave Policy Assign</h3>
            <Breadcrumbs>{items}</Breadcrumbs>
         </div>
         <div id="leavePolicy" className="itemCard">
            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
               <Grid.Col span={4}>
                  <Select
                     classNames={{
                        root: "cust_iputRoot",
                        label: "cust_iputLabel",
                        wrapper: "cust_iputWrapper",
                     }}
                     label="Employee name"
                     placeholder="Select Employee"
                     data={[
                        "Jiaur Rahman - 20220102016",
                        "G. M. Nazmul Hussain - 20220102017",
                        "Rasel Rahman - 20220102018",
                     ]}
                     searchable
                     onChange={handleChange}
                  />

                  <MultiSelect
                     classNames={{
                        root: "cust_iputRoot",
                        label: "cust_iputLabel",
                        wrapper: "cust_iputWrapper",
                     }}
                     mt="md"
                     label="Leave Policy Assign"
                     placeholder="Leave Policy Assign"
                     data={[
                        "Policy-1",
                        "Policy-2",
                        "Policy-3",
                        "Policy-4",
                        "Policy-5",
                        "Policy-6",
                     ]}
                     searchable
                     // withAsterisk
                  />

                  <div className="assaignBtn d-flex justify-content-end">
                     <Button variant="filled" size="sm" mt="xl">
                        Assaign
                     </Button>
                  </div>
               </Grid.Col>
               <Grid.Col span={5}>
                  {/* Render a div for the selected employee */}
                  <div className="addDataBox position-relative">
                     <AnimatePresence>
                        {selectedEmployee && (
                           <motion.div
                              key={selectedEmployee}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="employee_data"
                           >
                              <div className="text-center pb-1 fw-bold">
                                 {selectedEmployee}
                              </div>
                              <Table withTableBorder withColumnBorders>
                                 <Table.Thead>
                                    <Table.Tr>
                                       <Table.Th>Element position</Table.Th>
                                       <Table.Th>Element name</Table.Th>
                                       <Table.Th>Symbol</Table.Th>
                                       <Table.Th>Atomic mass</Table.Th>
                                    </Table.Tr>
                                 </Table.Thead>
                                 <Table.Tbody>{rows}</Table.Tbody>
                              </Table>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </Grid.Col>
            </Grid>
         </div>
      </>
   );
};

export default EmployeeSelect;
