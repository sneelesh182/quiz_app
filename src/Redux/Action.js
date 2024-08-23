import axios from 'axios';
import { CORRECT_ANSWER, DATA_ERROR, DATA_LOADING, DATA_SUCCESS } from './ActionType';

const URL = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz';

export const dataLoading = () => ({ type: DATA_LOADING });

export const dataSuccess = (data) => ({ type: DATA_SUCCESS, payload: data });

export const dataError = () => ({ type: DATA_ERROR });

export const getData = () => async (dispatch) => {
  dispatch(dataLoading());
  try {
    const res = await axios.get(URL);
    dispatch(dataSuccess(res.data.data));
  } catch {
    dispatch(dataError());
  }
};

export const correct = () => ({ type: CORRECT_ANSWER });

export const submitQuiz = (answers) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/submit-quiz', { answers });
    alert(`Quiz submitted. Your score: ${res.data.score}/${res.data.total}`);
  } catch (error) {
    console.error('Error submitting quiz:', error);
  }
};
