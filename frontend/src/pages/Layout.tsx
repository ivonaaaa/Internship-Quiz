import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import "../styles/App.css";

export const Layout = () => {
  return (
    <div>
      <Fragment>
        <Outlet />
      </Fragment>
    </div>
  );
};
