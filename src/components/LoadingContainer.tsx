import { Fade, Box, Stack, CircularProgress } from "@mui/material";
import React from "react";

interface ILoadingContainer {
  loading: boolean;
}

const LoadingContainer = ({ loading }: ILoadingContainer) => {
  return (
    <Fade
      in={loading}
      style={{
        transitionDelay: loading ? "100ms" : "0ms",
      }}
      unmountOnExit
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#63626287",
        }}
      >
        <Stack
          sx={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Stack>
      </Box>
    </Fade>
  );
};

export default React.memo(LoadingContainer);
