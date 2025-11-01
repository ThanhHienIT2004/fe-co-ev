import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <Topbar />

      <main className="ml-64 pt-20 px-6 grid grid-cols-12 gap-6">
        <section className="col-span-8 bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Overall Sales</h2>
          <div className="h-48 flex items-center justify-center text-gray-400">
            (Chart Placeholder)
          </div>
        </section>

        <section className="col-span-4 bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Visitors</h2>
          <div className="h-48 flex items-center justify-center text-gray-400">
            (Chart Placeholder)
          </div>
        </section>

        <section className="col-span-12 bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sales by Country</h2>
          <div className="h-48 flex items-center justify-center text-gray-400">
            (Bar Chart Placeholder)
          </div>
        </section>
      </main>
    </div>
  );
}
