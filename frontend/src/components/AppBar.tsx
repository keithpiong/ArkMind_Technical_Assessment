
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

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
    <header className="bg-appbar p-4 flex justify-between">
      <h1 className='text-lg font-bold text-body select-none'>Technical Assesment</h1>
      <div className='flex space-x-6 text-sm cursor-pointer items-center'>
      {navItems.map((item) => (
          <a
            key={item.route}
            className="hover:text-accent text-body"
            onClick={() => navigate(item.route)}
          >
            {item.title}
          </a>
        ))}
        <ThemeToggle/>
      </div>
    </header>
  );
};

export default AppBar;
