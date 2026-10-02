import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

/** Scroll to a landing-page section, navigating home first when the visitor
 *  is on another page (the landing page reads the hash and scrolls). */
export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string) => {
      if (pathname === "/") {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate(id === "home" ? "/" : `/#${id}`);
      }
    },
    [navigate, pathname],
  );
}
