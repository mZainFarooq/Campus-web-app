import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { auth } from "../../routes/routes";
import Button from "../../components/common/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import { auth as firebaseAuth } from "../../firebase/config";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      toast.success(
        "📬 If an account with this email exists, you'll receive a reset link shortly."
      );
      reset();
    } catch (error) {
      console.error("Reset error:", error.message);
      toast.error("❌ " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="backdrop-blur-lg bg-primary border border-border rounded-2xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-extrabold text-heading mb-6 text-center">
          Forgot Password
        </h2>
        <p className="text-sm text-text text-center mb-6">
          Enter your email and we&apos;ll send you a password reset link.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              className={`mt-1 w-full px-4 py-3 rounded-lg bg-input border ${
                errors.email ? "border-red-500" : "border-border"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            value={isSubmitting ? "Sending..." : "Reset Password"}
            disabled={isSubmitting}
            rightIcon={<FaArrowRightLong />}
            className="w-full"
          />
        </form>

        <p className="mt-6 text-sm text-text text-center">
          Remember your password?{" "}
          <Link
            to={auth.login}
            className="text-link font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
