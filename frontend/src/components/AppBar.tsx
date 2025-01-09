
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppBar: React.FC = () => {

  const navigate = useNavigate()

  const navItems = [
    {
      title: "Home",
      route: "/"
    },
    {
      title: "Items",
      route: "/items"
    }
  ]

  return (
    <header className="bg-white  p-4 flex justify-between">
      <h1 className='text-lg font-bold text-black select-none'>Technical Assesment</h1>
      <div className='flex space-x-6 text-sm cursor-pointer'>
      {navItems.map((item) => (
          <a
            key={item.route}
            className="hover:text-black text-slate-500"
            onClick={() => navigate(item.route)}
          >
            {item.title}
          </a>
        ))}
      </div>
    </header>
  );
};

export default AppBar;
