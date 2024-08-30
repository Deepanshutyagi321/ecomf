import axios from "axios";
import { useState } from "react"
import Layout from "./Layout"
export default function register() {
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        email: '',
        avatar: '',
        password: ''
    });

    const [loading, setLoading] = useState(false); // Add loading state

    const formHandler = function (event) {
        setFormData((curr) => ({
            ...curr,
            [event.target.name]: event.target.name === 'avatar' ? event.target.files[0] : event.target.value
        }));
    }

    async function submit(event) {
        event.preventDefault();
        try {
            setLoading(true); // Set loading state
            const formDataObj = new FormData();
            formDataObj.append('username', formData.username);
            formDataObj.append('fullname', formData.fullname);
            formDataObj.append('email', formData.email);
            formDataObj.append('avatar', formData.avatar);
            formDataObj.append('password', formData.password);

            await axios({
                method: 'post',
                url: `/api/register`,
                data: formDataObj
              });
            // Provide feedback to the user (e.g., redirect or display a success message)
        } catch (err) {
            console.error(err);
            // Provide feedback to the user (e.g., display an error message)
        } finally {
            setLoading(false); // Reset loading state
        }
    }
    return (
        <div>
            <Layout/>
        <div className="row">
            <div className="col-8 offset-2">
                <h3>Register</h3>
                <form onSubmit={submit} noValidate>
                    <label htmlFor="username" className="form-label">Username</label>

                    <input
                        className="form-control"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={formHandler}
                        required
                    />
                    <label htmlFor="fullname" className="form-label">Fullname</label>

                    <input
                        className="form-control"
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={formHandler}
                    />
                    <label htmlFor="email" className="form-label">Email</label>

                    <input
                        className="form-control"
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={formHandler}
                        required

                    />
                    <label htmlFor="avatar" className="form-label">Avatar</label>

                    <input
                        className="form-control"
                        type="file"
                        id="avatar"
                        name="avatar"
                        
                        onChange={formHandler}
                        required

                    />
                    <label htmlFor="password" className="form-label">Password</label>

                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={formHandler}
                        required

                    />
            <button className="btn success">submit</button>
            {console.log(formData)}
                </form>
            </div>
        </div>
        </div>

    )
}