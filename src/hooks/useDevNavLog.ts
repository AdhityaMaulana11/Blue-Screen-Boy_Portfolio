import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useMode } from "../context/ModeContext";

const ROUTE_LABELS: Record<string, string> = {
  "/": "Home module",
  "/about": "About module",
  "/projects": "Projects module",
  "/contact": "Contact module",
};

/** Pushes a system log when navigating in Dev Mode */
export const useDevNavLog = () => {
  const { devMode, pushLog } = useMode();
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (!devMode) return;
    if (location.pathname !== prevPath.current) {
      const label = ROUTE_LABELS[location.pathname] || location.pathname;
      pushLog({ type: "info", msg: `${label} loaded.` });
      prevPath.current = location.pathname;
    }
  }, [location.pathname, devMode, pushLog]);
};
