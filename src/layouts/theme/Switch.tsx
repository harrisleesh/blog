'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dot, LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface DropdownItemProps {
  t: string;
  label: string;
  Icon: LucideIcon;
}

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ThemeToggleButton = () => {
    const [themeString, setThemeString] = useState('light'); // 초기 테마를 'light'로 설정합니다.

    const toggleTheme = () => {
      setThemeString((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
      setTheme(themeString)
    };

    return (
        <button onClick={toggleTheme} className='button-class'>
          {theme === 'light' ? (
              <Sun className='h-[1.2rem] w-[1.2rem]' />
          ) : (
              <Moon className='h-[1.2rem] w-[1.2rem]' />
          )}
          <span className='sr-only'>Toggle theme</span>
        </button>
    );
  };

  return (
    <ThemeToggleButton></ThemeToggleButton>
  );
};

export default ThemeSwitch;
