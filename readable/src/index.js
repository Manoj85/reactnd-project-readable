import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import './components/post/posts.css'
import './components/category/category.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
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
