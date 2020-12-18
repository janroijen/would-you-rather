import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  selectAuthedUser,
  selectLoadingStatus,
} from "./store/usersSlice";
import { getQuestions } from "./store/questionsSlice";
import Login from "./features/login";
import QuestionsList from "./features/questions-list";
import NewQuestion from "./features/new-question";
import NavBar from "./features/nav-bar";

import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LeaderBoard from "./features/leader-board";
import QuestionDetails from "./features/question-details";
import NoMatch404 from "./features/no-match-404";

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoadingStatus);
  const authedUser = useSelector(selectAuthedUser);

  // Initial load of user data.
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getQuestions());
  }, [dispatch]);

  if (status === "loading" || status === "idle") {
    return (
      <Card>
        <LinearProgress></LinearProgress>
        <CardContent>
          <Typography variant="h1">Would you rather app</Typography>
          <Typography variant="h3">Loading...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (!authedUser) {
    return (
      <>
        <NavBar />
        <Login />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <QuestionsList />
        </Route>
        <Route path="/home">
          <QuestionsList />
        </Route>
        <Route path="/add">
          <NewQuestion />
        </Route>
        <Route path="/leaderboard">
          <LeaderBoard />
        </Route>
        <Route path="/questions/:id">
          <QuestionDetails />
        </Route>
        <Route path="*">
          <NoMatch404 />
        </Route>
      </Switch>
    </>
  );
};

export default App;
