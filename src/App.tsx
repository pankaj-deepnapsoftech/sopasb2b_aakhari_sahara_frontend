// @ts-nocheck
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import RTPAS from "./routes/routes";
import SOPAS from "./routes/SOPAS.routes";
import KONTRONIX from "./routes/KONTRONIX.routes";

import { useSelector } from "react-redux";
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
  const { allowedroutes, isSuper, id } = useSelector((state: any) => state.auth);
  const [cookies] = useCookies();

  /** -------------------------------
   *  FIXED USER ID RESOLUTION LOGIC
   *  ------------------------------- */
  const getSavedUserId = () => {
    const raw = sessionStorage.getItem("Auth-data");
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);
      return parsed?._id || null;
    } catch {
      return null;
    }
  };

  const userId = id || getSavedUserId();


  /** -------------------------------
   *  API: Fetch logged-in user
   *  ------------------------------- */
  const { data: user, isLoading } = useGetLoggedInUserQuery(
    cookies.access_token ? userId : ""
  );

  const subscriptionEnded =
    isSubscriptionEnd(user?.user?.[0]?.subscription_end);


  /** -------------------------------
   *  Handle Route Permissions
   *  ------------------------------- */
  const handleRoutes = (plan: string) => {
    if (subscriptionEnded) return [];

    switch (plan) {
      case "RTPAS":
      case "Free Trial":
        return RTPAS;

      case "SOPAS":
        return SOPAS;

      case "KONTRONIX":
        return KONTRONIX;

      default:
        return [];
    }
  };


  /** -------------------------------
   *  Redirect on subscription end
   *  ------------------------------- */
  useEffect(() => {
    if (user && subscriptionEnded) {
      window.location.href = "/subscription-end";
    }
  }, [user]);


  /** -------------------------------
   *  Loading state UI
   *  ------------------------------- */
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


  /** -------------------------------
   *  JSX RETURN
   *  ------------------------------- */
  return (
    <div className="relative min-h-[99vh] bg-gray-50">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* Public Routes (no token) */}
          {!cookies.access_token && (
            <Route element={<LandingLayout />}>
              {PublicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
          )}

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/subscription-end" element={<SessionExpired />} />
          <Route path="/pricing-modal" element={<PricingSection />} />

          {/* Protected Routes */}
          {cookies.access_token && (
            <Route path="/" element={<Layout />}>
              {handleRoutes(user?.user?.[0]?.plan).map((route, ind) => {
                const isAllowed =
                  isSuper ||
                  allowedroutes.includes(route.path.replaceAll("/", ""));

                // Uncomment if you want to restrict unauthorized pages:
                // if (!isAllowed) return null;

                if (route.isSublink) {
                  return (
                    <Route key={ind} path={route.path} element={route.element}>
                      {route.sublink?.map((sublink, index) => (
                        <Route
                          key={index}
                          path={sublink.path}
                          element={sublink.element}
                        />
                      ))}
                    </Route>
                  );
                }

                return (
                  <Route
                    key={ind}
                    index={route.name === "Dashboard"}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Route>
          )}

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
