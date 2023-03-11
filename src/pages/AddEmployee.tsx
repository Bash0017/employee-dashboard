import { Paper } from "@mui/material";
import React from "react";
import EmployeeDataForm from "../components/EmployeeDataForm";

const AddEmployee = () => {
  return (
    <Paper sx={{ width: "50%", margin: "auto", marginTop: "1rem" }}>
      <EmployeeDataForm isEditForm={false} />
    </Paper>
  );
};

export default React.memo(AddEmployee);
