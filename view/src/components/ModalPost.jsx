import React, { useState, useEffect } from "react";
import "../css/modal.css";
import { useNavigate } from 'react-router-dom';
import Comments from "./Comments";

const ModalPost = ({ disabled, closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            title: "",
            body: ""
        }
    );
    async function serverGetRow(id) {
        const post = await fetch(`http://localhost:7787/posts/${id}`)
            .then(async response => await response.json());
        return { id: post.id, title: post.title, body: post.body };
    };
    useEffect(() => {
        async function fetchData() {
            const postData = await serverGetRow(defaultValue);
            setFormState(postData);
        }
        defaultValue? fetchData(): setFormState({
            title: "",
            body: ""
        });
    }, []);
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [showCommentBtnShow, setShowCommentBtnShow] = useState(disabled);


    const validateForm = () => {
        if (formState.title || formState.body) {
            setError("");
            return true;
        } else {
            setError("One or more of the details are empty");
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        onSubmit(formState);
        closeModal();
    };

    const handleShowComments = () => {
        navigate("comments", { replace: true });
        setShowCommentBtnShow(false);
        setCommentsOpen(true);
    }

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container")
                    closeModal();
            }}
        >
            <div className="modal">
                <form>
                    {defaultValue && (<div className="form-group">
                        <label >Id:{formState.id}</label>
                    </div>)}

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            disabled={disabled}
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={formState.title}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <textarea
                            disabled={disabled}
                            name="body"
                            onChange={handleChange}
                            value={formState.body}
                        />
                    </div>
                    {showCommentBtnShow && (<button type="button" className="btn showComments" onClick={handleShowComments}>Show Comments</button>)}
                    {commentsOpen && (
                        <Comments postId={defaultValue} />
                    )}
                    {error && <div className="error">{error}</div>}
                    {disabled ? <button type="button" className="close" onClick={closeModal}>
                        Close
                    </button> : <button type="submit" className="btn" onClick={handleSubmit}>
                        Submit
                    </button>}
                </form>
            </div>
        </div>
    );
}

export default ModalPost