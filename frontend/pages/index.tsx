import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

import { getUser, logout } from "../src/modules/auth";

const IndexPage: NextPage = (_props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (!auth.isAuthenticated && !auth.needLogin) {
    return <div>Now Loading...</div>;
  }

  if (auth.needLogin) {
    router.push("/login");
    return <div>Redirect...</div>;
  }

  return (
    <div>
      <Button onClick={() => dispatch(logout())}>ログアウト</Button>
    </div>
  );
};

export default IndexPage;
