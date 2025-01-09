import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { notification } from 'antd';

export const NotificationContext = createContext<ReturnType<typeof notification.useNotification>[0] | null>(null);

const MainLayout: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <NotificationContext.Provider value={api}>
        <div className="min-h-screen flex flex-col">
          <AppBar/>
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="bg-slate-900 text-white text-center p-2">
            <p className='text-xs'>© 2025 Technical Assessment</p>
          </footer>
        </div>
      </NotificationContext.Provider>
    </>
  );
};

export default MainLayout;
