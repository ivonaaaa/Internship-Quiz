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
      sx={{ display: "flex", gap: 2, padding: 2, justifyContent: "center" }}
    >
      <TextField
        label="Search Quizzes"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Search
      </Button>
    </Box>
  );
};

export default Navigation;
