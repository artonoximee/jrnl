import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";

function JrnlForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function createEntry(data, event) {
    event.preventDefault();
    const uid = v4();
    const createdAt = new Date().toISOString();
    console.log(data)
    await setDoc(doc(db, "jrnls", uid), {
      id: uid,
      userId: currentUser.uid,
      content: data.content,
      createdAt: createdAt
    });
    reset({
      content: ""
    })
  }

  async function handleLogOut() {
    try {
      await logOut();
      navigate("/");
    } catch {
    }
  }

  return(
    <>
      <div className="row align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="col-lg-6 col-md-10">
          <form>
            <input
              type="text"
              rows="5"
              placeholder="note"
              className={ `mt-5 form-control text-light border-secondary ${ errors.content && "is-invalid border-danger" } ` }
              { ...register("content", { required: true }) }
            />

            <button onClick={ handleSubmit(createEntry) } className="btn btn-outline-secondary mt-5 mb-5 w-100">jrnl</button>
          </form>

          <div className="row">
            <div className="col">
              <Link to="/read" className="btn btn-outline-secondary mt-5 w-100">read</Link>
            </div>
            <div className="col">
              <button onClick={ handleLogOut } className="btn btn-outline-secondary mt-5 w-100">logout</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default JrnlForm;