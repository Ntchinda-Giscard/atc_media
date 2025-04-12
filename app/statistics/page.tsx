'use client';
import { BarChart, PlayCircle, Tv, Users } from 'lucide-react';

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-semibold text-gray-800">{value}</h2>
    </div>
    <div className="text-red-500">{icon}</div>
  </div>
);

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-700">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total de diffusions" value="128" icon={<PlayCircle size={28} />} />
        <StatCard title="Nombre d'écrans" value="24" icon={<Tv size={28} />} />
        <StatCard title="Nombre de groupes" value="6" icon={<Users size={28} />} />
        <StatCard title="Templates disponibles" value="52" icon={<BarChart size={28} />} />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Statistiques par écran</h2>
        <table className="w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="border-b text-xs text-gray-500 uppercase">
              <th className="py-2">Nom de l'écran</th>
              <th className="py-2">Diffusions</th>
              <th className="py-2">Durée totale</th>
              <th className="py-2">Dernière mise à jour</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Écran Hall d'entrée</td>
              <td>23</td>
              <td>5h 30min</td>
              <td>2024-04-11</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Écran Salle d'attente</td>
              <td>18</td>
              <td>4h 12min</td>
              <td>2024-04-10</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Écran Accueil</td>
              <td>31</td>
              <td>6h 05min</td>
              <td>2024-04-09</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
