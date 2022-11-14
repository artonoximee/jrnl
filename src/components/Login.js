import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "./../contexts/AuthContext";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { logIn, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/create");
    }
  }, []);

  async function submitLogIn(data) {
    try {
      setError("");
      setLoading(true);
      await logIn(data.email, data.password);
      navigate("/create");
    } catch (err) {
      setError("Échec de la connexion");
    }
    setLoading(false);
  }

  return (
    <div className="row justify-content-center align-items-center" style={{minHeight: "100vh"}}>
      <div className="col-lg-3 col-md-12">
        { error && <div className="alert alert-danger text-danger bg-dark border-danger mt-1">💥 { error }</div> }

        <form>
          <input 
            type="email"
            id="email"
            className={ `form-control text-light border-secondary ${ errors.email && "is-invalid border-danger" }` }
            placeholder="email"
            { ...register("email", { required: true, pattern: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i }) }
          />
          { errors.email && <div className="form-text text-danger">Merci de renseigner votre adresse email pour vous connecter</div> }

          <input 
            type="password"
            id="password"
            className={ `form-control text-bg-dark border-secondary mt-4 ${ errors.password && "is-invalid border-danger" }` }
            placeholder="password"
            { ...register("password", { required: true, minLength: 6 }) }
          />
          { errors.password && <div className="form-text text-danger">Votre mot de passe doit au minimum contenir 6 caractères.</div> }
          
          <div className="d-grid gap-2">
            <button className={ `btn mt-5 btn-outline-secondary` } onClick={ handleSubmit(submitLogIn) } disabled={ loading } type="submit"><i className="fa-solid fa-right-to-bracket"></i></button>
          </div>
        </form>

        <div className=" bottom-margin"></div>
      </div>
    </div>
  )
}

export default Login;