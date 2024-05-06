import React,{useState} from 'react'
import "../css/modal.css";

const ModalAlbum = ({ closeModal, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    
      const validateForm = () => {
        if (title) {
          setError("");
          return true;
        } else {
          setError("title");
          return false;
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) 
          return;
        onSubmit(title);
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
            <h2>Add new album:</h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={(e)=>setTitle(e.target.value)}
              value={title}
            />
          </div>

          {error && <div className="error">{`Please enter: ${error}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

export default ModalAlbum