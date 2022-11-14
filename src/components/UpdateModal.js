import React from "react";
import { useForm } from "react-hook-form";
import { db } from "./../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

function UpdateModal(props) {
  const { setOpenUpdateModal, selectedEntry, setReload } = props;

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { content: selectedEntry.content }
  });

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenUpdateModal(false);
    }
  }

  async function updateEntry(data) {
    await updateDoc(doc(db, "jrnls", selectedEntry.id), {
      content: data.content
    });
    setOpenUpdateModal(false);
    setReload(prev => !prev);
  }

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-secondary p-3 no-shadow">
        <h4 className="">update entry</h4>
        <form>
          <textarea 
            type="text"
            id="name"
            rows="5"
            className={ `form-control text-light w-100 ${ errors.content && "is-invalid border-danger" }` }
            placeholder="content"
            { ...register("content", { required: true }) }
          />
          { errors.content && <div className="form-text text-danger">enter content</div> }

          <button className="btn btn-outline-secondary no-shadow w-100 mt-4 mb-2" onClick={ handleSubmit(updateEntry) } type="submit">Modifier le projet</button>
        </form>
      </div>
    </div>
  )
};

export default UpdateModal;