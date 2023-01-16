/* eslint no-useless-escape: 0 */

import { useForm } from "react-hook-form";
import { login } from "actions";
import { githubLogin } from "actions";
import {Navigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import onlyGuest from "components/hoc/onlyGuest";

 const Login = () => {

    const { register, handleSubmit} = useForm()
    const [redirection, setRedirection] = useState(false)

    const loginHandle = (data) => {
      login(data)
        .then(() => setRedirection(true), errorMessage => toast.error(errorMessage))
    }

    const loginHandleGithub = () => {
        githubLogin()
          .then(() => setRedirection(true), errorMessage => toast.error(errorMessage))
      }
    if(redirection) {
        return <Navigate to="/"></Navigate>
        
    }

    return (
        <div>
            <div className="text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p>Please login to proceed</p>
            </div>
            <form
                onSubmit = {handleSubmit(loginHandle)}
                className="flex flex-col w-1/3 mx-auto p-8 border-2">
                <label> Add your email</label>
                <input {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} className="border-2"></input>
                <label>Password</label>
                <input type="password" autoComplete="password"  {...register('password', { required: true, minLength: 8, pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i })} className="border-2"></input>
                <button type="submit" className="border-2 mt-5 bg-blue-500 text-white p-2">Submit</button>
                <button onClick={loginHandleGithub}>Login with GitHub</button>
            </form>
            <div>
              <Toaster/>
            </div>
        </div>
    )
}

export default onlyGuest(Login)