import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";
import AppRouter from "./routes/AppRouter";
import FullScreenLoader from "./components/FullScreenLoader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribeUserDoc = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);

        unsubscribeUserDoc = onSnapshot(userRef, async (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();

            if (userData.isBlocked) {
              await signOut(auth);
              dispatch(setUser(false));
              navigate("/login");
              toast.error("You have been blocked by the admin.");
            } else {
              dispatch(
                setUser({
                  ...userData,
                  createdAt: userData.createdAt?.toDate().toLocaleString(),
                })
              );
            }
          } else {
            dispatch(setUser(false));
          }

          setIsAuthChecked(true);
        });
      } else {
        dispatch(setUser(false));
        setIsAuthChecked(true);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
  }, [dispatch, navigate]);

  if (!isAuthChecked) return <FullScreenLoader />;

  return <AppRouter />;
};

export default App;
