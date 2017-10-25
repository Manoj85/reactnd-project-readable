import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import PostsMain from './post/PostsMain';

class App extends Component {
	render() {
		return (
			<div className="container">
				<Switch>
					<Route exact path="/" component={PostsMain} />
					<Route exact path="/:category"
					       component={props => <PostsMain {...props} />}
					/>
				</Switch>
			</div>
		)
	}
}

export default App