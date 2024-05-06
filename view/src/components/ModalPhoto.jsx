import React, { useState } from 'react'
import "../css/modal.css";


const ModalPhoto = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      title: "",
      url: "",
      thumbnailUrl: ""
    }
  );
  const [error, setError] = useState("");

  const validateForm = () => {
    if (formState.title || formState.url || formState.thumbnailUrl) {
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
        <form>
          {defaultValue && (<div className="form-group">
            <label >Id:{formState.id}</label>
          </div>)}

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={formState.title}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Url</label>
            <input
              type="text"
              name="url"
              onChange={handleChange}
              value={formState.url}
            />
          </div>

          <div className="form-group">
            <label htmlFor="thumbnailUrl">Thumbnail Url</label>
            <input
              type="text"
              name="thumbnailUrl"
              onChange={handleChange}
              value={formState.thumbnailUrl}
            />
          </div>

          {error && <div className="error">{{ error }}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

export default ModalPhoto