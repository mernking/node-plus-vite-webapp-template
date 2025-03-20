import { useState } from "react";
import { BarChart, Users, Settings } from "lucide-react";

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="p-4 border rounded bg-primary text-white shadow-sm flex items-center gap-4">
      <Icon size={32} className="text-accent" />
      <div>
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-xl">{value}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [widgets, setWidgets] = useState(2);
  const [users, setUsers] = useState(50);

  return (
    <div className="p-6 bg-background text-text min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={BarChart} title="Active Widgets" value={widgets} />
        <StatCard icon={Users} title="Total Users" value={users} />
        <StatCard icon={Settings} title="Settings" value="Configure" />
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <ul className="space-y-2">
          <li className="p-3 border rounded bg-primary text-white">
            Widget "Support Chat 1" was updated.
          </li>
          <li className="p-3 border rounded bg-primary text-white">
            New user joined: John Doe.
          </li>
        </ul>
      </div>
    </div>
  );
}
