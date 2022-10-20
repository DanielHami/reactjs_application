
export default function Login() {


    return(
        <div>
        <div className="text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p>Please login to proceed</p>
        </div>
        <form className="flex flex-col w-1/3 mx-auto p-8 border-2">
            <label> Add your email</label>
            <input className="border-2"></input>
            <label>Password</label>
            <input className="border-2"></input>
            <button className="border-2 mt-5 bg-blue-500 text-white p-2">Submit</button>
        </form>
        </div>
    )
}