import { useReducer } from "react";

const ACTIONS = {
  SET_FIELD: "SET_FIELD",
  SET_ERROR: "SET_ERROR",
  RESET_FORM: "RESET_FORM",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.error };
    case ACTIONS.RESET_FORM:
      return action.initialState;

    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

const useForm = (initialState) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const setField = (field, value) => {
    dispatch({ type: ACTIONS.SET_FIELD, field, value });
  };

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, error });
  };

  const resetForm = () => {
    dispatch({ type: ACTIONS.RESET_FORM, initialState });
  };

  return { formState, setField, setError, resetForm };
};

export default useForm;
