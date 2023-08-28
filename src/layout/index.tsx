import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { ReactNode } from "react";
import { useEffect } from "react";
import { getProperties } from "../../redux/slices/propertySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/stores";
import { SessionProvider } from "next-auth/react";
import { getUsers } from "../../redux/slices/usersSlice";
import { selectSearchData } from "../../redux/reselect/searchSelector";

interface LayoutProps {
  children: JSX.Element | ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProperties());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <SessionProvider>
      <div id="wrapper">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
};

export default Layout;
