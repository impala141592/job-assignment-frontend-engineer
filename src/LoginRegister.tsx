import { Link, useLocation } from "react-router-dom";

export default function LoginRegister() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

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

              <form>
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
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>

                <button className="btn btn-lg btn-primary pull-xs-right">
                  {isLogin ? "Sign in" : "Sign up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            conduit
          </Link>

          <span className="attribution">
            An interactive learning project from{" "}
            <a href="https://thinkster.io">
              Thinkster
            </a>
            . Code &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}