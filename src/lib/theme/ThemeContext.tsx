'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Theme } from './types'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 컴포넌트 마운트 시 로컬 스토리지에서 테마 불러오기
    const initializeTheme = () => {
      // 로컬 스토리지에서 테마 가져오기
      const savedTheme = localStorage.getItem('theme') as Theme
      // 시스템 다크모드 설정 확인
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      let initialTheme: Theme
      if (savedTheme) {
        initialTheme = savedTheme
      } else {
        initialTheme = prefersDark ? 'dark' : 'light'
        localStorage.setItem('theme', initialTheme)
      }

      setTheme(initialTheme)
      // HTML에 다크모드 클래스 적용
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    }

    initializeTheme()
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    // 로컬 스토리지에 테마 저장
    localStorage.setItem('theme', newTheme)
    // HTML 클래스 토글
    document.documentElement.classList.toggle('dark')
  }

  // 초기 렌더링 시 깜빡임 방지
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 