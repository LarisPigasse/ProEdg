import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-6 text-xl">Pagina non trovata</p>
      <Link
        to="/"
        className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Torna alla dashboard
      </Link>
    </div>
  );
};

export default NotFound;
