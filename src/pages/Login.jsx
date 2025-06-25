import Lottie from "lottie-react";
import React from "react";
import login from "../assets/Animation - 1749186933918.json";
import { useAllContext } from "../context/AllContext";
import Swal from "sweetalert2";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();
  const { createuserlogin, googlepopup } = useAllContext();
  const handlelogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
    console.log("data", data);
    const { email, password } = data;
    createuserlogin(email, password)
      .then((result) => result.user)
      .then((user) => {
        navigate(from);
        console.log(user);
        form.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "login Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleLogin = () => {
    googlepopup()
      .then((res) => {
        console.log(res);
        toast.success("Google login successfully!");
        navigate("/");
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-1/2">
          <Lottie animationData={login} loop={true}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="flex w-full flex-col">
              <div className="card bg-base-300 rounded-box grid ">
                <form onSubmit={handlelogin}>
                  <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input"
                      placeholder="Email"
                    />
                    <label className="label">Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                      name="password"
                    />
                    <div>
                      <a className="link link-hover">Forgot password?</a>
                    </div>
                    <button className="btn btn-neutral mt-4">Login</button>
                  </fieldset>
                </form>
              </div>
              <div className="divider">OR</div>
              <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
                <button
                  className="btn btn-outline btn-primary w-full mb-2"
                  onClick={handleGoogleLogin}
                  type="button"
                >
                  <svg className="w-5 h-5 mr-2 inline" viewBox="0 0 48 48">
                    <g>
                      <path
                        fill="#4285F4"
                        d="M24 9.5c3.54 0 6.73 1.22 9.24 3.23l6.91-6.91C36.68 2.13 30.7 0 24 0 14.82 0 6.71 5.1 2.69 12.44l8.06 6.26C12.7 13.13 17.9 9.5 24 9.5z"
                      />
                      <path
                        fill="#34A853"
                        d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.91-2.18 5.38-4.66 7.04l7.19 5.6C43.98 37.13 46.1 31.34 46.1 24.5z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.75 28.7c-1.09-3.22-1.09-6.68 0-9.9l-8.06-6.26C.89 16.13 0 19.01 0 22c0 2.99.89 5.87 2.69 8.46l8.06-6.26z"
                      />
                      <path
                        fill="#EA4335"
                        d="M24 44c6.7 0 12.68-2.13 17.15-5.89l-7.19-5.6c-2.01 1.35-4.58 2.14-7.46 2.14-6.1 0-11.3-3.63-13.25-8.7l-8.06 6.26C6.71 42.9 14.82 48 24 48z"
                      />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </g>
                  </svg>
                  Continue with Google
                </button>

                <p className="mt-2 text-sm text-center">
                  Don't have an account?{" "}
                  <NavLink to="/signup" className="link link-primary">
                    Register
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
