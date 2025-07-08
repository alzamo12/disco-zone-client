import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/shared/SocialLogin";

const Login = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/";

    const onSubmit = data => {
        // console.log(data)
        const { email, password } = data;
        signIn(email, password)
            .then(() => {
                navigate(from, { state: { from: "login" } })
            })
    }


    return (
        <div className="card-body w-full mx-auto space-y-5">
            <div className="space-y-2 md:space-y-4">
                <h2 className="card-title text-2xl md:text-5xl font-bold">Welcome Back</h2>
                <h4 className="card-title">Login with Zap Shift</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <fieldset className="fieldset">
                    {/* email */}
                    <label className="label">Email</label>
                    <input {...register("email", { required: true })} type="email" className="input input-neutral text-black w-full" placeholder="Email" />
                    {/* password */}
                    <label className="label">Password</label>
                    <input {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20
                    })} type="password" className="input input-neutral w-full text-black" placeholder="Password" />
                    {/* forgot password */}
                    <div><a className="link link-hover">Forgot password?</a></div>
                    {/* submit button */}
                    <button className="btn btn-neutral mt-4 border-0">Login</button>
                </fieldset>
                <p className="text-base font-light mt-2">Don't Have an Account? <Link className="text-[#8FA748] font-bold" to="/register">Register</Link></p>
            </form>
            <SocialLogin from={from} navigate={navigate} />
        </div>
    );
};

export default Login;