const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-border border-t-link rounded-full animate-spin"></div>
    </div>
  );
};

export default FullScreenLoader;
