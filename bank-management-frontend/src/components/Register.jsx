import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { register } from '../service/authService';
import './Register.css'; // Import the CSS file
import { Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password, phone });
            alert('Registration successful');
            navigate('/login');  // Redirect to homepage after successful registration
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <div>
      Already have an account? <Link to="/login">login</Link>
    </div>
        </div>
    );
}

export default Register;
