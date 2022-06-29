import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../Firebase/Firebase';

export default function Login() {
    const initialData = { email: "", password: "" };
    const [state, setState] = useState(initialData);
    const [users, setUsers] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsers(user)
                console.log(user);
            } else {
            }
        });

    }, [])
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const { email, password, name } = state;
        createUserWithEmailAndPassword(auth, email, password, name)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            setUsers({});
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <div className='login'>
            <div className="container">
                {
                    users.email ?
                        <div className="row">
                            <div className="col">
                                <h2 className='text-center'>You are Logged In and Your Email is : {users.email} </h2><br /><br />
                                <button onClick={handleLogout} className="btn btn-danger text-center">Logout</button>
                            </div>
                        </div>
                        :
                        <div className="row text-center">
                            <div className="col-12 col-md-6 offset-md-3 col-lg-8 md-2">
                                <div className="card">
                                    <form onSubmit={submitHandler}>
                                        <h2 className='text-center my-2'>Login Page</h2>
                                        <div className="card-body">
                                            <input type="email" onChange={handleChange} name="email" placeholder="Email" className='form-control my-3' required />
                                            <input type="password" name="password" placeholder="Password" onChange={handleChange} className='form-control my-3' required />
                                            <button className="btn btn-success w-100">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
