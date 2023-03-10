import { Paper } from "@mui/material";
import useAxios from "axios-hooks";
import React, { useCallback } from "react";
import EmployeeDataForm from "../components/EmployeeDataForm";

const EditEmployee = () => {
  const onSubmit = (data: IEmployeeFields) => {
    console.log({ data });
  };

  const [{ data, error, loading }] = useAxios("/employee");
  console.log({ data });
  if (loading) {
    return <h1>Loading data...</h1>;
  }
  return (
    <Paper sx={{ width: "50%", margin: "auto", marginTop: "1rem" }}>
      <EmployeeDataForm
        onSubmit={onSubmit}
        isEditForm={true}
        employeeData={data}
      />
    </Paper>
  );
};

export default React.memo(EditEmployee);
