import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex justify-center items-center mb-4">
        <img className="h-16 w-auto" src="/edg.png" alt="EdgPro" />
      </div>
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-6 text-xl">Pagina non trovata</p>
      <Link
        to="/"
        className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 hover:text-white"
      >
        Torna alla dashboard
      </Link>
    </div>
  );
};

export default NotFound;
