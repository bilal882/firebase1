import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../Firebase/Firebase';

export default function Login() {
    const initialData = { email: "", password: "" };
    const [state, setState] = useState(initialData);
    const [user, setUser] = useState("");


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setUser("You Are Logged In Thanks For Log In", user.email)
                console.log("You are logged In");
            } else {
                setUser("You are Logged Out")
                console.log("You Are Not Log In Please Register To Login");
            }
        });

    }, [])

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: [e.target.value] })
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
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // const [state, setState] = useState(initialData);
    return (
        <div className='login'>
            {
                user.email
                    ?
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2 className='text-center'> {user} </h2>
                                {/* <h2>Your UID is : {user} </h2> */}
                            </div>
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
    )
}
