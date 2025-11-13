import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// App routes
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import routes from "./routes/routes";

// Landing site components
import Landing from "./landing/landing";
import AboutSection from "./landing/About";
import PricingSection from "./landing/Pricing";
import ServicesSection from "./landing/Services";
import Contact from "./landing/Contact";
import Terms from "./landing/Terms";
import PrivacyPolicy from "./landing/PrivacyPolicy";
import ScrollToTop from "./landing/ScrollToTop";
import LandingLayout from "./landing/LandingLayout";
import LandingModal from "./pages/PricingModel";
import { useCookies } from "react-cookie";

const App: React.FC = () => {
  // ✅ Type-safe selector (adjust RootState type if your store is named differently)
  const { email, allowedroutes, isSuper } = useSelector(
    (state: any) => state.auth
  );

    const [cookies] = useCookies();

  return (
    <div className="relative min-h-[99vh] overflow-hidden bg-gray-50">
      <ToastContainer />

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* ✅ Public Landing Routes (only visible when not logged in) */}
          {!cookies.access_token && (
            <Route element={<LandingLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/pricing" element={<PricingSection />} />
              <Route path="/services" element={<ServicesSection />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>
          )}

          {/* ✅ App / Dashboard Routes (when logged in) */}
          <Route path="/pricing-modal" element={<LandingModal />} />
          <Route path="/login" element={<Login />} />

          {cookies.access_token && (
            <Route path="/" element={<Layout />}>
              {routes.map((route, ind) => {
                const isAllowed =
                  isSuper ||
                  allowedroutes.includes(route.path.replaceAll("/", ""));

                // Only render allowed routes
                if (!isAllowed) return null;

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
                    index={route.name === "Dashboard"}
                    key={ind}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Route>
          )}

          {/* ✅ 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
