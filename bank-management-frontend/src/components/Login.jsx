import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { login } from '../service/authService';
import './Login.css'; // Import the CSS file
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            onLogin(response.data.data.token);  // Assuming the token is in response.data.data.token
            navigate('/home');  // Redirect to the homepage
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div>
      Not registered yet? <Link to="/register">register</Link>
    </div>
        </div>
    );
}

export default Login;
