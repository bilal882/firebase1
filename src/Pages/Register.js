import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/Firebase';

export default function Register() {
    const initialData = { email: "", password: "" };
    const [state, setState] = useState(initialData);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(state);
        const { email, password } = state;
        // const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // const [state, setState] = useState(initialData);
    return (
        <div className='login'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <form onSubmit={submitHandler}>
                                <h2 className='text-center my-2'>Register Page</h2>
                                <div className="card-body">
                                    <input type="email" onChange={handleChange} name="email" placeholder="Email" className='form-control my-3' />
                                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className='form-control my-3' />
                                    <button className="btn btn-success w-100">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
