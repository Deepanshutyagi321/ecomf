import axios from "axios";
import { useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [login, setLogin] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);  // Loading state
    const navigate = useNavigate();  // Use useNavigate hook

    const loginhandle = (event) => {
        setLogin((curr) => ({
            ...curr,
            [event.target.name]: event.target.value,
        }));
    };

    const submit = async (event) => {
        event.preventDefault();
        setLoading(true);  // Start loading

        try {
            const response = await axios.post("/api/login", login);
            const { accessToken, refreshToken } = response.data.data;
            
            if (accessToken && refreshToken) {
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                navigate("/");  // Navigate after successful login
            }
        } catch (err) {
            alert("Username or password is incorrect");
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div>
            <Layout/>
            {loading ? (
                <div className="loader">Loading...</div>  // Display loader while loading
            ) : (
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            onChange={loginhandle}
                            value={login.username}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={login.password}
                            onChange={loginhandle}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}
