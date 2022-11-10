import React from "react";
import { useForm } from "react-hook-form";
import "./JrnlForm.css";

function JrnlForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return(
    <>
    <input />
    </>
  )
}

export default JrnlForm;