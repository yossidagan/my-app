import React, { useEffect } from 'react'
import './App.css'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { loadUser } from '../src/store/actions/authActions'
import { getUsers } from '../src/store/actions/userActions'
import thunk from 'redux-thunk'
import ChatScreen from './components/ChatScreen'
import chatsReducer from './store/reducers/chatsReducer'
import authReducer from './store/reducers/authReducer'
import errorReducer from './store/reducers/errorReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleWare = [thunk]

const rootReducer = combineReducers({
  chatsState: chatsReducer,
  error: errorReducer,
  auth: authReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWare))
)

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(getUsers())

  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" render={() => <ChatScreen />} />
        </div>
      </Router>
    </Provider>
  )
}

export default App
