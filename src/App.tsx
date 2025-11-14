// @ts-nocheck
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from "./pages/Register";
import Layout from "./pages/Layout";
import RTPAS from "./routes/routes";
import SOPAS from "./routes/SOPAS.routes";
import KONTRONIX from "./routes/KONTRONIX.routes";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import LandingLayout from "./landing/LandingLayout";
import PublicRoutes from "./routes/Public.routes";
import PricingSection from "./pages/PricingModel";
import { useCookies } from "react-cookie";
import SessionExpired from "./pages/SubscriptionEnd";
import { useGetLoggedInUserQuery } from "./redux/api/api";
import { isSubscriptionEnd } from "./utils/dateModifyer";
import { motion } from "motion/react";

const App: React.FC = () => {
  const { allowedroutes, isSuper, id } = useSelector(
    (state: any) => state.auth
  );

  const [cookies] = useCookies();

  const { data: user, isLoading } = useGetLoggedInUserQuery(
    cookies.access_token ? id : ""
  );

  const handleRoutes = (path) => {
    switch (path) {
      case "RTPAS":
        return isSubscriptionEnd(user?.user[0]?.subscription_end) ? [] : RTPAS;
      case "SOPAS":
        return isSubscriptionEnd(user?.user[0]?.subscription_end) ? [] : SOPAS;
      case "KONTRONIX":
        return isSubscriptionEnd(user?.user[0]?.subscription_end)
          ? []
          : KONTRONIX;
      default:
        return [];
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (user) {
      if (isSubscriptionEnd(user?.user[0]?.subscription_end)) {
        Navigate("subscription-end");
      }
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
          ></motion.div>

          <p className="text-gray-600 font-medium tracking-wide">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[99vh] bg-gray-50">
      <div className="min-h-screen">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            {!cookies.access_token && (
              <Route element={<LandingLayout />}>
                {PublicRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>
            )}

            <Route path="/login" element={<Login />} />

            <Route path="/subscription-end" element={<SessionExpired />} />

            <Route path="/pricing-modal" element={<PricingSection />} />
            {/* <Route path="/register" element={<Register />} /> */}
            {cookies.access_token && (
              <Route path="/" element={<Layout />}>
                {handleRoutes(user?.user[0]?.plan).map((route, ind) => {
                  const isAllowed =
                    isSuper ||
                    allowedroutes.includes(route.path.replaceAll("/", ""));
                  if (route.isSublink) {
                    return (
                      <Route
                        key={ind}
                        path={route.path}
                        element={route.element}
                      >
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
              </Route>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
