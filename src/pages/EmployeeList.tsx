import {
  Alert,
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import useAxios from "axios-hooks";
import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import LoadingContainer from "../components/LoadingContainer";
import SnackbarContainer from "../components/SnackbarContainer";
import DialogContainer from "../components/DialogContainer";

const EmployeeList = () => {
  const [open, setOpen] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [singleRowData, setSingleRowData] = React.useState<IEmployeeFields>();

  const handleOpenDialog = (rowData: IEmployeeFields) => {
    setSingleRowData(rowData);
    setOpenDetails(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenDetails(false);
  };
  const [{ data, error, loading }, reFetch] = useAxios("/employee");

  const [_, deleteEmployee] = useAxios({ method: "DELETE" }, { manual: true });

  const handleDelete = useCallback(
    async (employeeId: number) => {
      await deleteEmployee({ url: `/employee/${employeeId}` });
      setOpen(true);
      reFetch();
    },
    [reFetch],
  );

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
        type: "actions",
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Edit Employee">
                <Edit />
              </Tooltip>
            }
            label="Edit Employee Details"
            onClick={() => handleDelete(params.id)}
            // @ts-ignore
            component={Link}
            to={`/${params?.row.id}`}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete Employee">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete Employee"
            onClick={() => handleDelete(params.id)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="View Employee Details">
                <RemoveRedEye />
              </Tooltip>
            }
            label="View Employee"
            onClick={() => handleOpenDialog(params.row)}
          />,
        ],
      },
    ],
    [data],
  );

  if (error) {
    return <Alert severity="error">{`Error occurred: ${error}`}</Alert>;
  } else if (loading) {
    return <LoadingContainer loading={loading} />;
  }
  return (
    <>
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
              slots={{ loadingOverlay: LinearProgress }}
              loading={loading}
              initialState={{
                ...data?.initialState,
                pagination: {
                  ...data?.initialState?.pagination,
                  paginationModel: {
                    pageSize: 5,
                    /* page: 0 // default value will be used if not passed */
                  },
                },
              }}
              columns={columns}
              rows={data}
              autoHeight
              rowSelection={false}
            />
          </Box>
        </Stack>
      </Paper>
      <SnackbarContainer
        open={open}
        handleClose={handleClose}
        message="Employee deleted successfully!"
      />
      <DialogContainer
        openDetails={openDetails}
        handleClose={handleClose}
        rowData={singleRowData!}
        title="Employee Details"
      />
    </>
  );
};

export default React.memo(EmployeeList);
