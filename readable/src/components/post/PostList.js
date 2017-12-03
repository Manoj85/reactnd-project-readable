import React, { Component } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'
import Modal from 'react-modal'
import CloseIcon from 'react-icons/lib/fa/close'
import AddIcon from 'react-icons/lib/io/android-add'

import PostCard from './PostCard'
import PostForm from './PostForm'

import { sortByPosts } from '../../actions/PostAction'

class PostList extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    addPost = () => {
        this.openModal()
    }

    sortBy = ( type ) => {
        const { posts } = this.props
        const postsArr = _.values(posts);

        this.props.sortByPosts(postsArr, type)
    }

    render() {
        const { posts } = this.props
        const customStyles = {
            content : {
                top     : '75px',
                left    : '15%',
                right   : 'auto',
                bottom  : 'auto',
                width   : '70vw'
            }
        }

        return (
            <div className="post-container">
                <button className="btn btn-info btn-sm" onClick={this.addPost}>
                    Add Post <AddIcon size={20}/>
                </button>

                <section className="sortByContainer">
                    <label className="sortByLabel"> Order By:</label>
                    <a id="voteLink" onClick={() => this.sortBy('voteScore')}>Votes</a>
                    <span> / </span>
                    <a id="timestampLink" onClick={() => this.sortBy('timestamp')}>Date Created</a>
                </section>

                <Modal isOpen={this.state.modalIsOpen}
                       style={customStyles}
                       contentLabel="Add Post"
                       onAfterOpen={() => {}}
                       onRequestClose={() => {}}
                       closeTimeoutMS={0}
                       shouldCloseOnOverlayClick={true}
                       transitionName="modal-anim">

                    <div className="row">
                        <div className="col-md-12">

                            <section style={{width: '100%'}}>
                                <h4 style={{float: 'left'}}>Add Post</h4>
                                <button className="btn btn-danger btn-sm" style={{float: 'right'}} onClick={this.closeModal}>
                                    <CloseIcon size={20}/>
                                </button>
                                <p style={{clear: 'both'}}></p>
                            </section>

                            <PostForm onSubmit={() => {this.closeModal()}} onCancel={() => {this.closeModal()}}/>
                        </div>
                    </div>
                </Modal>

                { !!posts && (_.map(posts, (post) => {

                    return (
                        <PostCard post={post} key={post.id} showBody={false}/>
                    )
                }))
            }
            </div>
        )
    }
}

function mapStateToProps({posts}) {
    return { posts }
}

export default connect(mapStateToProps, {
    sortByPosts
})(PostList)