import { Snackbar, Alert } from "@mui/material";
import React from "react";
interface ISnackbarContainer {
  open: boolean;
  handleClose: any;
  message: string;
}
const SnackbarContainer = ({
  open,
  handleClose,
  message,
}: ISnackbarContainer) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default React.memo(SnackbarContainer);
