import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/photo-collage.png-removebg-preview.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios"; 
import { loginRoute } from '../utils/APIRoutes';

function Login() {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (handleValidation()) {
            try {
                const { username, password } = values;
                const { data } = await Axios.post(loginRoute, { username, password });
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                } else if (data.status === true) {
                    localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                    navigate('/loading');
                }
            } catch (error) {
                console.error('Error logging in user:', error);
                toast.error("Login failed. Please try again later", toastOptions);
            }
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        const { password, username } = values;
        
        if (password === "") {
            toast.error("Username and Password is required", toastOptions);
            return false;
        } else if (username === "") {
            toast.error("Username and Password is required", toastOptions);
            return false;
        } 
        return true;
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt='logo' />
                    </div>
                    <div className="container">
                        <input 
                            type='text' 
                            name='username' 
                            className="input" 
                            value={values.username} 
                            onChange={handleChange} 
                            required
                        />
                        <label className="label">Username</label>
                    </div>
                    <div className="container">
                        <input 
                            type='password' 
                            name='password' 
                            className="input" 
                            value={values.password} 
                            onChange={handleChange} 
                            required
                        />
                        <label className="label">Password</label>
                    </div>
                    <button type='submit' className='btn-donate'>Login</button>
                    <span>Don't have an account? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}
const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .brand {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: 7rem;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        .container {
            display: flex;
            flex-direction: column;
            gap: 7px;
            position: relative;
            color: white;
        }

        .label {
            font-size: 15px;
            padding-left: 10px;
            position: absolute;
            top: 13px;
            transition: 0.3s;
            pointer-events: none;
        }

        .input {
            width: 100%;
            height: 45px;
            border: none;
            outline: none;
            padding: 0px 7px;
            border-radius: 6px;
            color: #fff;
            font-size: 15px;
            background-color: transparent;
            box-shadow: 3px 3px 10px rgba(0,0,0,1),
            -1px -1px 6px rgba(255, 255, 255, 0.4);
        }

        .input:focus, .input:valid {
            border: 2px solid transparent;
            color: #fff;
            box-shadow: 3px 3px 10px rgba(0,0,0,1),
            -1px -1px 6px rgba(255, 255, 255, 0.4),
            inset 3px 3px 10px rgba(0,0,0,1),
            inset -1px -1px 6px rgba(255, 255, 255, 0.4);
        }

        .input:valid ~ .label, .input:focus ~ .label {
            transition: 0.3s;
            padding-left: 2px;
            transform: translateY(-35px);
        }

        .btn-donate {
            --clr-font-main: hsla(0, 0%, 20%, 1);
            --btn-bg-1: hsla(194, 100%, 69%, 1);
            --btn-bg-2: hsla(217, 100%, 56%, 1);
            --btn-bg-color: hsla(360, 100%, 100%, 1);
            --radii: 0.5em;
            cursor: pointer;
            padding: 0.9em 1.4em;
            min-width: 120px;
            min-height: 44px;
            font-size: var(--size, 1rem);
            font-family: "Segoe UI", system-ui, sans-serif;
            font-weight: 500;
            transition: 0.8s;
            background-size: 280% auto;
            background-image: linear-gradient(325deg, var(--btn-bg-2) 0%, var(--btn-bg-1) 55%, var(--btn-bg-2) 90%);
            border: none;
            border-radius: var(--radii);
            color: var(--btn-bg-color);
            box-shadow: 0px 0px 20px rgba(71, 184, 255, 0.5), 
                        0px 5px 5px -1px rgba(58, 125, 233, 0.25), 
                        inset 4px 4px 8px rgba(175, 230, 255, 0.5), 
                        inset -4px -4px 8px rgba(19, 95, 216, 0.35);
        }

        .btn-donate:hover {
            background-position: right top;
        }

        .btn-donate:is(:focus, :focus-visible, :active) {
            outline: none;
            box-shadow: 0 0 0 3px var(--btn-bg-color), 0 0 0 6px var(--btn-bg-2);
        }

        @media (prefers-reduced-motion: reduce) {
            .btn-donate {
                transition: linear;
            }
        }

        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4403ff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Login;
