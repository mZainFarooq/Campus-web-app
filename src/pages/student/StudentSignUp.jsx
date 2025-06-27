import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "../../components/common/Button";
import { handleSignUpwithEmailandPassword } from "../../firebase/authHandling";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FullScreenLoader from "../../components/FullScreenLoader";

export const StudentSignUp = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = (data) => {
    handleSignUpwithEmailandPassword(setLoading, data, dispatch);
  };

  return (
    <div className="flex items-center justify-center px-6 bg-background">
      {loading && <FullScreenLoader />}
      <div className="backdrop-blur-lg bg-primary border border-border rounded-2xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-extrabold text-heading mb-6 text-center">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-text"
            >
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              {...register("fullname", {
                required: "Full Name is required",
                minLength: {
                  value: 6,
                  message: "Full Name must be at least 6 characters",
                },
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="John Doe"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-text"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
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
              id="password"
              type="password"
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
          <Button
            type="submit"
            value="Sign Up"
            rightIcon={<FaArrowRightLong />}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};
