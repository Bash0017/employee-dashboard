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
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useAxios from "axios-hooks";

interface IEmployeeFormProps {
  employeeData?: IEmployeeFields;
  onSubmit: (data: IEmployeeFields) => void;
  isEditForm?: boolean;
}

const EmployeeDataForm = ({
  employeeData,
  // onSubmit,
  isEditForm = false,
}: IEmployeeFormProps) => {
  console.log({ employeeData });
  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    register,
  } = useForm();
  const [inputFields, setInputFields] = useState([{}]);

  const [{ data: res, error, loading }, addEmployee] = useAxios(
    { url: "/employee", method: "POST" },
    {
      manual: true,
    },
  );

  const onSubmit = (data: any) => {
    // const requestData: IEmployeeFields = {
    //   ...data,
    //   addresses: data.addresses.map((address: IEmployeeAddresses) => ({
    //     ...address,
    //     apartmentNumber: parseInt(address.apartmentNumber.toString()),
    //   })),
    // };
    console.log({ data });
    addEmployee({ data });
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

  return (
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
          label="Enter First Name"
          {...register("firstName", { required: true })}
        />
        {errors.firstName?.type === "required" && (
          <Typography color="red">First name is required</Typography>
        )}

        <TextField
          id="outlined-basic"
          label="Enter Last Name"
          {...register("lastName", { required: true })}
        />
        {errors.lastName?.type === "required" && (
          <Typography color="red">Last name is required</Typography>
        )}
        <TextField
          id="outlined-basic"
          label="Enter Email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <Typography color="red">Email is required</Typography>
        )}
        <TextField
          id="outlined-basic"
          label="Enter Phone Number"
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
                label="Enter Street Name"
                {...register(`streetName${index + 1}`)}
              />
              <TextField
                id="outlined-basic"
                label="Enter Postal Code"
                {...register(`postalCode${index + 1}`)}
              />
              <TextField
                id="outlined-basic"
                label="Enter Apartment Number"
                {...register(`apartmentNumber${index + 1}`)}
              />
              <TextField
                id="outlined-basic"
                label="Enter State"
                {...register(`state${index + 1}`)}
              />
              <TextField
                id="outlined-basic"
                label="Enter Country"
                {...register(`country${index + 1}`)}
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
  );
};

export default React.memo(EmployeeDataForm);
