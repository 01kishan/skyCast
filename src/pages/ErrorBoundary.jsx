import { useRouteError, Link } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  //console.error(error);

  const status = error?.status || 500;
  const message =
    error?.statusText || error?.message || "Something went wrong!";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <h1 className="text-8xl font-extrabold text-blue-600 mb-4">{status}</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {message}
      </h2>
      {error?.data && (
        <p className="text-gray-600 text-sm mb-4">{error.data}</p>
      )}
      <Link
        to="/"
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
}
