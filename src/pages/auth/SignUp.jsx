import { useState } from "react";
import { StudentSignUp } from "../student/StudentSignUp";
import { CompanySignUp } from "../company/CompanySignUp";

const SignUp = () => {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="bg-background  py-12 flex items-start justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("student")}
            className={`px-6 py-2 rounded-t-lg font-semibold ${
              activeTab === "student"
                ? "bg-primary text-heading border-b-2 border-indigo-500"
                : "bg-muted text-text hover:bg-muted/80"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`px-6 py-2 rounded-t-lg font-semibold ${
              activeTab === "company"
                ? "bg-primary text-heading border-b-2 border-indigo-500"
                : "bg-muted text-text hover:bg-muted/80"
            }`}
          >
            Company
          </button>
        </div>
        <div>
          {activeTab === "student" ? <StudentSignUp /> : <CompanySignUp />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
