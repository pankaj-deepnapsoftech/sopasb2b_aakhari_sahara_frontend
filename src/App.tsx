// @ts-nocheck
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from "./pages/Register";
import Layout from "./pages/Layout";
import RTPAS from "./routes/routes";
import SOPAS  from "./routes/SOPAS.routes"
import KONTRONIX from "./routes/KONTRONIX.routes"
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import LandingLayout from "./landing/LandingLayout";
import PublicRoutes from "./routes/Public.routes"
import PricingSection from "./pages/PricingModel";
import { useCookies } from "react-cookie";
import SessionExpired from "./pages/SessionExpired";

const App: React.FC = () => {
  const { allowedroutes, isSuper } = useSelector((state: any) => state.auth);

  const [cookies] = useCookies();

  const handleRoutes = (path) => {
    switch (path) {
      case "RTPAS":
        return RTPAS;
      case "SOPAS":
        return SOPAS;
      case "KONTRONIX":
        return KONTRONIX
      default:
        return [];

    }
  }

  return (
    <div className="relative min-h-[99vh] bg-gray-50">
      <div className="min-h-screen">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            {!cookies.access_token && <Route element={<LandingLayout />}>
              {PublicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>}

            <Route path="/login" element={<Login />} />

            <Route path="/session" element={<SessionExpired />} />

            <Route path="/pricing-modal" element={<PricingSection />} />
            {/* <Route path="/register" element={<Register />} /> */}
            {cookies.access_token && <Route path="/" element={<Layout />}>
              {handleRoutes("RTPAS").map((route, ind) => {
                const isAllowed =
                  isSuper ||
                  allowedroutes.includes(route.path.replaceAll("/", ""));
                if (route.isSublink) {
                  return (
                    <Route key={ind} path={route.path} element={route.element}>
                      {route.sublink &&
                        route.sublink.map((sublink, index) => {
                          return (
                            <Route
                              key={index}
                              path={sublink.path}
                              element={sublink.element}
                            ></Route>
                          );
                        })}
                    </Route>
                  );
                } else {
                  return (
                    <Route
                      index={route.name === "Dashboard" ? true : false}
                      key={ind}
                      path={route.path}
                      element={route.element}
                    ></Route>
                  );
                }
              })}
            </Route>}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;


