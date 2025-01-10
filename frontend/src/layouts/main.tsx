import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


export const NotificationContext = createContext<ReturnType<typeof notification.useNotification>[0] | null>(null);

const MainLayout: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const activeTheme = useSelector((state: RootState) => state.theme.activeTheme);

  return (
    <>
      {contextHolder}
      <NotificationContext.Provider value={api}>
        <div className={`min-h-screen flex flex-col ${activeTheme === "dark" ? "dark" : "light"} bg-background`}>
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
