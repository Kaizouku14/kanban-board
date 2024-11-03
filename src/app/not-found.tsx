import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-200 tracking-tight">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Oops! Page Not Found
        </p>
        <p className="mt-2 text-gray-500">
          The page you are looking for might have been removed,
          <br />
          had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
