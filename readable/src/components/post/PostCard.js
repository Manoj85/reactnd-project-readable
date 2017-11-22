import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import EditIcon from 'react-icons/lib/fa/edit'
import DeleteIcon from 'react-icons/lib/md/delete'
import CloseIcon from 'react-icons/lib/fa/close'

import { deletePost } from '../../actions/PostAction'

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

    handleChange(e) {
        let key = e.target.id
        let editPost = this.state.editPost
        editPost[key] = e.target.value
        this.setState({
            editPost: editPost
        })
    }


    editPost = () => {
        this.openModal()
    }

    render() {
        const { post } = this.props
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
            <div className="card margin-top-10" key={post.id}>
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="row">
                            <div className="col-md-8">
                                <Link to={'/' + post.category + '/' + post.id}> { post.title } </Link>
                                <span className="text-muted" style={{fontSize: 16}}>{post.timestamp}</span>
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
                    <h6 className="card-subtitle mb-2 text-muted">By: {post.author}</h6>
                    <p className="card-text"></p>
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

function mapStateToProps ({ posts, categories }) {
    return {posts, categories}
}

export default connect(mapStateToProps, {
    deletePost
})(PostCard)