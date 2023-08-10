import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    });

    const { first_name, last_name, username, email, password } = data;


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const button = document.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = 'Loading...';

        if (first_name && last_name && username && email && password) {
            const user_data = new FormData();
            user_data.append('first_name', first_name);
            user_data.append('last_name', last_name);
            user_data.append('username', username);
            user_data.append('email', email);
            user_data.append('password', password);
            
            axios.post('http://localhost:8000/api/auth/register/', user_data)
            .then((res) => {

                button.disabled = false;
                button.textContent = 'Success';
                console.log(res.data);

                setTimeout(() => {
                    navigate('/signin');
                }, 1000);
            })
            .catch((err) => {
                button.disabled = false;
                button.textContent = 'Failed';
                setTimeout(() => {
                    button.textContent = 'Sign Up';
                }, 2000);
                console.log(err);
            });
        }
        
    };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Instagram</h2>
        <form onSubmit={handleSubmit}>
          <input type="text"
            placeholder="First Name"
            name='first_name'
            value={first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name='last_name'
            value={last_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Username"
            name='username'
            value={username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={password}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/signin">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
