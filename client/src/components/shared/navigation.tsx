import { Link, useLocation } from "wouter";
import { useAuth, UserRole } from "../../hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const { role, setRole } = useAuth();

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as UserRole);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-xl text-foreground">SmartCareer AI</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors ${location === '/' ? 'text-primary' : 'text-foreground hover:text-primary'}`} data-testid="link-nav-home">
              Home
            </Link>
            <Link href="/colleges" className={`transition-colors ${location === '/colleges' ? 'text-primary' : 'text-foreground hover:text-primary'}`} data-testid="link-nav-colleges">
              Colleges
            </Link>
            {role === 'student' && (
              <>
                <Link href="/dashboard" className={`transition-colors ${location === '/dashboard' ? 'text-primary' : 'text-foreground hover:text-primary'}`} data-testid="link-nav-dashboard">
                  Dashboard
                </Link>
                <Link href="/quiz" className={`transition-colors ${location === '/quiz' ? 'text-primary' : 'text-foreground hover:text-primary'}`} data-testid="link-nav-quiz">
                  Assessment
                </Link>
              </>
            )}
            {role === 'admin' && (
              <Link href="/admin" className={`transition-colors ${location === '/admin' ? 'text-primary' : 'text-foreground hover:text-primary'}`} data-testid="link-nav-admin">
                Analytics
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-32" data-testid="select-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-get-started">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
