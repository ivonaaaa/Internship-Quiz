import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { routes } from "../constants/routes";
import { Layout } from "../pages/Layout";
// import NotFound from "../pages/HomePage";
// import NotFound from "../pages/QuizPage";
// import NotFound from "../pages/404Page";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            {/* kad implementiram stranice cu ovo odkomentirat */}
            {/* <Route path={routes.HOME} element={<HomePage />} /> */}
            {/* <Route path={routes.QUIZ} element={<QuizPage />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRouter;
