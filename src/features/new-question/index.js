import React from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthedUser } from "../../store/usersSlice";
import { saveQuestion } from "../../store/questionsSlice";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const NewQuestion = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector(selectAuthedUser);
  const history = useHistory();

  const handleSubmit = (e, newValue) => {
    e.preventDefault();
    dispatch(
      saveQuestion({
        author: authedUser.id,
        optionOneText: e.target[0].value,
        optionTwoText: e.target[1].value,
      })
    );

    history.push("/home");
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h5">Create a New Question</Typography>
        <form onSubmit={handleSubmit}>
          <p>Would you rather</p>
          <div style={{ marginBottom: "20px" }}>
            <TextField id="optionOne" fullWidth />
          </div>
          or
          <div style={{ marginBottom: "20px" }}>
            <TextField id="optionTwo" fullWidth />
          </div>
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default NewQuestion;
