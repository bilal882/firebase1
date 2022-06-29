import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../Firebase/Firebase';

export default function Login() {
    const initialData = { email: "", password: "" };
    const [state, setState] = useState(initialData);
    const [users, setUsers] = useState("");


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setUsers("You Are Logged In Thanks For Log In", user.email)
                console.log("You are logged In");
            } else {
                console.log("You Are Not Log In Please Register To Login");
                return (
                    <div className="row text-center">
                        <div className="col">
                            <div className="card">
                                <form onSubmit={submitHandler}>
                                    <h2 className='text-center my-2'>Login Page</h2>
                                    <div className="card-body">
                                        <input type="email" onChange={handleChange} name="email" placeholder="Email" className='form-control my-3' />
                                        <input type="password" name="password" placeholder="Password" onChange={handleChange} className='form-control my-3' />
                                        <button className="btn btn-success w-100">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        });

    }, [])

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(state);
        const { email, password } = state;
        // const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setUsers(user.email)
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("You are Logged Out.");
        }).catch((error) => {
            console.error(error);
        });

    }
    // const [state, setState] = useState(initialData);
    return (
        <div className='login'>
            <div className="container">
                {
                    users ?
                        <div className="row">
                            <div className="col">
                                <h2 className='text-center'> {users} </h2><br /><br />
                                <button onClick={handleLogout} className="btn btn-danger text-center">Logout</button>
                            </div>
                        </div>
                        :

                        <div className="row text-center">
                            <div className="col">
                                <div className="card">
                                    <form onSubmit={submitHandler}>
                                        <h2 className='text-center my-2'>Login Page</h2>
                                        <div className="card-body">
                                            <input type="email" onChange={handleChange} name="email" placeholder="Email" className='form-control my-3' />
                                            <input type="password" name="password" placeholder="Password" onChange={handleChange} className='form-control my-3' />
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
