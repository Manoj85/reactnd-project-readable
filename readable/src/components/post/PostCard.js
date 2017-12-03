import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Modal from 'react-modal'

import EditIcon from 'react-icons/lib/fa/edit'
import DeleteIcon from 'react-icons/lib/md/delete'
import CloseIcon from 'react-icons/lib/fa/close'

import { addPost, editPost, deletePost, addVote, subtractVote } from '../../actions/PostAction'
import { getCommentsById } from '../../actions/CommentAction'

import PostForm from './PostForm'

class PostCard extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.props.getCommentsById(this.props.post.id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post) {
            this.setState(prevState => ({
                post: nextProps.post,
                comments: nextProps.comments,
                categories: nextProps.categories
            }))
        } else {
            this.setState({
                post: null,
                categories: nextProps.categories,
                comments: nextProps.comments
            })
        }
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    removePost = () => {
        let postId = this.props.post.id
        if (!!postId) {
            this.props.deletePost(postId)
        }
    }

    editPost = () => {
        this.openModal()
    }

    doVotePost = (option) => {
        let postId = this.props.post.id
        if (option === 'upVote') {
            this.props.addVote(postId)
        } else if (option === 'downVote') {
            this.props.subtractVote(postId)
        }
    }

    render() {
        const {post, showBody} = this.props

        const postId = (!!post) ? post.id : ""
        const comments = (!!this.props.comments) ? this.props.comments[postId] : []
        const commentLength = (!!comments) ? comments.length : 0

        const customStyles = {
            content: {
                top: '75px',
                left: '15%',
                right: 'auto',
                bottom: 'auto',
                width: '70vw'
            }
        }

        return (
            <div className="card margin-top-10" key={post.id}>
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="row">
                            <div className="col-md-1">
                                <div className="vote">
                                    <a className="vote-up-off" title="" onClick={() => this.doVotePost('upVote')}>upvote</a>
                                    <span className="vote-count-post">{post.voteScore}</span>
                                    <a className="vote-down-off" title="" onClick={() => this.doVotePost('downVote')}>downvote</a>
                                </div>
                            </div>

                            <div className="col-md-7">
                                <div className="margin-bottom-10">
                                    <Link to={'/' + post.category + '/' + post.id}> {post.title} </Link>
                                    <span className="text-muted" style={{fontSize: 16}}>{post.timestamp}</span>
                                </div>
                                { showBody ?
                                    <div className="margin-bottom-10">
                                        <span style={{fontSize: 16}}>{post.body}</span>
                                    </div> : ""
                                }
                                <h6 className="card-subtitle mb-2 text-muted">By: {post.author}</h6>
                            </div>

                            <div className="col-md-2 ml-md-auto">
                                <button className="btn btn-info btn-sm margin-left-15" id={post.id} onClick={this.editPost}>
                                    <EditIcon size={20}/>
                                </button>
                                <button className="btn btn-danger btn-sm margin-left-15" id={post.id} onClick={this.removePost}>
                                    <DeleteIcon size={20}/>
                                </button>
                            </div>
                        </div>
                    </h5>

                    <p className="card-comments">Comments: {commentLength} </p>
                </div>

                <Modal isOpen={this.state.modalIsOpen}
                       style={customStyles}
                       contentLabel="Edit Post"
                       onAfterOpen={() => {}}
                       onRequestClose={() => {}}
                       closeTimeoutMS={0}
                       shouldCloseOnOverlayClick={true}
                       transitionName="modal-anim">

                    <div className="row">
                        <div className="col-md-12">
                            <section style={{width: '100%'}}>
                                <h4 style={{float: 'left'}}>Edit Post</h4>
                                <button className="btn btn-danger btn-sm" style={{float: 'right'}} onClick={this.closeModal}>
                                    <CloseIcon size={20}/>
                                </button>
                                <p style={{clear: 'both'}}></p>
                            </section>

                            <PostForm currentPost={post} onSubmit={() => {this.closeModal()}} onCancel={() => {this.closeModal()}}/>
                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}

function mapStateToProps({posts, categories, comments}) {
    return {posts, categories, comments}
}

export default connect(mapStateToProps, {
    addPost,
    editPost,
    deletePost,
    addVote,
    subtractVote,
    getCommentsById
})(PostCard)