// React
import React from 'react';
import ReactDOM from 'react-dom';


// Redux
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

// Routing and Links
import { Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

// App
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

// Root Reducer
import rootReducer from './reducers/rootReducer'

// CSS Files
import './index.css'
import './components/home/home.css'
import './components/post/posts.css'
import './components/post/comments.css'
import './components/category/category.css'
import './components/post/sorts.css'
import './components/post/NotFound.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Redux Store
const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
	        <App />
        </Router>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
