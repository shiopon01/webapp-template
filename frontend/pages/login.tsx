import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { showSnackbar } from "../src/modules/snackbar";
import { getUser, login } from "../src/modules/auth";

const useStyles = makeStyles(() => ({
  body: {
    width: "500px",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    fontWeight: "bold",
    marginTop: 20
  },
  paper: {
    width: "100%",
    padding: "50px",
    backgroundColor: "rgba(25, 133, 123, 0.08)"
  }
}));

const LoginPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();

  const auth = useSelector((state: any) => state.auth);
  const [userId, setUserId] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (!auth.isAuthenticated && !auth.needLogin) {
    return <div>Now Loading</div>;
  }

  if (auth.isAuthenticated) {
    router.push("/");
    return <div>Redirect...</div>;
  }

  const onClickLogin = () => {
    // dispatchからshowSnackbarを呼び出し可
    if (userId.length === 0) {
      dispatch(showSnackbar("UserIdが空", "error"));
      return;
    }
    if (password.length === 0) {
      dispatch(showSnackbar("Passwordが空", "error"));
      return;
    }
    dispatch(login(userId, password));
  };

  const onHandleChange = (e: any) => {
    if (e.target.value.length < 101) {
      switch (e.target.id) {
        case "userId":
          setUserId(e.target.value);
          break;
        case "password":
          setPassword(e.target.value);
          break;
        default:
          break;
      }
    }
  };

  const _handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <div className={classes.body}>
            <Grid container justify="center">
              <Paper classes={{ root: classes.paper }}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      id="userId"
                      name="userId"
                      label="UserID"
                      value={userId}
                      onChange={onHandleChange}
                      onKeyPress={_handleKeyPress}
                      fullWidth
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="password"
                      type="password"
                      label="Password"
                      value={password}
                      onChange={onHandleChange}
                      onKeyPress={_handleKeyPress}
                      fullWidth
                    />
                  </Grid>
                  <Grid container justify="flex-end">
                    <Button variant="contained" onClick={onClickLogin} className={classes.loginButton}>
                      ログイン
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
