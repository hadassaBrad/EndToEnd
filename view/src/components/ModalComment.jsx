import React, { useState } from 'react'

const ModalComment = ({ closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            name: "",
            body:"",
            email:""
        }
    );
    const [error, setError] = useState("");

    const validateForm = () => {
        if (formState.name||formState.email||formState.body) {
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

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") closeModal();
            }}
        >
            <div className="modal">
                <div>
                    {defaultValue && (<div className="form-group">
                        <label >Id:{formState.id}</label>
                    </div>)}

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formState.name}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <textarea
                            name="body"
                            onChange={handleChange}
                            value={formState.body}
                        />
                    </div>



                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="btn" onClick={handleSubmit}>
                        Submit
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ModalComment