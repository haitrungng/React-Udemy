const redux = require("redux");
const INIT_STATE = { counter: 0 };
const counterReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "increment":
      return {
        counter: state.counter + 1,
      };
    case "decrement":
      return {
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

const store = redux.createStore(counterReducer);

// Đăng ký lắng nghe thay đổi
const counterSubscriber = () => {
  const state = store.getState();
  console.log("subcribe", state);
};

store.subscribe(counterSubscriber);
// Hủy đăng ký nếu không muốn lắng nghe nữa
// store.unsubscribe(counterSubscriber);

store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
