import React from "react";
import { useForm } from "react-hook-form";
import { db } from "./../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";

function JrnlForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  async function createEntry(data, event) {
    event.preventDefault();
    const uid = v4();
    const createdAt = new Date().toISOString();
    console.log(data)
    await setDoc(doc(db, "jrnls", uid), {
      id: uid,
      userIdentifier: data.userId,
      content: data.content,
      createdAt: createdAt
    });
    reset({
      content: ""
    })
  }

  return(
    <>
      <div className="row align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="col-lg-6 col-md-10">
          <form>
            <input 
              type="text" 
              className={ `form-control form-control-lg text-light border-secondary ${ errors.userId && "is-invalid border-danger" }` }
              placeholder="identifier"
              { ...register("userId", { required: true }) }
            />

            <textarea
              type="text"
              rows="5"
              placeholder="note"
              className="mt-5 form-control form-control-lg text-light border-secondary"
              { ...register("content") }
            />

            <button onClick={ handleSubmit(createEntry) } className="btn btn-lg btn-outline-secondary mt-5 w-100">jrnl</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default JrnlForm;