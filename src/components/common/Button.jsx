const Button = ({
  onClick,
  type = "button",
  value,
  leftIcon,
  rightIcon,
  className = "",
  disabled = false,
  initalClass = true,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${
        initalClass &&
        "cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-link text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition"
      } ${className}`}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {value}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;
