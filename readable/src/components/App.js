import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import { connect } from 'react-redux'
import PostsComponent from './post/PostsComponent';

class App extends Component {
    state = {
    }

    render() {
        return (
            <div className="container">
                <div className='nav'>
                    <h1 className='header'>Readable</h1>
                </div>
                { /* Posts Page */ }
                <Route exact path="/" component={PostsComponent} />

                { /* Category Page */ }
                <Route exact path="/:category" component={props => <PostsComponent {...props} />}
                />
            </div>
        )

    }
}

export default App