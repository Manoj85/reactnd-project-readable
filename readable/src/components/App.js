import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage'
import PostForm from './post/PostForm'
import NavBar from './nav/NavBar'

class App extends Component {
	render() {
		return (
			<div className="app">
				<NavBar/>

				<Switch>
					<Route path="/" component={HomePage} />
					<Route path="/:category" component={props => <HomePage {...props} />} />
					<Route path="/posts/new" component={PostForm} />
				</Switch>

			</div>
		)
	}
}

export default App