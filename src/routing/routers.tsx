import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Demo from "../pages/demo/Demo";
import Demo2 from "../pages/demo/Demo2";

interface IRouter {
  code: string;
  children: any;
}
const CheckRouter = ({ children, code }: IRouter) => {
  // if (!checkPermission(code)) {
  //     return <NoAccess />;
  // }
  return children;
};

const Redirect = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path={`/demo`} element={<Demo />} />
      <Route path={`/demo2`} element={<Demo2 />} />
    </Routes>
  );
};

export default Redirect;
