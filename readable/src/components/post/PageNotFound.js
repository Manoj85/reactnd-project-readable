import React, { Component } from 'react'


class PageNotFound extends Component {
    render() {
        return (
            <div className="container container-body">
                <div className="row margin-15">
                    <div className="error-page-wrap">
                        <article className="error-page gradient">
                            <h1>404</h1>
                            <h2>oops! Post Not found</h2>
                            <a href="/" title="Back to Home Page" class="error-back">Go Home</a>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageNotFound