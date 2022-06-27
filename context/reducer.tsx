export const initialState = {
  qnty: 0,
  token: "",
  netConnection: "",
  cats: [],
  userName: "",
  userId: "",
};

export const actionTypes = {
  GET_TOTAL: "GET_TOTAL",
  SET_TOKEN: "SET_TOKEN",
  GET_NET: "GET_NET",
  GET_CATS: "GET_CATS",
  GET_USER: "GET_USER",
  GET_USER_ID: "GET_USER_ID",
};

function reducer(state, action) {
  switch (action.type) {
    // add to cart function
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "GET_TOTAL":
      return {
        ...state,
        qnty: action.qnty,
      };
    case "GET_NET":
      return {
        ...state,
        netConnection: action.netConnection,
      };
    case "GET_CATS":
      return {
        ...state,
        cats: action.cats,
      };
    case "GET_USER":
      return {
        ...state,
        userName: action.userName,
      };
    case "GET_USER_ID":
      return {
        ...state,
        userId: action.userId,
      };

    default:
      return state;
  }
}

export default reducer;
