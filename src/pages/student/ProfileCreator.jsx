import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useFieldArray, useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { handleupdateUserData } from "../../firebase/authHandling";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import FullScreenLoader from "../../components/FullScreenLoader";

const StepZero = ({ register, errors, userData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-heading">
        {userData?.role === "company"
          ? "Company Profile"
          : "Create Your Profile"}
      </h2>

      {userData?.role === "company" ? (
        <>
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
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="Tech Solutions Inc."
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
              placeholder="IT, Finance, etc."
            />
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1">
                {errors.industry.message}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
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
              htmlFor="tagline"
              className="block text-sm font-medium text-text"
            >
              Tagline
            </label>
            <input
              id="tagline"
              type="text"
              {...register("tagline", {
                required: "Tagline is required",
                minLength: {
                  value: 8,
                  message: "Tagline must be at least 8 characters",
                },
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="About Your Passion or Title your Skill"
            />
            {errors.tagline && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tagline.message}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const StepOne = ({
  userData,
  skillInput,
  setSkillInput,
  addSkill,
  filteredSkills,
  fields,
  remove,
  errors,
  addRole,
}) => {
  const suggestedRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Marketing",
    "QA Engineer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Manager",
    "Mobile Developer",
    "Data Scientist",
    "DevOps Engineer",
    "CTO",
    "HR",
    "Flutter Developer",
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-heading">
        {userData?.role === "company"
          ? "Roles You’re Hiring For"
          : "Your Skills"}
      </h2>

      <div>
        <input
          type="text"
          placeholder={
            userData?.role === "company"
              ? "Type a role you’re hiring for"
              : "Search or type to add skill"
          }
          className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              userData?.role === "company"
                ? addRole(skillInput)
                : addSkill(skillInput);
            }
          }}
        />
        {errors.skills && userData?.role === "student" && (
          <p className="text-red-500 text-sm mt-2">{errors.skills.message}</p>
        )}
        {errors.hiringRoles && userData?.role === "company" && (
          <p className="text-red-500 text-sm mt-2">
            {errors.hiringRoles.message}
          </p>
        )}
      </div>

      {userData?.role === "company" && (
        <div className="flex flex-wrap gap-2 mt-2">
          {suggestedRoles.map((role) => (
            <button
              type="button"
              key={role}
              onClick={() => addRole(role)}
              className="px-3 py-1 bg-gray-200 text-black text-sm rounded-full hover:bg-indigo-100 transition"
            >
              {role}
            </button>
          ))}
        </div>
      )}

      {userData?.role === "student" && (
        <div className="flex flex-wrap gap-2">
          {filteredSkills.map((skill) => (
            <button
              type="button"
              key={skill}
              onClick={() => addSkill(skill)}
              className="px-3 py-1 bg-gray-200 text-black text-sm rounded-full hover:bg-indigo-100 transition"
            >
              {skill}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm"
          >
            <span>{field.value}</span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-white"
            >
              <FaTimes size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const StepTwo = ({ userData, register, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-heading">
        {userData?.role === "company" ? "Company Info" : "Education"}
      </h2>

      {userData?.role === "student" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text">
              Highest Qualification
            </label>
            <input
              {...register("education.qualification", {
                required: "This Field is Required",
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading"
              placeholder="e.g. BS Computer Science"
            />
            {errors.education?.qualification && (
              <p className="text-red-500 text-sm">
                {errors.education.qualification.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text">
              Institute Name
            </label>
            <input
              {...register("education.institute", {
                required: "This Field is Required",
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading"
              placeholder="e.g. NUST, FAST, etc"
            />
            {errors.education?.institute && (
              <p className="text-red-500 text-sm">
                {errors.education.institute.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text">
              Passing Year
            </label>
            <input
              type="number"
              {...register("education.year", {
                required: "This field is required",
                min: {
                  value: 1950,
                  message: "Year must be between 1950 and 2024",
                },
                max: {
                  value: 2024,
                  message: "Year cannot be greater than 2024",
                },
                validate: {
                  lengthCheck: (value) =>
                    value.toString().length === 4 || "Year must be 4 digits",
                },
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading"
              placeholder="e.g. 2023"
            />
            {errors.education?.year && (
              <p className="text-red-500 text-sm">
                {errors.education.year.message}
              </p>
            )}
          </div>
        </div>
      )}

      {userData?.role === "company" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text">
              Company Location
            </label>
            <input
              {...register("location", {
                required: "Location is required",
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading"
              placeholder="e.g. Karachi, Pakistan"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text">
              Company Size
            </label>
            <select
              {...register("employees", {
                required: "Company size is required",
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading"
              defaultValue=""
            >
              <option value="" disabled>
                Select Company Size
              </option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
            {errors.employees && (
              <p className="text-red-500 text-sm">{errors.employees.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const StepThree = ({ register, errors, userData }) => {
  return (
    <div className="space-y-6">
      {userData?.role === "student" && (
        <>
          <h2 className="text-2xl font-semibold text-heading">About You</h2>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Write about yourself
            </label>
            <textarea
              {...register("aboutMe.about", {
                required: "This field is required",
                maxLength: {
                  value: 500,
                  message: "Cannot exceed 500 characters",
                },
              })}
              rows={5}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading"
              placeholder="Describe yourself here..."
            ></textarea>
            {errors.aboutMe?.about && (
              <p className="text-red-500 text-sm mt-1">
                {errors.aboutMe.about.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              What kind of job you're looking for?
            </label>
            <input
              type="text"
              {...register("aboutMe.jobType", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "Job title must be at least 3 characters",
                },
                maxLength: {
                  value: 18,
                  message: "Job title must be less than 18 characters",
                },
              })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading"
              placeholder="e.g. Frontend Developer, Backend Engineer..."
            />
            {errors.aboutMe?.jobType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.aboutMe.jobType.message}
              </p>
            )}
          </div>
        </>
      )}

      {userData?.role === "company" && (
        <>
          <h2 className="text-2xl font-semibold text-heading">
            Company Overview
          </h2>

          <div>
            <label className="block text-sm font-medium text-text">
              About Your Company
            </label>
            <textarea
              {...register("aboutCompany", {
                required: "This field is required",
                minLength: {
                  value: 30,
                  message: "At least 30 characters required",
                },
              })}
              rows={5}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="Write about your mission, values, and what makes your company unique"
            />
            {errors.aboutCompany && (
              <p className="text-red-500 text-sm mt-1">
                {errors.aboutCompany.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text">
              Talent Preferences
            </label>
            <textarea
              {...register("talentPreferences", {
                required: "This field is required",
                minLength: {
                  value: 30,
                  message: "At least 30 characters required",
                },
              })}
              rows={5}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              placeholder="Describe the type of candidates you are looking for, preferred skills or experience"
            />
            {errors.talentPreferences && (
              <p className="text-red-500 text-sm mt-1">
                {errors.talentPreferences.message}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const StepFour = ({
  userData,
  resumeUrl,
  profileUrl,
  isResumeUploading,
  isImageUploading,
  handleDeleteFile,
  uploadFileToUploadcare,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-heading">Upload Files</h2>

      {userData?.role === "student" && (
        <>
          <div>
            <h3 className="text-base font-semibold text-heading">
              Upload Resume (PDF)
            </h3>
            {resumeUrl?.fileName && (
              <div className="bg-content my-2 p-2 flex justify-between items-center">
                <h6 className="text-base text-heading">
                  {resumeUrl?.fileName?.slice(0, 16)}
                </h6>
                <MdDelete
                  size="24"
                  onClick={() => handleDeleteFile("resume")}
                  className="cursor-pointer"
                />
              </div>
            )}
            <label
              htmlFor="resume"
              className={`block rounded border mt-2 border-border p-4 text-link shadow-sm sm:p-6 cursor-pointer ${
                isResumeUploading ? "pointer-events-none opacity-70" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-4">
                <span className="font-medium">
                  {isResumeUploading
                    ? "Uploading Resume..."
                    : "Upload your Resume"}
                </span>
                {isResumeUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                    />
                  </svg>
                )}
              </div>
              <input
                type="file"
                accept=".pdf"
                id="resume"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFileToUploadcare(file, "resume");
                }}
                className="sr-only"
              />
              {errors.resume && (
                <p className="text-red-500 text-sm mt-1 text-center">
                  {errors.resume.message}
                </p>
              )}
            </label>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-heading">
              Upload Profile Picture (JPG, JPEG, PNG)
            </h3>
            {profileUrl?.fileName && (
              <div className="bg-content mt-2 p-2 flex justify-between items-center">
                <h6 className="text-base text-heading">
                  {profileUrl?.fileName?.slice(0, 16) + "..."}
                </h6>
                <MdDelete
                  size="24"
                  onClick={() => handleDeleteFile("profile")}
                  className="cursor-pointer"
                />
              </div>
            )}
            <label
              htmlFor="profile"
              className={`block rounded border mt-2 border-border p-4 text-link shadow-sm sm:p-6 cursor-pointer ${
                isImageUploading ? "pointer-events-none opacity-70" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-4">
                <span className="font-medium">
                  {isImageUploading
                    ? "Uploading Profile Image..."
                    : "Upload your Profile Picture"}
                </span>
                {isImageUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                    />
                  </svg>
                )}
              </div>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                id="profile"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFileToUploadcare(file, "profile");
                }}
                className="sr-only"
              />
              {errors.profile && (
                <p className="text-red-500 text-sm mt-1 text-center">
                  {errors.profile.message}
                </p>
              )}
            </label>
          </div>
        </>
      )}
      {userData?.role === "company" && (
        <>
          <h3 className="text-base font-semibold text-heading">
            Upload Company Logo
          </h3>
          {profileUrl?.fileName && (
            <div className="bg-content my-2 p-2 flex justify-between items-center">
              <h6 className="text-base text-heading">
                {profileUrl?.fileName?.slice(0, 16) + "..."}
              </h6>
              <MdDelete
                size="24"
                onClick={() => handleDeleteFile("profile")}
                className="cursor-pointer"
              />
            </div>
          )}
          <label
            htmlFor="profile"
            className={`block rounded border mt-2 border-border p-4 text-link shadow-sm sm:p-6 cursor-pointer ${
              isImageUploading ? "pointer-events-none opacity-70" : ""
            }`}
          >
            <div className="flex items-center justify-center gap-4">
              <span className="font-medium">
                {isImageUploading ? "Uploading Logo..." : "Upload Company Logo"}
              </span>
              {isImageUploading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                  />
                </svg>
              )}
            </div>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              id="profile"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFileToUploadcare(file, "profile");
              }}
              className="sr-only"
            />
            {errors.profile && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {errors.profile.message}
              </p>
            )}
          </label>
        </>
      )}
    </div>
  );
};

const StepFive = ({ register, errors, userData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-heading">
        Socials & Final Review
      </h2>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-heading">
          {userData?.role === "student"
            ? "Your Social Links"
            : "Company Social Links"}{" "}
          <span className="text-sm text-gray-400">(Optional)</span>
        </h2>

        <p className="text-sm text-text mb-2">
          {userData?.role === "student"
            ? "Add links to your public developer profiles"
            : "Add official links to your company pages"}
        </p>

        {userData?.role === "student" && (
          <>
            <div>
              <input
                type="url"
                placeholder="LinkedIn URL"
                {...register("socials.linkedin")}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 text-heading"
              />
            </div>

            <div>
              <input
                type="url"
                placeholder="GitHub URL"
                {...register("socials.github")}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 text-heading"
              />
            </div>

            <div>
              <input
                type="url"
                placeholder="Portfolio URL"
                {...register("socials.portfolio")}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 text-heading"
              />
            </div>
          </>
        )}
        {userData?.role === "company" && (
          <>
            <div>
              <input
                type="url"
                placeholder="Company Website URL"
                {...register("socials.website")}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 text-heading"
              />
            </div>
            <div>
              <input
                type="url"
                placeholder="Company LinkedIn URL"
                {...register("socials.linkedin")}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 text-heading"
              />
            </div>
            <div>
              <input
                type="url"
                placeholder="Company Facebook URL"
                {...register("socials.facebook")}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 text-heading"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ProfileCreator = ({ onClose }) => {
  const userData = useSelector((state) => state.user);

  const [resumeUrl, setResumeUrl] = useState(userData?.resume || {});
  const [profileUrl, setProfileUrl] = useState(userData?.profile || {});

  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    setError,
    clearErrors,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues:
      userData?.role === "company"
        ? {
            companyName: userData.companyName,
            industry: userData.industry,
            hiringRoles: userData.hiringRoles || [],

            location: userData.location || "",
            employees: userData.employees || "",
            aboutCompany: userData.aboutCompany || "",
            talentPreferences: userData.talentPreferences || "",
            profile: {
              fileName: userData.profile?.fileName || "",
              profileUrl: userData.profile?.profileUrl || "",
            },
            socials: {
              linkedin: userData.socials?.linkedin || "",
              website: userData.socials?.website || "",
              facebook: userData.socials?.facebook || "",
            },
            isBlocked: false,
          }
        : {
            fullname: userData.fullname,
            username: userData.username,
            tagline: userData.tagline || "mhsabdiwhjs",
            skills: userData.skills || [],
            appliedJobs: [],
            education: {
              qualification: userData.education?.qualification || "",
              institute: userData.education?.institute || "",
              year: userData.education?.year || "",
            },
            resume: {
              fileName: resumeUrl?.fileName || "",
              resumeUrl: resumeUrl?.resumeUrl || "",
            },
            profile: {
              fileName: profileUrl?.fileName || "",
              profileUrl: profileUrl?.profileUrl || "",
            },
            aboutMe: {
              about: userData.aboutMe?.about || "",
              jobType: userData.aboutMe?.jobType || "",
            },
            socials: {
              linkedin: userData.socials?.linkedin || "",
              github: userData.socials?.github || "",
              portfolio: userData.socials?.portfolio || "",
            },
            isBlocked: false,
          },
  });

  const [step, setStep] = useState(0);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      ...(userData?.role === "student" && {
        resume: resumeUrl?.resumeUrl
          ? {
              fileName: resumeUrl.fileName,
              resumeUrl: resumeUrl.resumeUrl,
            }
          : userData?.resume || null,
      }),

      profile: profileUrl?.profileUrl
        ? {
            fileName: profileUrl.fileName,
            profileUrl: profileUrl.profileUrl,
          }
        : userData?.profile || null,
    };

    await handleupdateUserData(user, payload, dispatch, onClose, setIsLoading);
  };
  const allSkills = [
    "React",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Communication",
    "Problem Solving",
    "Leadership",
    "Tailwind",
    "MongoDB",
    "Figma",
    "Teamwork",
    "Express.js",
    "Next.js",
  ];

  const [skillInput, setSkillInput] = useState("");
  const { fields, append, remove } = useFieldArray({
    control,
    name: userData?.role === "company" ? "hiringRoles" : "skills",
  });

  const addRole = (role) => {
    if (!role) return;
    if (fields.some((field) => field.value === role)) return;
    append({ value: role });
    setSkillInput("");
  };
  const watchedSkills = watch("skills");
  const watchedHiringRoles = watch("hiringRoles");

  useEffect(() => {
    if (userData?.role === "company") {
      if (watchedHiringRoles?.length >= 5) {
        clearErrors("hiringRoles");
      }
    } else {
      if (watchedSkills?.length >= 5) {
        clearErrors("skills");
      }
    }
  }, [watchedHiringRoles, watchedSkills, clearErrors]);

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    const currentSkills = getValues("skills").map((s) => s.value.toLowerCase());
    if (trimmed && !currentSkills.includes(trimmed.toLowerCase())) {
      append({ value: trimmed });
      setSkillInput("");
    }
  };

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(skillInput.toLowerCase()) &&
      !getValues("skills")?.some(
        (s) => s.value.toLowerCase() === skill.toLowerCase()
      )
  );

  const resumeFile = watch("resume");
  const profileFile = watch("profile");

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isResumeUploading, setIsResumeUploading] = useState(false);

  const handleNext = async (e) => {
    e?.preventDefault?.();
    let stepZeroTriggerArray =
      userData?.roles === "student"
        ? ["fullname", "username", "tagline"]
        : ["companyName", "industry"];
    if (step === 0 && userData?.role === "student") {
      const isValid = await trigger(stepZeroTriggerArray);
      if (!isValid) {
        return;
      }
    } else {
      const isValid = await trigger();
      if (!isValid) {
        return;
      }
    }

    if (step === 1) {
      const skillsArray = getValues(
        userData?.role === "student" ? "skills" : "hiringRoles"
      );
      if (skillsArray.length < 5) {
        setError("hiringRoles", {
          type: "manual",
          message: "At least 5 hiring roles are required.",
        });
        return;
      }
    }

    if (step === 2) {
      const isValid = await trigger(
        userData?.roles === "student" ? "education" : ["location", "employees"]
      );
      if (!isValid) {
        return;
      }
    }

    if (step === 3) {
      const isValid = await trigger("aboutMe");
      if (!isValid) {
        return;
      }
    }

    if (step === 4) {
      if (isResumeUploading || isImageUploading) {
        toast.error("Please wait for file upload to complete.");
        return;
      }

      const hasResume = resumeUrl?.resumeUrl;
      const hasProfile = profileUrl?.profileUrl;

      if (userData?.role === "student") {
        if (!hasResume) {
          setError("resume", {
            type: "manual",
            message: "Please upload resume",
          });
        }

        if (!hasProfile) {
          setError("profile", {
            type: "manual",
            message: "Please upload profile picture",
          });
        }

        if (!hasResume || !hasProfile) return;
      }

      if (userData?.role === "company") {
        if (!hasProfile) {
          setError("profile", {
            type: "manual",
            message: "Please upload company logo",
          });
          return;
        }
      }
    }

    if (step === 5) {
      const isValid = await trigger("socials");
      if (!isValid) return;
    }

    if (step < 6 - 1) {
      setStep((prev) => prev + 1);
      return;
    }
  };
  const handleBack = () => setStep((prev) => prev - 1);

  const uploadFileToUploadcare = async (file, type) => {
    let cdnUrl = "";
    try {
      if (type === "resume") {
        setIsResumeUploading(true);
      } else {
        setIsImageUploading(true);
      }

      if (typeof file === "string") {
        cdnUrl = file;
      } else {
        if (!file || file.size === 0) {
          toast.error("Empty file detected");
          return;
        }

        const formData = new FormData();
        formData.append("UPLOADCARE_PUB_KEY", "1b631f6a79290228cd20");
        formData.append("UPLOADCARE_STORE", "1");
        formData.append("file", file);

        const res = await fetch("https://upload.uploadcare.com/base/", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data && data.file) {
          cdnUrl = `https://ucarecdn.com/${data.file}/`;
        } else {
          throw new Error("Uploadcare did not return file URL");
        }
      }

      if (type === "resume") {
        setResumeUrl({
          fileName: file.name,
          resumeUrl: cdnUrl,
        });
        clearErrors("resume");
        toast.success("Resume uploaded successfully");
      } else {
        setProfileUrl({
          fileName: file.name,
          profileUrl: cdnUrl,
        });
        clearErrors("profile");
        toast.success("Profile image uploaded successfully");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
    } finally {
      if (type === "resume") {
        setIsResumeUploading(false);
      } else {
        setIsImageUploading(false);
      }
    }
  };
  const handleDeleteFile = (type) => {
    if (type === "resume") {
      setResumeUrl({});
      setValue("resume", "");
    } else {
      setValue("profile", "");
      setProfileUrl({});
    }
  };

  return (
    <div
      className="
      fixed inset-0 z-50 flex justify-center items-center bg-black/55 backdrop-blur-sm overflow-y-auto text-left"
    >
      {isLoading && <FullScreenLoader />}
      <div
        onClick={onClose}
        className="absolute text-white cursor-pointer top-[3%] right-[3%]"
      >
        <RxCross2 size={20} />
      </div>
      <div className="w-full  max-w-md bg-background rounded-2xl shadow-lg p-6 space-y-6 mx-4">
        <div className="text-sm text-heading font-medium">
          Step {step + 1} of 6
        </div>

        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            style={{ width: `${((step + 1) / 6) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && (
            <StepZero register={register} errors={errors} userData={userData} />
          )}

          {step === 1 && (
            <StepOne
              userData={userData}
              skillInput={skillInput}
              setSkillInput={setSkillInput}
              addSkill={addSkill}
              addRole={addRole}
              filteredSkills={filteredSkills}
              fields={fields}
              remove={remove}
              errors={errors}
            />
          )}

          {step === 2 && (
            <StepTwo userData={userData} register={register} errors={errors} />
          )}

          {step === 3 && (
            <StepThree
              register={register}
              errors={errors}
              userData={userData}
            />
          )}

          {step === 4 && (
            <StepFour
              userData={userData}
              resumeUrl={resumeUrl}
              profileUrl={profileUrl}
              isResumeUploading={isResumeUploading}
              isImageUploading={isImageUploading}
              handleDeleteFile={handleDeleteFile}
              uploadFileToUploadcare={uploadFileToUploadcare}
              errors={errors}
            />
          )}

          {step === 5 && (
            <StepFive register={register} errors={errors} userData={userData} />
          )}

          <div className="flex justify-between gap-4 mt-6">
            {step === 0 ? (
              <Button
                type="button"
                onClick={onClose}
                value="Cancel"
                className="w-full"
              />
            ) : (
              <Button
                type="button"
                onClick={handleBack}
                value="Back"
                leftIcon={<GoArrowLeft />}
                className="w-full"
              />
            )}

            {step < 6 - 1 ? (
              <Button
                type="button"
                onClick={(e) => handleNext(e)}
                value="Next"
                rightIcon={<FaArrowRightLong />}
                className="w-full"
              />
            ) : (
              <Button type="submit" value="Submit" className="w-full" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreator;
