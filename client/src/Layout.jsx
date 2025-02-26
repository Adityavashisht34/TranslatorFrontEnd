import { Outlet } from "react-router-dom";
import "./styles/index.css"

export default function Layout() {
  return (
    <>
    <Outlet />
    </>
  );
}
