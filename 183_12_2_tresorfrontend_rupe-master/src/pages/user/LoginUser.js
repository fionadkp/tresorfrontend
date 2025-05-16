import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../comunication/FetchUser";

/**
 * LoginUser
 * @author Peter Rutschmann
 */
function LoginUser({ loginValues, setLoginValues }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(loginValues);
            console.log(response.message);
            setErrorMessage("");
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error.message);
            setErrorMessage("Login failed: Wrong email or password.");
        }
    };

    return (
        <div>
            <h2>Login user</h2>
            <form onSubmit={handleSubmit}>
                <section>
                    <aside>
                        <div>
                            <label>Email:</label>
                            <input
                                type="text"
                                value={loginValues.email}
                                onChange={(e) =>
                                    setLoginValues(prevValues => ({ ...prevValues, email: e.target.value }))}
                                required
                                placeholder="Please enter your email *"
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={loginValues.password}
                                onChange={(e) =>
                                    setLoginValues(prevValues => ({ ...prevValues, password: e.target.value }))}
                                required
                                placeholder="Please enter your password *"
                            />
                        </div>
                    </aside>
                </section>
                <button type="submit">Login</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default LoginUser;
