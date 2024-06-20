import React, { createContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import uuid from "react-uuid";

interface IAlerts {
  text?: string;
  width?: string;
  uuid: string;
}

interface AlertContextType {
  addAlert: (text: string) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<IAlerts[]>([]);

  const addAlert = (text: string) => {
    setAlerts((prevAlerts) => [...prevAlerts, { text, uuid: uuid() }]);
  };

  const handleAnimationComplete = (uuid: string) => {
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.uuid !== uuid));
    }, 0);
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className="absolute right-0 z-50">
      <AnimatePresence>
  {alerts.map((alert) => (
    <motion.div
      initial={{ right: -300 }}
      animate={{ right: 0 }}
      exit={{ right: -300 }}
      transition={{ duration: 0.5 }}
      className="p-1 relative"
      key={alert.uuid}
    >
      <div className={clsx("flex flex-col bg-gray-300/80 overflow-hidden rounded-lg shadow-2xl")}>
        <p className="text-black p-2">
          {alert.text}
        </p>
        <motion.div
          initial={{ width: "100%", opacity: "100%" }}
          animate={{ width: 1 }}
          transition={{ duration: 10 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => handleAnimationComplete(alert.uuid)}
        >
          <div className="relative h-1 rounded-full bg-green-500"></div>
        </motion.div>
      </div>
    </motion.div>
  ))}
</AnimatePresence>
      </div>
    </AlertContext.Provider>
  );
};
