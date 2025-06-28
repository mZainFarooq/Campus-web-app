import {
  FaGraduationCap,
  FaBriefcase,
  FaGlobe,
  FaUserShield,
  FaRocket,
  FaUsers,
} from "react-icons/fa";
import Footer from "../components/common/Footer";
import svg from "/assets/landingpage.svg";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { auth } from "../routes/routes";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="bg-background text-text min-h-screen py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-heading leading-tight mb-6">
              Welcome to <span className="text-link">CampusApp</span>
            </h1>
            <p className="text-lg text-text mb-6">
              CampusApp is your one-stop solution for streamlining campus
              recruitments. Whether you're a student looking for your dream job,
              a company aiming to hire top talent, or an admin managing
              everything – CampusApp has got you covered.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <FaGraduationCap className="text-link text-xl" />
                <span className="text-sm">
                  Students can build professional profiles and apply for jobs
                  easily.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <FaBriefcase className="text-link text-xl" />
                <span className="text-sm">
                  Companies can post jobs and review applications with a smooth
                  dashboard experience.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <FaGlobe className="text-link text-xl" />
                <span className="text-sm">
                  Admin controls ensure platform quality, user safety, and
                  operational oversight.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <FaUserShield className="text-link text-xl" />
                <span className="text-sm">
                  Secure and verified access for all users to maintain a
                  trustworthy environment.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <FaRocket className="text-link text-xl" />
                <span className="text-sm">
                  Quick onboarding for both students and companies to get
                  started right away.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <FaUsers className="text-link text-xl" />
                <span className="text-sm">
                  Built for collaboration between institutions, recruiters, and
                  students.
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                value="Get Started"
                onClick={() => {
                  navigate(auth.login);
                }}
              />
            </div>
          </div>

          <div className="w-full h-full flex justify-center">
            <img
              src={svg}
              alt="CampusApp Illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
