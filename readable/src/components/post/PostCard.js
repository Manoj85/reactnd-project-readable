import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import EditIcon from 'react-icons/lib/fa/edit'
import DeleteIcon from 'react-icons/lib/md/delete'
import CloseIcon from 'react-icons/lib/fa/close'

import { deletePost } from '../../actions/PostAction'

class PostCard extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
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

    editPost = () => {
        // let postId = this.props.post.id
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
                            <form onSubmit={this.savePost}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" id="title" placeholder="Enter title" onChange={this.handleChange} required={true}/>
                                </div>
                                <div className="form-group">
                                    <label>Body</label>
                                    <textarea className="form-control" id="body" placeholder="Content of your post"  onChange={this.handleChange} required={true}/>
                                </div>
                                <div className="form-check">
                                    <label>Categories: </label>
                                    <select className="form-control" id="category" onChange={this.handleChange} required={true}>
                                        {!!this.props.categories && this.props.categories.map(category => (
                                            <option value={category.name} key={category.path}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Save Post</button>
                            </form>
                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}

function mapStateToProps ({ posts }) {
    return {posts}
}

export default connect(mapStateToProps, {
    deletePost
})(PostCard)