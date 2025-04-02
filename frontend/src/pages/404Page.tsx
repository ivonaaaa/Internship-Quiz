import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1 className="error-title">Oops, seems like you got lost!</h1>
      <p className="error-message">
        The page you have tried to access does not exist.
      </p>
      <Link to="/">
        <Button
          variant="contained"
          sx={{
            borderRadius: "25px",
            mt: "5px",
          }}
        >
          Go to HomePage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
