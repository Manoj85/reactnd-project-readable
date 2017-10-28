import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PostList from './post/PostList'
import PostForm from './post/PostForm'

class App extends Component {
	render() {
		return (
				<Switch>
					<Route path="/" component={PostList} />
					<Route path="/:category" component={props => <PostList {...props} />} />
					<Route path="/posts/add" component={PostForm} />
				</Switch>
		)
	}
}

export default App