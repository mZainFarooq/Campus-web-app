import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "../../components/common/Button";
import { handleSignUpwithEmailandPassword } from "../../firebase/authHandling";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FullScreenLoader from "../../components/FullScreenLoader";

export const CompanySignUp = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      industry: "",
      email: "",
      password: "",
      role: "company",
    },
  });

  const onSubmit = (data) => {
    handleSignUpwithEmailandPassword(setLoading, data, dispatch);
  };

  return (
    <div className=" flex items-center justify-center px-6  bg-background">
      {loading && <FullScreenLoader />}
      <div className="backdrop-blur-lg bg-primary border border-border rounded-2xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-extrabold text-heading mb-6 text-center">
          Company Sign Up
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-text"
            >
              Company Name
            </label>

            <input
              id="companyName"
              type="text"
              {...register("companyName", {
                required: "Company Name is required",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="Tech Solutions"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-medium text-text"
            >
              Industry
            </label>
            <input
              id="industry"
              type="text"
              {...register("industry", {
                required: "Industry is required",
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="Information Technology"
            />
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1">
                {errors.industry.message}
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
              placeholder="company@example.com"
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
