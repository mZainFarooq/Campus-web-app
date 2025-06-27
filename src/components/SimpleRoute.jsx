import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const SimpleRoute = ({ value, link, onClose }) => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <NavLink
        onClick={onClose}
        to={
          value === "My Profile" || value === "Company Profile"
            ? link.replace(":id", user.uid)
            : link
        }
        end
        className={({ isActive, isPending }) => {
          const baseClasses =
            "block px-4 py-2 rounded-md text-sm font-medium transition";

          if (isPending) return baseClasses;

          return isActive
            ? `${baseClasses} bg-link text-white`
            : `${baseClasses}  hover:bg-link hover:text-white`;
        }}
      >
        {value}
      </NavLink>
    </div>
  );
};
