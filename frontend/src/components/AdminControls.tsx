import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import useCreateCategory from "../hooks/category/useCreateCategory";

const AdminControls = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const { createCategory, loading, error } = useCreateCategory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!categoryName.trim() || !image.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    await createCategory({ name: categoryName, image }, token);
    setCategoryName("");
    setImage("");
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Add Category
        </Button>
        <Button variant="contained" color="secondary">
          Add Quiz
        </Button>
        <Button variant="contained" color="secondary">
          See Results
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Add New Category</Typography>
          <TextField
            fullWidth
            label="Category Name"
            margin="normal"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Image URL"
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminControls;
