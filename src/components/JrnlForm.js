import React from "react";
import { useForm } from "react-hook-form";
import "./JrnlForm.css";

function JrnlForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return(
    <>
    <div className="row align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="col-lg-6 col-md-10">
        <form>
          <input 
            type="text" 
            className="form-control form-control-lg text-light border-secondary"
            placeholder="identifier"
          />

          <textarea
            type="text"
            rows="5"
            placeholder="note"
            className="mt-5 form-control form-control-lg text-light border-secondary"
          />

          <button className="btn btn-lg btn-outline-secondary mt-5 w-100">jrnl</button>
        </form>
      </div>
    </div>
    
    </>
  )
}

export default JrnlForm;