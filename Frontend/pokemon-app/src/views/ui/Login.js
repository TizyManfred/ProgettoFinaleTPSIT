import React, { useState, useEffect } from "react";
import userIcon from "../../assets/img/user.svg";
import passwordIcon from "../../assets/img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useLocation } from 'react-router-dom';
axios.defaults.withCredentials = true; 


// Funzione di validazione
const validate = (data) => {
  const errors = {};

  if (!data.username) {
    errors.username = "Username is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const location = useLocation();
  const accesso = new URLSearchParams(location.search).get('accesso');

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data));
  }, [data, touched]);

  const checkData = async (obj) => {
    const { username, password } = obj;
    try {
      const response = await toast.promise(
        axios.post('http://localhost:50000/api/login', { username, password }),
        {
          pending: "Loading your data...",
          success: "You logged in to your account successfully",
          error: "Something went wrong!",
        }
      );

      if (response.data.ok) {
        //notify("You logged in to your account successfully", "success");
      } else {
        notify("Your username or password is incorrect", "error");
      }
    } catch (error) {
      notify("Something went wrong!", "error");
    }
  };

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      checkData(data);
    } else {
      notify("Please check the fields again", "error");
      setTouched({
        username: true,
        password: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        {accesso && <p>Per visualizzare il contenuto della pagina, devi prima effettuare l'accesso.</p>}
        <h2>Sign In</h2>
        <div>
          <div className={errors.username && touched.username ? styles.unCompleted : !errors.username && touched.username ? styles.completed : undefined}>
            <input type="text" name="username" value={data.username} placeholder="Username" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={userIcon} alt="" />
          </div>
          {errors.username && touched.username && <span className={styles.error}>{errors.username}</span>}
        </div>
        <div>
          <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <div>
          <button type="submit">Login</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Don't have an account? <Link to="/signup">Create account</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
