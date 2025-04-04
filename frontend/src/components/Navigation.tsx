import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

const Navigation = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: "flex",
        gap: 2,
        width: "50%",
        margin: "0 auto",
        padding: "0.6rem 2rem",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: "#7754AF55",
      }}
    >
      <TextField
        label="Search Quizzes"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit" variant="contained" size="small">
        Search
      </Button>
    </Box>
  );
};

export default Navigation;
