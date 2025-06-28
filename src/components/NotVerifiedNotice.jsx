const NotVerifiedNotice = ({ user }) => {
  return (
    <div className="p-4 bg-background">
      <div className="bg-content rounded-lg  text-link   p-4   gap-4 ">
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
