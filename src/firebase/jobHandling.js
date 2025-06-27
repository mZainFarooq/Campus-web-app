import { doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "./config";
import toast from "react-hot-toast";

export const handleAddJobToFirestore = async (uid, data) => {
  try {
    await setDoc(doc(db, "jobs", uid), data);
    toast.success("Job Posted Sucessfully!");
  } catch (error) {
    console.error("Firestore error:", error.message);
    throw new Error("Profile save nahi ho saka. Dobara try karo.");
  }
};

export const handleApplicantStatus = async (
  user,
  job,
  newStatus,
  setisJobClosed
) => {
  try {
    setisJobClosed(true);
    const jobRef = doc(db, "jobs", job.id);
    const userRef = doc(db, "users", user.uid);

    const jobSnap = await getDoc(jobRef);
    const userSnap = await getDoc(userRef);

    if (!jobSnap.exists() || !userSnap.exists()) {
      throw new Error("Job ya User document nahi mila.");
    }

    const jobData = jobSnap.data();
    const userData = userSnap.data();

    const updatedApplicants = jobData.applicants.map((applicant) => {
      if (applicant.uid === user.uid) {
        return { ...applicant, status: newStatus };
      }
      return applicant;
    });

    const updatedAppliedJobs = userData.appliedJobs.map((jobItem) => {
      if (jobItem.jobId === job.id) {
        return { ...jobItem, status: newStatus };
      }
      return jobItem;
    });

    const batch = writeBatch(db);

    batch.update(jobRef, { applicants: updatedApplicants });
    batch.update(userRef, { appliedJobs: updatedAppliedJobs });

    await batch.commit();

    toast.success("✅ Status updated successfully!");
    setisJobClosed(false);
  } catch (error) {
    console.error("❌ Error updating status:", error.message);
    toast.error("⚠️ Status update failed. Try again.");
  } finally {
    setisJobClosed(false);
  }
};
