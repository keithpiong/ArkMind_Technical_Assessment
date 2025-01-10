import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { changeTheme } from "../features/themeSlice";
import { Button } from "antd";

const ThemeToggle: React.FC = () => {
  const activeTheme = useSelector((state: RootState) => state.theme.activeTheme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newTheme = activeTheme === "light" ? "dark" : "light";
    dispatch(changeTheme(newTheme));
  };

  return (
    <div>
      <Button onClick={toggleTheme} type="primary">Redux Theme Toggle: {activeTheme}</Button>
    </div>
  );
};

export default ThemeToggle;
