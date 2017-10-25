import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
	        <ErrorBoundary><App /></ErrorBoundary>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
