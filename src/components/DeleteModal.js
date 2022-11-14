import React from "react";
import { useForm } from "react-hook-form";
import { db } from "./../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteModal(props) {
  const { register, handleSubmit } = useForm();
  const { setOpenDeleteModal, selectedEntry, setReload } = props;

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenDeleteModal(null);
    }
  }

  async function deleteEntry(data) {
    const entry = doc(db, "jrnls", data.entryId);
    await deleteDoc(entry);
    setOpenDeleteModal(false);
    setReload(prev => !prev);
  };

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-danger p-3 no-shadow">
        <h4 className="text-danger">destroy entry</h4>
        <p>Once you have destroyed this entry, there is no going back. Be sure of that.</p>
        <form>
          <input 
            type="hidden" 
            value={ selectedEntry }
            { ...register("entryId", { required: true }) }
          />
          <div className="input-group mb-3">
              <button onClick={handleSubmit(deleteEntry)} className="btn btn-outline-danger mt-2 w-100 no-shadow">destroy</button>
          </div>
        </form>
       
      </div>
    </div>
  )
};

export default DeleteModal;