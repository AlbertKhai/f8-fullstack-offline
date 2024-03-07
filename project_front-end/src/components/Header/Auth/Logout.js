"use client";
import { login, logout } from "@/redux/slice/authSlice";
import { initiateMindmap } from "@/redux/slice/mindmapSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Logout = ({ user, cssBtn, cssBtnLink }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(login(user));
      return;
    }
    dispatch(logout());
    return () => dispatch(initiateMindmap([]));
  }, [user]);

  return (
    <>
      <span className={cssBtn}>
        Hi{user.name && ", "}
        {user.name}
      </span>

      <Link href={"/mindmap"} className={cssBtn}>
        Mindmap
      </Link>

      <Link href={"/api/auth/logout"} className={cssBtnLink}>
        Đăng xuất
      </Link>
    </>
  );
};

export default Logout;
