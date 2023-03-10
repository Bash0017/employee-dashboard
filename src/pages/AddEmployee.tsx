import { Paper } from "@mui/material";
import React, { useCallback } from "react";
import EmployeeDataForm from "../components/EmployeeDataForm";

const AddEmployee = () => {
  const onSubmit = useCallback(() => {}, []);
  return (
    <Paper sx={{ width: "50%", margin: "auto", marginTop: "1rem" }}>
      <EmployeeDataForm onSubmit={onSubmit} isEditForm={false} />
    </Paper>
  );
};

export default React.memo(AddEmployee);
