import { FC } from "react";
import { Button } from "@mui/material";
import { ErrorFallbackProps } from "../types/ErrorTypes";

export const ErrorFallback: FC<ErrorFallbackProps> = ({
  resetErrorBoundary,
}) => {
  return (
    <div>
      <h2 className="error-title">Oops, something went wrong!</h2>
      <Button
        onClick={resetErrorBoundary}
        variant="contained"
        sx={{
          borderRadius: "25px",
          mb: "-30px",
        }}
      >
        Try again
      </Button>
    </div>
  );
};
