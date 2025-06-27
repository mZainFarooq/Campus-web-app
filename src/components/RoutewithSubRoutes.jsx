import { SimpleRoute } from "./SimpleRoute";

export const RoutewithSubRoutes = ({ value, routes = [] }) => {
  return (
    <li>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-text hover:bg-link hover:text-white">
          <span className="text-sm font-medium">{value}</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>

        <ul className="mt-2 space-y-1 px-4">
          {routes.map((route, i) => (
            <SimpleRoute
              key={i}
              value={route.value}
              link={route.link}
              nested={route?.nested}
            />
          ))}
        </ul>
      </details>
    </li>
  );
};
