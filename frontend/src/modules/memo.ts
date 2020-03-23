// Actions
const CREATE = "CREATE";
const DELETE = "DELETE";

// Action Creators
export const createMemo = (memo: any) => {
  return {
    type: CREATE,
    data: {
      memo
    }
  };
};

export const deleteMemo = (index: any) => {
  return { type: DELETE, data: index };
};

// Reducers
const reducer = (state = { memoList: [] }, action: any) => {
  switch (action.type) {
    case CREATE:
      let memoList = state.memoList;

      return {
        ...state,
        memoList: memoList.concat(action.data.memo)
      };
    default:
      return state;
  }
};

export default reducer;
