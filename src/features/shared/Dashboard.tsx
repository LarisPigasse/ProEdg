const Dashboard = () => {
  return (
    <div className="p-2">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card esempio */}
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            Operatori
          </h2>
          <p className="text-2xl font-bold text-blue-600">5</p>
          <p className="mt-2 text-sm text-gray-500">
            Operatori attivi nel sistema
          </p>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Clienti</h2>
          <p className="text-2xl font-bold text-green-600">24</p>
          <p className="mt-2 text-sm text-gray-500">Clienti registrati</p>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Progetti</h2>
          <p className="text-2xl font-bold text-purple-600">12</p>
          <p className="mt-2 text-sm text-gray-500">Progetti attivi</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
