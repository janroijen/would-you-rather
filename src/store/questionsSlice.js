import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../services/_DATA";

export const getQuestions = createAsyncThunk("questions/load", async () => {
  const response = await _getQuestions();
  return response;
});

export const saveQuestion = createAsyncThunk("questions/save", async (question) => {
  return await _saveQuestion(question)
})

export const answerQuestion = createAsyncThunk("question/answer", async (answer) => {
  return await _saveQuestionAnswer(answer).then(() => answer)
})

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    status: "idle",
    questions: [],
  },
  extraReducers:{
    [getQuestions.pending]: (state) => {
      state.status = "loading";
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.questions = Object.values(action.payload).sort((a,b) => b.timestamp - a.timestamp)
      state.status = "succeeded";
    },
    [saveQuestion.fulfilled]: (state, action) => {
      state.questions.unshift(action.payload)
    },
    [answerQuestion.fulfilled]: (state, action) => {
      const targetQuestion = state.questions.find((question => question.id === action.payload.qid))
      if (action.payload.answer === 'optionOne') {
        targetQuestion.optionOne.votes.push(action.payload.authedUser)
      } else {
        targetQuestion.optionTwo.votes.push(action.payload.authedUser)
      }
    }
  }
});

export const selectLoadingStatus = state => state.questions.status;

export const selectQuestionById = questionId => state => {
  const question = state.questions.questions.find(question => question.id === questionId)
  if (!question) {
    return null
  }

  const author = state.users.users.find(user => user.id === question.author)
  const authedUser = state.users.authedUser
  const userAnswer = 
    question.optionOne.votes.includes(authedUser.id)
    ? 'optionOne'
    : question.optionTwo.votes.includes(authedUser.id)
    ? 'optionTwo'
    : 'unanswered'
    

  return { 
    ...question,
    author: author.name,
    avatarURL: author.avatarURL,
    userAnswer,
    optionOneVotes: question.optionOne.votes.length,
    optionTwoVotes: question.optionTwo.votes.length
  }

}

export const selectQuestions = answered => state => {
  const qs = state.questions.questions
  const user = state.users.authedUser.id

  if (answered) {
    return qs.filter(q => q.optionOne.votes.includes(user) || q.optionTwo.votes.includes(user))
  }

  return qs.filter(q => !q.optionOne.votes.includes(user) && !q.optionTwo.votes.includes(user))
}      

export const selectScores = state => {
  const scores = {}
  Object.values(state.users.users).forEach(user => scores[user.id] = {...user, written: 0, answered: 0, total: 0})
  Object.values(state.questions.questions).forEach(question => {
    scores[question.author].written += 1
    question.optionOne.votes.forEach(userId => scores[userId].answered += 1)
    question.optionTwo.votes.forEach(userId => scores[userId].answered += 1)
  })
  Object.values(scores).forEach(score => score.total = score.written + score.answered)

  return Object.values(scores).sort((a,b) => b.total - a.total)
}

export default questionsSlice.reducer;
