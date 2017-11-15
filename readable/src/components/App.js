import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage'
import PostForm from './post/PostForm'

class App extends Component {
	render() {
		return (
				<Switch>
					<Route path="/" component={HomePage} />
					<Route path="/:category" component={props => <HomePage {...props} />} />
					<Route path="/posts/new" component={PostForm} />
				</Switch>
		)
	}
}

export default App