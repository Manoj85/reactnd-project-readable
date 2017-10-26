import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import PostList from './post/PostList';

class App extends Component {
	render() {
		return (
				<Switch>
					<Route path="/" component={PostList} />
					<Route exact path="/:category" component={props => <PostList {...props} />}
					/>
				</Switch>
		)
	}
}

export default App