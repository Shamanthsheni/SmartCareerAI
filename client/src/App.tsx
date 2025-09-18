import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./hooks/use-auth";
import Layout from "./components/shared/layout";
import LandingPage from "./pages/landing";
import StudentDashboard from "./pages/student-dashboard";
import CareerQuiz from "./pages/career-quiz";
import Recommendations from "./pages/recommendations";
import CollegeDirectory from "./pages/college-directory";
import AdminDashboard from "./pages/admin-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard" component={StudentDashboard} />
      <Route path="/quiz" component={CareerQuiz} />
      <Route path="/recommendations" component={Recommendations} />
      <Route path="/colleges" component={CollegeDirectory} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Layout>
            <Toaster />
            <Router />
          </Layout>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
