import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleAddJobToFirestore } from "../../firebase/jobHandling";
import Button from "../../components/common/Button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import DashboardLoader from "../../components/DashboardLoader";
import isEqual from "lodash.isequal";
import toast from "react-hot-toast";
import { handleupdateUsers } from "../../firebase/userHandling";
import { UpdateJobData } from "../../features/allJobsSlice";

const PostJobForm = () => {
  const [job, setJob] = useState(null);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";
  const jobId = searchParams.get("jobId");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    getValues,
  } = useForm({
    defaultValues: {
      jobTitle: "",
      jobType: "",
      location: "",
      minSalary: "",
      maxSalary: "",
      applicants: [],
      isOpen: true,
      status: "open",
      postedBy: user?.uid,
      isCompanyBlocked: user?.isBlocked,
      companyProfile: {
        companyName: user?.companyName,
        companyLogo: user?.profile,
      },
      deadline: "",
      description: "",
      requirements: "",
      postedAt: serverTimestamp(),
    },
  });

  useEffect(() => {
    if (job) {
      reset({
        jobTitle: job.jobTitle || "",
        jobType: job.jobType || "",
        location: job.location || "",
        minSalary: job.minSalary || "",
        maxSalary: job.maxSalary || "",
        applicants: job.applicants || [],
        isOpen: job.isOpen ?? true,
        status: job.status || "open",
        postedBy: job.postedBy || user?.uid,
        isCompanyBlocked: user?.isBlocked,
        companyProfile: job.companyProfile || {
          companyName: user?.companyName,
          companyLogo: user?.profile,
        },
        deadline: job.deadline || "",
        description: job.description || "",
        requirements: job.requirements || "",
        postedAt: job.postedAt || serverTimestamp(),
      });
    }
  }, [job, reset, user]);

  const currentValues = getValues();
  const onSubmit = async (data) => {
    setLoading(true);
    if (isEdit && job) {
      if (isEqual(data, currentValues)) {
        toast.error("⚠️ No changes made to update");
        setLoading(false);
        return;
      } else {
        handleupdateUsers(job.id, data, "Job Updated Sucessfully", "jobs");
        setLoading(false);
        dispatch(UpdateJobData(data));
      }
    } else {
      const min = parseInt(data.minSalary);
      const max = parseInt(data.maxSalary);

      if (min >= max) {
        setError("maxSalary", {
          type: "manual",
          message: "Max salary must be greater than min salary",
        });
        return;
      }
      const jobId = crypto.randomUUID();

      await handleAddJobToFirestore(jobId, { ...data, id: jobId });
      setLoading(false);
    }
    reset();
  };

  useEffect(() => {
    const fetchJobData = async () => {
      if (isEdit && jobId) {
        setLoading(true);
        try {
          const docRef = doc(db, "jobs", jobId);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            const data = snapshot.data();
            setJob(data);
          }
        } catch (err) {
          console.error("Error fetching job:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJobData();
  }, [isEdit, jobId]);

  if (loading) return <DashboardLoader />;

  return (
    <section className="min-h-screen bg-background px-4 sm:px-6 py-10">
      <div className="bg-primary border border-border rounded-xl p-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-heading mb-8">
          ✍️ {isEdit ? "Edit Job" : "Post a New Job"}
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-heading mb-1">
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              {...register("jobTitle", { required: "Job title is required" })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
            />
            {errors.jobTitle && (
              <p className="text-sm text-red-500 mt-1">
                {errors.jobTitle.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-heading mb-1">
              Job Type
            </label>
            <select
              {...register("jobType", { required: "Job type is required" })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
            >
              <option value="">Select Type</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.jobType && (
              <p className="text-sm text-red-500 mt-1">
                {errors.jobType.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-heading mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. Karachi, Lahore, Remote"
              {...register("location", { required: "Location is required" })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
            />
            {errors.location && (
              <p className="text-sm text-red-500 mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-heading mb-1">
                Min Salary
              </label>
              <input
                type="number"
                {...register("minSalary", {
                  required: "Min salary is required",
                  min: { value: 1000, message: "Must be at least 1000" },
                })}
                placeholder="e.g. 50000"
                className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              />
              {errors.minSalary && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.minSalary.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-heading mb-1">
                Max Salary
              </label>
              <input
                type="number"
                {...register("maxSalary", {
                  required: "Max salary is required",
                  min: { value: 1000, message: "Must be at least 1000" },
                })}
                placeholder="e.g. 150000"
                className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
              />
              {errors.maxSalary && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.maxSalary.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-heading mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              {...register("deadline", { required: "Deadline is required" })}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
            />
            {errors.deadline && (
              <p className="text-sm text-red-500 mt-1">
                {errors.deadline.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-heading mb-1">
              Job Description
            </label>
            <textarea
              rows={4}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 30,
                  message: "Minimum 30 characters required",
                },
              })}
              placeholder="Write job responsibilities, tools, tech etc."
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
            ></textarea>
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-heading mb-1">
              Requirements
            </label>
            <textarea
              rows={3}
              {...register("requirements", {
                required: "Requirements are required",
              })}
              placeholder="List required skills, education etc."
              className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-heading placeholder:text-gray-400"
            ></textarea>
            {errors.requirements && (
              <p className="text-sm text-red-500 mt-1">
                {errors.requirements.message}
              </p>
            )}
          </div>
          <div className="pt-4">
            <Button
              value={isEdit ? "Update Job" : "🚀 Post Job"}
              disabled={!user?.isVerified}
              type="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostJobForm;
