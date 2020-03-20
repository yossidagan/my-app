import React from "react";
import "./App.css";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ChatScreen from "./components/ChatScreen";
import chatsReducer from "./store/reducers/chatsReducer";
import authReducer from "./store/reducers/authReducer";
import errorReducer from "./store/reducers/errorReducer";




const rootReducer = combineReducers({
  chatsState: chatsReducer,
  error : errorReducer,
  auth : authReducer
});

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" render={() => <ChatScreen />} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
