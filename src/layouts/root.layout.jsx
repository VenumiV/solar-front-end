import { Outlet } from "react-router";
import Navigation from "@/components/Navigation/Navigation";

export const RootLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default RootLayout;