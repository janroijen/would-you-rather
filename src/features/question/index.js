import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { selectQuestionById } from "../../store/questionsSlice";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Button, Typography } from "@material-ui/core";

const Question = ({ id }) => {
  const history = useHistory()
  const { author, optionOne, avatarURL } = useSelector(
    selectQuestionById(id)
  );

  const handleClick = (e) => {
    e.preventDefault();
    history.push('/questions/' + id)
  };

  return (
    <Card style={{ marginTop: "10px", marginBottom: "10px"}}>
      <CardHeader
        avatar={<Avatar src={avatarURL} />}
        title={"Asked by " + author}
      />
      <CardContent>
        <Typography>Would you rather</Typography>
        <Typography color="textSecondary">
          ... {optionOne.text.substring(0, 15)} ...
        </Typography>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          style={{ maxWidth: "150px" }}
          onClick={handleClick}
        >
          View Poll
        </Button>
      </CardContent>
    </Card>
  );
};

export default Question;
