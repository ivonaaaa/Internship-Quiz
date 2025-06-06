import { Box, Typography } from "@mui/material";
import { User } from "../types/UserType";
import "../styles/pages/Quizzes.css";

interface UserProps {
  user: User;
}

const Headline: React.FC<UserProps> = ({ user }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        textAlign: "left",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          position: "absolute",
          top: "140px",
          left: "40px",
          color: "purple",
          fontFamily: "Font, sans-serif",
          fontWeight: "bold",
        }}
      >
        Welcome, {user.username}!
      </Typography>
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          top: "220px",
          left: "40px",
          color: "pink",
          fontFamily: "Font, sans-serif",
        }}
      >
        Feel free to explore various fun quizzes here! <br /> Whether you're a
        trivia master, a curious explorer, or just looking for a fun way <br />
        to learn, you'll find quizzes that test your skills and expand your
        horizons. <br /> Jump in, discover new facts, and see how much you
        really know!
      </Typography>
    </Box>
  );
};

export default Headline;
