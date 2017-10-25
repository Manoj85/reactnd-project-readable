import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import PostsList from './post/PostsList';

class App extends Component {
	render() {
		return (
			<div className="container">
				<Switch>
					<Route path="/" component={PostsList} />
					<Route exact path="/:category" component={props => <PostsList {...props} />}
					/>
				</Switch>
			</div>
		)
	}
}

export default App