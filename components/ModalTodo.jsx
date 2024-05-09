import React, { useState } from "react";

import "../css/modal.css";

const ModalTodo = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      title: "",
      completed: false
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.title) {
      setErrors("");
      return true;
    } else {
      setErrors("title");
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]:e.target.name=="completed"?e.target.checked: e.target.value });
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
            <label htmlFor="completed">Completed</label>
            <input
            className="completeModal"
              name="completed"
              type="checkbox"
              checked={formState.completed == true ? true : false}
              onChange={handleChange}
            />
          </div>

          {errors && <div className="error">{`Please enter: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}
export default ModalTodo