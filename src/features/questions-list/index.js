import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useSelector } from "react-redux";
import { selectQuestions } from "../../store/questionsSlice";
import Question from "../question";

const QuestionsList = () => {
  const [questionIndex, setQuestionIndex] = useState(0);

  let questionList = useSelector(selectQuestions(questionIndex !== 0));

  const handleCategoryChange = (e, newValue) => {
    setQuestionIndex(newValue);
    console.log(questionList);
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "40px" }}>
      <Paper style={{ padding: "20px" }}>
        <Tabs value={questionIndex} onChange={handleCategoryChange}>
          <Tab label="Unanswered" />
          <Tab label="Answered" />
        </Tabs>
        <Typography variant="h5" style={{marginTop: "20px", marginBottom: "20px"}}>Questions</Typography>
        {questionList.map((question) => (
          <Question key={question.id} id={question.id} />
        ))}
      </Paper>
    </Container>
  );
};

export default QuestionsList;
