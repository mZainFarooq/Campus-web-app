import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="backdrop-blur-lg bg-primary border border-border rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
        <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-heading mb-2">Page Not Found</h2>
        <p className="text-text mb-6">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button
          value="Go Back"
          className="w-full"
          leftIcon={<GoArrowLeft />}
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default NotFound;
