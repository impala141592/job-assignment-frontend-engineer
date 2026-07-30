import { Link, useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";

export default function LoginRegister() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { login } = useAuth()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await login(email, password);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">
                {isLogin ? "Sign in" : "Sign up"}
              </h1>

              <p className="text-xs-center">
                {isLogin ? (
                  <Link to="/register">Need an account?</Link>
                ) : (
                  <Link to="/login">Have an account?</Link>
                )}
              </p>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                    />
                  </fieldset>
                )}

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  {isLogin ? "Sign in" : "Sign up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}