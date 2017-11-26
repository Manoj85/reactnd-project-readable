import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage'
import PostForm from './post/PostForm'
import PostView from './post/PostView'
import NavBar from './nav/NavBar'

class App extends Component {
	render() {
		return (
			<div className="app">
				<NavBar/>

				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/posts/new" component={PostForm} />
					<Route exact path="/:category" component={props => <HomePage {...props} />} />
					<Route exact path="/:category/:id" component={PostView} />
				</Switch>

			</div>
		)
	}
}

export default App