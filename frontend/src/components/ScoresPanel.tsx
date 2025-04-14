import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useAllUserQuizAttempts } from "../hooks/user/useAllUserQuizAttempts";

interface ScoresPanelProps {
  open: boolean;
  onClose: () => void;
}

export const ScoresPanel = ({ open, onClose }: ScoresPanelProps) => {
  const { attempts, loading, error } = useAllUserQuizAttempts();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Quiz Results</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">
            Error fetching data: {error.message}
          </Typography>
        ) : attempts.length === 0 ? (
          <Typography>No results found.</Typography>
        ) : (
          attempts.map((result) => (
            <div key={result.id} style={{ marginBottom: "1rem" }}>
              <Typography>
                <strong>{result.user.username}</strong> scored{" "}
                <strong>{result.score}</strong> on{" "}
                <strong>{result.quiz.title}</strong>
              </Typography>
            </div>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};
