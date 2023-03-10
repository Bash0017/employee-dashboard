import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAxios from "axios-hooks";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [{ data, error, loading }] = useAxios("/employee");

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 100 },
      { field: "firstName", headerName: "First Name", width: 150 },
      { field: "lastName", headerName: "Last Name", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "phoneNumber", headerName: "Phone Number", width: 150 },
      {
        field: "actions",
        headerName: "Actions",
        width: 250,
        renderCell: (params: any) => {
          return (
            <Grid container sx={{ justifyContent: "space-around" }}>
              <Button
                variant="contained"
                component={Link}
                to={`/${params?.row.id}`}
              >
                Edit
              </Button>
              <Button color="error" variant="contained" onClick={() => {}}>
                Delete
              </Button>
            </Grid>
          );
        },
      },
    ],
    [data],
  );

  if (error) {
    return <h1>Error while loading data</h1>;
  } else if (loading) {
    return <h1>Loading data...</h1>;
  }
  return (
    <Paper sx={{ width: "80%", margin: "auto", marginTop: "1rem" }}>
      <Stack direction={"column"} style={{ padding: 20 }} spacing={3}>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Employee List</Typography>
          <Button
            variant="contained"
            component={Link}
            to={"/add"}
            sx={{ alignSelf: "flex-end" }}
          >
            Add Employee
          </Button>
        </Grid>

        <Box>
          <DataGrid
            columns={columns}
            rows={data}
            autoHeight
            rowSelection={false}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default React.memo(EmployeeList);
