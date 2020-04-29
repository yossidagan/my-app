import React, { useEffect } from 'react'
import './App.css'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { loadUser } from '../src/store/actions/authActions'
import { getUsers } from '../src/store/actions/userActions'
import thunk from 'redux-thunk'
import ChatScreen from '../src/components/screens/ChatScreen'
import chatsReducer from './store/reducers/chatsReducer'
import authReducer from './store/reducers/authReducer'
import errorReducer from './store/reducers/errorReducer'
import userReducer from './store/reducers/userReducer'
import RegisterScreen from './components/screens/RegisterScreen'
import Navbar from './components/Navbar'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleWare = [thunk]

const rootReducer = combineReducers({
  chatsState: chatsReducer,
  error: errorReducer,
  auth: authReducer,
  userState: userReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWare))
)

const App = () => {
  useEffect(() => {
    store.dispatch(getUsers())
    store.dispatch(loadUser())

  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" render={() => <ChatScreen />} />
          <Route exact path="/register" render={() => <RegisterScreen />} />
        </div>
      </Router>
    </Provider>
  )
}

export default App
