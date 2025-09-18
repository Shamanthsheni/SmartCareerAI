import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = 'student' | 'parent' | 'admin';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('student');
  const [user, setUser] = useState<User | null>({
    id: 'demo-user-1',
    name: 'Priya Sharma',
    role: 'student',
    email: 'priya@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face'
  });

  const login = (newUser: User) => {
    setUser(newUser);
    setRole(newUser.role);
  };

  const logout = () => {
    setUser(null);
    setRole('student');
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      setRole: handleRoleChange,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
