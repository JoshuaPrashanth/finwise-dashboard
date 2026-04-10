'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { userDataMap, UserData } from '@/lib/userData'

type User = {
  username: string
}

type AuthContextType = {
  user: User | null
  userData: UserData | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hardcoded credentials
const members: Record<string, string> = {
  arun: 'arun123',
  rahul: 'pass123',
  anita: 'welcome1',
  vikram: 'abc123',
  priya: 'password1',
  arjun: 'arjun123',
  neha: 'neha123',
  rohit: 'rohit123',
  kavya: 'kavya123',
  meena: 'meena123',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    // Check localStorage for existing session
    const stored = localStorage.getItem('finwise_user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.username && members[parsed.username]) {
          setUser(parsed)
          setUserData(userDataMap[parsed.username])
        }
      } catch (e) {}
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    const lowerUsername = username.toLowerCase()
    if (members[lowerUsername] && members[lowerUsername] === password) {
      const userObj = { username: lowerUsername }
      setUser(userObj)
      setUserData(userDataMap[lowerUsername])
      localStorage.setItem('finwise_user', JSON.stringify(userObj))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setUserData(null)
    localStorage.removeItem('finwise_user')
  }

  return (
    <AuthContext.Provider value={{ user, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}