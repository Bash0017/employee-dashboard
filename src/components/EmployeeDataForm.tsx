import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useAxios from "axios-hooks";
import LoadingContainer from "./LoadingContainer";

interface IEmployeeFormProps {
  isEditForm?: boolean;
}

const EmployeeDataForm = ({ isEditForm = false }: IEmployeeFormProps) => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm();
  const params = useParams();

  const [inputFields, setInputFields] = useState([{}]);

  const [, addEmployee] = useAxios(
    { url: "/employee", method: "POST" },
    {
      manual: true,
    },
  );

  const [, updateEmployee] = useAxios(
    { url: `/employee/${params?.employeeId}`, method: "PUT" },
    {
      manual: true,
    },
  );

  const [{ data: employeesData, loading }, fetchEmployeeDetails] = useAxios(
    { url: `/employee/${params?.employeeId}` },
    {
      manual: true,
    },
  );

  const fetchData = async () => {
    await fetchEmployeeDetails();
  };

  useEffect(() => {
    if (isEditForm) {
      fetchData();
    }
  }, [isEditForm]);

  const onSubmit = (data: any) => {
    const requestData: IEmployeeFields = {
      ...data,
      addresses: data.addresses.map((address: IEmployeeAddresses) => ({
        ...address,
        apartmentNumber: parseInt(address.apartmentNumber.toString()),
      })),
    };
    isEditForm
      ? updateEmployee({ data: requestData })
      : addEmployee({ data: requestData });
    reset();
  };

  const handleAddFields = useCallback(() => {
    setInputFields([
      ...inputFields,
      {
        streetName: "",
        postalCode: "",
        apartmentNumber: "",
        state: "",
        country: "",
      },
    ]);
  }, [inputFields, setInputFields]);

  const handleRemoveFields = useCallback(
    (index: number) => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    },
    [inputFields, setInputFields],
  );

  const resetForm = useCallback(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    reset({
      firstName: employeesData?.firstName,
      lastName: employeesData?.lastName,
      email: employeesData?.email,
      phoneNumber: employeesData?.phoneNumber,
      addresses: employeesData?.addresses,
    });
  }, [employeesData]);
  return (
    <>
      <Paper elevation={3}>
        <Stack direction={"column"} style={{ padding: 20 }} spacing={3}>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              component={Link}
              to={"/"}
            />
            <Typography variant="h6">
              {isEditForm ? "Edit" : "Add"} Employee Form
            </Typography>
          </Grid>
          <TextField
            id="outlined-basic"
            placeholder="Enter First Name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName?.type === "required" && (
            <Typography color="red">First name is required</Typography>
          )}

          <TextField
            id="outlined-basic"
            placeholder="Enter Last Name"
            {...register("lastName", { required: true })}
          />
          {errors.lastName?.type === "required" && (
            <Typography color="red">Last name is required</Typography>
          )}
          <TextField
            id="outlined-basic"
            placeholder="Enter Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <Typography color="red">Email is required</Typography>
          )}
          <TextField
            id="outlined-basic"
            placeholder="Enter Phone Number"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber?.type === "required" && (
            <Typography color="red">Phone Number is required</Typography>
          )}

          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Addresses</Typography>
          </Toolbar>
          {inputFields.map((inputField, index) => (
            <Container key={index}>
              <Grid container>
                <TextField
                  id="outlined-basic"
                  placeholder="Enter Street Name"
                  {...register(`addresses.${index}.streetName`)}
                />
                <TextField
                  id="outlined-basic"
                  placeholder="Enter Postal Code"
                  {...register(`addresses.${index}.postalCode`)}
                />
                <TextField
                  id="outlined-basic"
                  placeholder="Enter Apartment Number"
                  type="number"
                  {...register(`addresses.${index}.apartmentNumber`)}
                />
                <TextField
                  id="outlined-basic"
                  placeholder="Enter State"
                  {...register(`addresses.${index}.state`)}
                />
                <TextField
                  id="outlined-basic"
                  placeholder="Enter Country"
                  {...register(`addresses.${index}.country`)}
                />

                <IconButton onClick={() => handleRemoveFields(index)}>
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={handleAddFields}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Container>
          ))}

          <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            Submit
          </Button>
          <Button onClick={resetForm} variant={"outlined"}>
            Reset
          </Button>
        </Stack>
      </Paper>
      <LoadingContainer loading={loading} />
    </>
  );
};

export default React.memo(EmployeeDataForm);
