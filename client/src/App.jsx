import { useLocation } from "react-router-dom";
import MainRoutes from "./components/routes/MainRoutes";
import DashboardRoutes from "./components/routes/DashboardRoutes";
import Navbar from "./components/fragments/Navbar";
import Guardian from "./components/security/Guardian";
import Sidenav from "./components/fragments/Sidenav";

function DashRoutes() {
  return (
    <div className="w-full bg-background flex flex-col md:flex-row justify-center items-center">
      <div className="w-full md:w-fit">
        <Sidenav />
      </div>
      <div className="w-full">
        <DashboardRoutes />
      </div>
    </div>
  );
}

function HomeRoutes() {
  return (
    <div className="w-full bg-background relative flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-baseline absolute top-[0px]">
        <Navbar />
      </div>
      <div className="w-full translate-y-[50px]">
        <MainRoutes />
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="w-full dark bg-background text-text">
      {location.pathname.startsWith("/dashboard") ? (
        <Guardian content={<DashRoutes />} />
      ) : (
        <HomeRoutes />
      )}
    </div>
  );
}

export default App;
