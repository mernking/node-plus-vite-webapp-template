import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router

export default function Guardian({ content }) {
  const [user, setUser] = useState(null); // null = loading state
  const navigate = useNavigate(); // Use React Router for navigation

  useEffect(() => {
    console.log("Checking user session...");
    let isMounted = true; // Prevent state updates if unmounted

    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (data.isAuthenticated) {
            setUser(true);
          } else {
            navigate("/login"); // Redirect using React Router
          }
        }
      })
      .catch(() => {
        if (isMounted) setUser(false); // Handle errors
      });

    return () => {
      isMounted = false; // Cleanup function to avoid memory leaks
    };
  }, [navigate]);

  if (user === null) return <p>Loading...</p>; // Show loading state

  return <>{content}</>;
}
