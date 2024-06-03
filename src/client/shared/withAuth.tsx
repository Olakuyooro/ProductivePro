import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";

const withAuth = (WrappedComponent: NextPage  ) => {
  const AuthComponent: NextPage = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("accessToken");

        if (token) {
          setIsAuthenticated(true);
        } else {
          router.replace("/login");
        }
        setIsLoading(false);
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return null; // or a loading spinner
    }

    if (!isAuthenticated) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
