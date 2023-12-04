import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
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

    return <form id="login" onSubmit={handle_submit}>
        <h2>Please enter your login information</h2>
        <label htmlFor="username">Email: </label>
        <input type="text" id="email" name="email" required />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" required  />
        <div className="offset-1">
            <button className="btn" type="submit">Login</button>
        </div>
        <p className="error">{error}</p>
    </form>;
}

export default Login;
