import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "../constants/routes";
import PrivateRoute from "../hoc/PrivateRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import QuizzesPage from "../pages/QuizzesPage";
import QuizPage from "../pages/QuizPage";
import NotFound from "../pages/404Page";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes location={location} key={location.pathname}>
          <Route path={routes.LOGIN} element={<LoginPage />} />
          <Route path={routes.REGISTER} element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={routes.QUIZZES} element={<QuizzesPage />} />
            <Route path={routes.QUIZ} element={<QuizPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRouter;
