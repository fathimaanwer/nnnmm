import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import your CSS file

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/login', {
                username,
                password
            });

            console.log('Login successful');
            // Reset the form fields (optional, depending on your UX flow)
            setUsername('');
            setPassword('');
        } catch (error) {
            alert('Login error:', error.message);
            // Handle login error (e.g., show error message to the user)
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
              <Link to="/Adminpage"><button>Submit</button></Link>
            </form>
        </div>
    );
}

export default LoginForm;
