import { Box, Typography } from "@mui/material";
import { UserPayload } from "../types/UserType";

interface UserProps {
  user: UserPayload;
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
