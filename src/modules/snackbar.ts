// Actions
const SNACKBAR_OPEN = "SNACKBAR_OPEN";
const SNACKBAR_CLEAR = "SNACKBAR_CLEAR";

// Action Creators
export const showSnackbar = (message: string, variant: string = "success") => {
  return { type: SNACKBAR_OPEN, message, variant };
};

export const clearSnackbar = () => {
  return { type: SNACKBAR_CLEAR };
};

// Reducers
const reducer = (state = {}, action: any) => {
  switch (action.type) {
    case SNACKBAR_OPEN:
      return {
        ...state,
        open: true,
        message: action.message,
        variant: action.variant
      };
    case SNACKBAR_CLEAR:
      return {
        ...state,
        open: false,
        message: "",
        variant: "success"
      };
    default:
      return state;
  }
};

export default reducer;
