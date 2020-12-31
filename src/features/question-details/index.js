import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectQuestionById, answerQuestion } from "../../store/questionsSlice";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Typography,
} from "@material-ui/core";
import { selectAuthedUser } from "../../store/usersSlice";

const QuestionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const authedUser = useSelector(selectAuthedUser).id;
  const [answer, setAnswer] = useState("optionOne");
  const question = useSelector(selectQuestionById(id));
  if (!question) {
    return <h4>Question not found.</h4>;
  }
  const {
    author,
    optionOne,
    optionTwo,
    avatarURL,
    userAnswer,
    optionOneVotes,
    optionTwoVotes,
  } = question;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(answerQuestion({ authedUser, qid: id, answer }));
  };

  const handleRadioChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <Container style={{ margin: "40px", width: "400px" }}>
      <Card>
        <CardHeader
          avatar={<Avatar src={avatarURL} />}
          title={"Asked by " + author}
        />
        <CardContent>
          {userAnswer === "unanswered" ? (
            <form onSubmit={handleSubmit}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={answer}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="optionOne"
                    control={<Radio />}
                    label={optionOne.text}
                  />
                  <FormControlLabel
                    value="optionTwo"
                    control={<Radio />}
                    label={optionTwo.text}
                  />
                </RadioGroup>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ maxWidth: "150px" }}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          ) : (
            <Card>
              <CardContent>
                <Typography>Would you rather {optionOne.text}?</Typography>
                <Typography color="textSecondary">
                  {optionOneVotes} out of {optionOneVotes + optionTwoVotes}{" "}
                  votes (
                  {Math.round(
                    (100 * optionOneVotes) / (optionOneVotes + optionTwoVotes)
                  )}
                  %)
                </Typography>
                {userAnswer === "optionOne" && (
                  <Avatar style={{ padding: "10px", textAlign: "center" }}>
                    Your vote
                  </Avatar>
                )}
              </CardContent>
              <CardContent>
                <Typography>Would you rather {optionTwo.text}?</Typography>
                <Typography color="textSecondary">
                  {optionTwoVotes} out of {optionOneVotes + optionTwoVotes}{" "}
                  votes (
                  {Math.round(
                    (100 * optionTwoVotes) / (optionOneVotes + optionTwoVotes)
                  )}
                  %)
                </Typography>
                {userAnswer === "optionTwo" && (
                  <Avatar style={{ padding: "10px", textAlign: "center" }}>
                    Your vote
                  </Avatar>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default QuestionDetails;
