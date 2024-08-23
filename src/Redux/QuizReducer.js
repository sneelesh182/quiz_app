import { CORRECT_ANSWER, DATA_ERROR, DATA_LOADING, DATA_SUCCESS } from './ActionType';

const initialState = {
  loading: false,
  data: [],
  error: false,
  correctAnswer: 0,
};

export const QuizReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_LOADING:
      return { ...state, loading: true };
    case DATA_SUCCESS:
      return { ...state, loading: false, data: payload };
    case DATA_ERROR:
      return { ...state, error: true, loading: false };
    case CORRECT_ANSWER:
      return { ...state, correctAnswer: state.correctAnswer + 1 };
    default:
      return state;
  }
};
