import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import { Bell, Globe, Search } from 'lucide-react';
import Providers from './providers';

export const metadata = {
  title: 'Plateforme Multimédia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[var(--app-background-color)]">
        <Providers>

          <AuthProvider>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex flex-col flex-1">
                {/* Topbar */}
                <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow">
                  <div className="flex items-center w-full max-w-md gap-2 px-2 py-1 border border-red-500 rounded">
                    <Search size={16} className="text-red-500" />
                    <input
                      type="text"
                      placeholder="Rechercher"
                      className="w-full text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-700">
                    <button className="flex items-center gap-1 text-gray-700">
                      <Globe size={16} /> FR
                    </button>
                    <button className="relative">
                      <Bell size={20} />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-semibold">GMP TEST</span>
                      <span className="text-[10px] text-gray-400">0.5 Mo / 200 Mo (9%)</span>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-red-500 rounded-full">
                      G
                    </div>
                  </div>
                </header>

                {/* Main content */}
                <main className="flex-1 p-2 overflow-y-auto md:p-4 lg:p-6">{children}</main>
              </div>
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
