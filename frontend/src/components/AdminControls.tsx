import { Box, Button } from "@mui/material";

const AdminControls = () => {
  return (
    <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <Button variant="contained" color="secondary">
        Add Category
      </Button>
      <Button variant="contained" color="secondary">
        Add Quiz
      </Button>
      <Button variant="contained" color="secondary">
        See Results
      </Button>
    </Box>
  );
};

export default AdminControls;
