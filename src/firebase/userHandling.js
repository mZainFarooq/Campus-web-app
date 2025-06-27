import { useEffect } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  runTransaction,
  getDocs,
  writeBatch,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase/config";
import toast from "react-hot-toast";

const useFirestoreListener = ({
  dispatch,
  action,
  collectionName,
  condition,
}) => {
  useEffect(() => {
    const ref = collection(db, collectionName);
    let q;
    if (Array.isArray(condition) && condition.length === 3) {
      q = query(ref, where(...condition));
    } else {
      q = ref;
    }

    const unsubscribe = onSnapshot(condition ? q : ref, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        if (collectionName === "users") {
          return {
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || null,
          };
        } else {
          return {
            ...data,
            postedAt: data.postedAt?.toDate().toISOString() || null,
          };
        }
      });
      dispatch(action(docs));
    });

    return () => unsubscribe();
  }, [dispatch, action, collectionName]);
};

export default useFirestoreListener;

export const handleupdateUsers = async (
  uid,
  data,
  notification,
  collectioName = "users"
) => {
  try {
    const updatedDocRef = doc(db, collectioName, uid);
    await updateDoc(updatedDocRef, data);
    toast.success(notification);
  } catch (error) {
    toast.error(error.code || "Update failed");
    toast.error(error.message);
  }
};

export const handleToggleBlockCompanyWithJobs = async (
  companyId,
  shouldBlock,
  notification
) => {
  try {
    await runTransaction(db, async (transaction) => {
      const userRef = doc(db, "users", companyId);
      transaction.update(userRef, { isBlocked: shouldBlock });

      const jobsQuery = query(
        collection(db, "jobs"),
        where("postedBy", "==", companyId)
      );
      const snapshot = await getDocs(jobsQuery);

      snapshot.forEach((jobDoc) => {
        transaction.update(jobDoc.ref, { isCompanyBlocked: shouldBlock });
      });
    });

    toast.success(notification);
  } catch (error) {
    toast.error("❌ Transaction failed:", error);
  }
};

export const handleApply = async (user, job, setLoading) => {
  setLoading(true);
  const batch = writeBatch(db);

  if (
    (user.appliedJobs || []).some(
      (applicants) => applicants.jobId === job.jobId
    )
  ) {
    toast.error("Already applied!");
    setLoading(false);
    return;
  }

  const applicantData = {
    uid: user.uid,
    jobId: job.id,
    name: user.fullname,
    tagLine: user.tagline,
    profile: user.profile,
    status: "pending",
    appliedAt: new Date().toISOString(),
  };

  const studentJobRef = {
    jobId: job.id,
    title: job.jobTitle,
    companyName: job.companyProfile.companyName,
    status: "pending",
    appliedAt: new Date().toISOString(),
  };

  try {
    const jobRef = doc(db, "jobs", job.id);
    const userRef = doc(db, "users", user.uid);

    batch.update(jobRef, {
      applicants: arrayUnion(applicantData),
    });

    batch.update(userRef, {
      appliedJobs: arrayUnion(studentJobRef),
    });

    await batch.commit();
    toast.success("Applied Sucesfully!");
    setLoading(false);
  } catch (error) {
    console.error("Error in applying:", error);
    setLoading(false);
  }
};
