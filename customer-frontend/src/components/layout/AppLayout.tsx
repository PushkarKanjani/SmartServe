import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopHeader } from './TopHeader';
import { Sidebar } from './Sidebar';
import { BackendStatusBadge } from '../common/BackendStatusBadge';

export const AppLayout: FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#F8FAFC]">
      <TopHeader onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />
      <div className="flex flex-1 relative">
        <Sidebar
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      <BackendStatusBadge />
    </div>
  );
};

export default AppLayout;
