import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../signup/signup-style.css';

function Login( {setIsLoggedIn}) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const loginUrl = 'http://127.0.0.1:8000/api/token/';

    function handle_submit(event) {
        let data = new FormData(event.target);

        fetch(loginUrl, {
            method: "POST",
            body: data,
        })
        .then(request => request.json())
        .then(json => {
            if ('access' in json) {
                localStorage.setItem('access', json.access);
                localStorage.setItem('email', data.get('email'));
                setIsLoggedIn(true);
                navigate('/');
            }
            else if ('detail' in json) {
                setError(json.detail);
            }
            else {
                setError("Unknown error while signing in.")
            }
        })
        .catch(error => {
            setError(error);
        });

        event.preventDefault();
    }

    const bootstrapCSS = (
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
      );

    return (
    <>
        {bootstrapCSS}
       
        <div className="container-sm" id="form-auth">
            <form id="login-form" onSubmit={handle_submit} className="signup-form">
            <h2 id="create-your-account">Login</h2>
            <div className="form-group">
                <input type="text" id="email" placeholder="email" className="form-control" name="email" required/>
            </div>
            <div className="form-group">
                <input className="form-control" placeholder="password" type="password" id="password" name="password" required  />
            </div>
            <div className="form-group">
                <button className="btn btn-success btn-block" id="submit-button" type="submit">Login</button>
            </div>
            <p className="error">{error}</p>
            </form>

        </div>
     

    </>
    )
}

export default Login;
