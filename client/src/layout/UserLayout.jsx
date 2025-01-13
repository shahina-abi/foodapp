import React, { useEffect, useState } from "react";
import Footer from "../components/user/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";
import UserHeader from "../components/user/UserHeader.jsx";
import Header from "../components/user/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosIntance.jsx";
import { clearUser, saveUser } from "../redux/features/UserSlice.js";

export const UserLayout = () => {
  const location = useLocation();
  const { isUserAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check",
      });
      console.log(response, "=====checkUser");
      dispatch(saveUser(response.data));
    } catch (error) {
      console.log(error);
      dispatch(clearUser());
    }
  };

  console.log(isUserAuth, "===========isuserAuth");

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <>
      <header>{isUserAuth ? <UserHeader /> : <Header />}</header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};
