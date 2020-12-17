import React from "react";
import { useSelector } from "react-redux";
import { selectScores } from "../../store/questionsSlice";

import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";

const UserScore = ({ name, written, answered, total, avatarURL }) => {
  return (
    <Card style={{ width: "310px", margin: "20px" }}>
      <CardMedia src={avatarURL} />
      <CardHeader avatar={<Avatar src={avatarURL} />} title={name} />
      <CardContent>
        <Typography color="textSecondary">
          Answered: {answered}, Written: {written},
        </Typography>
        <Typography >Total: {total}</Typography>
      </CardContent>
    </Card>
  );
};

const LeaderBoard = () => {
  const scores = useSelector(selectScores);
  // console.log(scores)

  return (
    <Container style={{ width: "440px" }}>
      <Paper  style={{ padding: "20px", marginTop: "40px" }}>
        {scores.map((score) => (
          <UserScore key={score.id} {...score} />
        ))}
      </Paper>
    </Container>
  );
};

export default LeaderBoard;
