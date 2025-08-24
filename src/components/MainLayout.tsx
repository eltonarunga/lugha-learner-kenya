import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

const MainLayout = () => {
  return (
    <div className="pb-16">
      <Outlet />
      <Navigation />
    </div>
  );
};

export default MainLayout;
