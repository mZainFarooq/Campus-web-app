const NotVerifiedNotice = ({ user }) => {
  return (
    <div className="p-4 bg-background">
      <div className="bg-content rounded-lg  text-link  p-4 flex items-center gap-4 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
          />
        </svg>
        {!user?.isVerified && !user?.profile?.profileUrl && (
          <p>
            You are not a verified user. Please complete your profile details in
            order to become eligible for verification.
          </p>
        )}

        {!user?.isVerified && user?.profile?.profileUrl && (
          <p>
            You are not a verified user. Your profile is complete. Please wait
            while an admin verifies your account.
          </p>
        )}
      </div>
    </div>
  );
};

export default NotVerifiedNotice;
