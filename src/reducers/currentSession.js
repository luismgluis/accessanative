const INITIAL_STATE = {
  user: null,
  group: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "setGroup":
      return {
        ...state,
        group: action.payload,
      };
    case "setUser":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
