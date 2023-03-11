import {
  Dialog,
  DialogContent,
  Stack,
  Typography,
  Paper,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

interface IDialogContainer {
  openDetails: boolean;
  rowData: IEmployeeFields;
  handleClose: any;
  title: string;
}
const DialogContainer = ({
  openDetails,
  rowData,
  handleClose,
  title,
}: IDialogContainer) => {
  return (
    <Dialog open={openDetails}>
      <DialogContent>
        <Stack sx={{ py: 5 }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {title}
          </Typography>
          <Paper
            sx={{
              my: 2,
              mx: 5,
              px: 5,
              py: 3,
              alignSelf: "center",
            }}
            elevation={8}
          >
            <Grid container rowGap={2}>
              <Grid container sx={{ justifyContent: "space-between" }}>
                <Grid item>First Name</Grid>
                <Grid item>{rowData?.firstName}</Grid>
              </Grid>
              <Grid container sx={{ justifyContent: "space-between" }}>
                <Grid item>Last Name</Grid>
                <Grid item> {rowData?.lastName}</Grid>
              </Grid>
              <Grid container sx={{ justifyContent: "space-between" }}>
                <Grid item>Email</Grid>
                <Grid item> {rowData?.email}</Grid>
              </Grid>
              <Grid container sx={{ justifyContent: "space-between" }}>
                <Grid item>Phone Number</Grid>
                <Grid item> {rowData?.phoneNumber}</Grid>
              </Grid>
              {(rowData?.addresses || [])?.map((address, index) => (
                <Grid
                  container
                  sx={{ justifyContent: "space-between" }}
                  key={index}
                >
                  <Grid item>Address: {index + 1}</Grid>
                  <Grid item>
                    {address?.apartmentNumber}, {address?.streetName},{" "}
                    {address?.state},{address?.postalCode}, {address?.country}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DialogContainer);
