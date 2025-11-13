import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const SessionExpired: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-center mb-4"
        >
          <AlertTriangle className="w-16 h-16 text-yellow-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Session Expired
        </h1>
        <p className="text-gray-600 mb-6">
          Your session has expired due to inactivity or security reasons.  
          Please log in again to continue using your account.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#1e3a8a",
            color: "#fff",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/pricing-modal")}
          className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow-md hover:shadow-lg transition"
        >
          Upgrade Now
        </motion.button>
      </motion.div>

      <p className="mt-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Deepnap Softech. All rights reserved.
      </p>
    </div>
  );
};

export default SessionExpired;
