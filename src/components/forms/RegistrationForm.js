/* eslint no-useless-escape: 0 */

import { useForm } from "react-hook-form";
import { validImage,validUrl, samePassword } from "validators/ValidatorComponents";

export default function RegistrationForm(props) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    
    return (
        <div>
            <div className="text-center">
                <h1 className="text-2xl font-bold">Register</h1>
                <p>Please register to proceed</p>
            </div>
            <form onSubmit={handleSubmit(props.onRegister)} className="flex flex-col w-1/3 mx-auto p-8 border-2">
                <label> Add your email</label>
                <input
                    {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
                    type="email"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    className="border-2"></input>
                {
                    errors.email && <div>
                         {errors.email.type === 'required' && <span className="text-red-500">Email is required</span>} 
                         {errors.email.type ==='pattern' && <span className="text-red-500">Email is not correct</span>}
                        </div>
                }
                <label> Full name</label>
                <input
                    type="text"
                    {...register('fullname', { required: true, maxLength: 20 })}
                    aria-invalid={errors.firstName ? "true" : "false"}
                    className="border-2"></input>
                {
                    errors.fullname && <div>
                         {errors.fullname.type === 'required' && <span className="text-red-500">Full name is required</span>} 
                         {errors.fullname.type ==='maxLength' && <span className="text-red-500">Full name is to length</span>}
                        </div>
                }
                <label>Avatar</label>
                <input
                    type="text"
                    {...register("avatar", { required: true, validate: {validImage, validUrl} })}
                    aria-invalid={errors.firstName ? "true" : "false"}
                    className="border-2"></input>
                {
                    errors.avatar && <div>
                         {errors.avatar.type === 'required' && <span className="text-red-500">Avatar is required</span>} 
                         {errors.avatar.type ==="validImage" && <span className="text-red-500">Avatar is not valid</span>}
                         {errors.avatar.type ==="validUrl" && <span className="text-red-500">URL is not valid</span>}
                        </div>
                }
                <label>Password</label>
                <input
                    type="password"
                    {...register('password', { required: true, minLength: 8, pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i })}
                    aria-invalid={errors.firstName ? "true" : "false"}
                    autoComplete="password"
                    className="border-2"></input>
                 {
                    errors.password && <div>
                         {errors.password.type ==='required' && <span className="text-red-500">Password is required</span>}
                         {errors.password.type === 'pattern' && <span className="text-red-500">Password is not correct</span>} 
                         {errors.password.type === 'minLength' && <span className="text-red-500">Password is too short</span>}
                        </div>
                }
                <label>Repeat password</label>
                <input
                    type="password"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    {...register('samepass', { required: true, minLength: 8, validate: {samePassword: samePassword(getValues, 'password')}})}
                    autoComplete="password"
                    className="border-2"></input>
                {
                    errors.samepass && <div>
                         {errors.samepass.type === 'required' && <span className="text-red-500">Password is required</span>} 
                         {errors.samepass.type ==='pattern' && <span className="text-red-500">Email is too short </span>}
                         {errors.samepass.type ==='samePassword' && <span className="text-red-500">Email is not same</span>}
                        </div>
                }
                <button
                    type="submit"
                    className="border-2 mt-5 bg-blue-500 p-2 text-white">Submit</button>
            </form>

        </div>
    )
}