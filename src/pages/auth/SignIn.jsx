import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "../../components/common/Button";
import { handleSignInwithEmailandPassword } from "../../firebase/authHandling";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FullScreenLoader from "../../components/FullScreenLoader";
import { Link } from "react-router-dom";
import { auth } from "../../routes/routes";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    handleSignInwithEmailandPassword(setLoading, data, dispatch);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      {loading && <FullScreenLoader />}
      <div className="backdrop-blur-lg bg-primary border border-border rounded-2xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-extrabold text-heading mb-6 text-center">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end items-center">
            <Link
              to={auth.forgotPassword}
              className="text-sm text-link hover:underline "
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            value="Sign In"
            rightIcon={<FaArrowRightLong />}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
