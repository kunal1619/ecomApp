import { Link, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { signUpUserInfoAsync } from "../authSlice";
import { selectCreatedUser } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";



export function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const user = useSelector(selectCreatedUser)

  const onSubmit = data => {
    dispatch(signUpUserInfoAsync({
      email:data.email, password:data.password, domain : data.role, address : []
    }))
console.log(data);
  };

console.log(user);

  return (
   <>
   {user && <Navigate to={'/'} replace={true}></Navigate>}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            SignUp to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <span className="text-red-600">Email is required</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <span className="text-red-600">Password is required</span>}
              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 Confirm Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="confPassword"
                  name="confPassword"
                  type="password"
                  autoComplete="current-password"
                  {...register("confirmPassword", { required: true , validate : (value, formValues)=> value === formValues.password || 'password not matching'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confPassword && <span className="text-red-600">Password is required</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 Role
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="role"
                  name="role"
                  type="text"
                  autoComplete="current-password"
                  defaultValue={'admin'}
                  {...register("role", { required: true , validate : (value, formValues)=> value === formValues.role || 'password not matching'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.role && <span className="text-red-600">Role is required</span>}
              </div>
            </div>

            <div>
            {/* <Link to={'/'}> */}
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

              >
                Sign up
              </button>
            {/* </Link> */}
             
            </div>
          </form>
 
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account{' '}
            <Link to="/login">
            <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
            </button>
            </Link>
           
          </p>
        </div>
      </div>
   </>
  )
}
