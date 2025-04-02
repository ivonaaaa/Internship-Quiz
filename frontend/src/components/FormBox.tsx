import { FormBoxProps } from "../types/FormTypes";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const FormBox: React.FC<FormBoxProps> = ({
  title,
  buttonText,
  onSubmit,
  switchText,
  switchPath,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" textAlign="center">
        {title}
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth>
        {buttonText}
      </Button>
      <Button variant="text" fullWidth onClick={() => navigate(switchPath)}>
        {switchText}
      </Button>
    </Box>
  );
};
