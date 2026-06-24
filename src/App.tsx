import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/guards/ProtectedRoute';
import PublicRoute from '@/components/guards/PublicRoute';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ToastContainer } from '@/components/ui/Toast';
import CustomCursor from '@/components/ui/CustomCursor';

// Public Pages
import Landing from '@/pages/Landing';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import FAQ from '@/pages/FAQ';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';

// Auth Pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';

// Protected Pages
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';

// Dashboards — Main Overview Pages
import CreatorDashboard from '@/dashboards/creator/CreatorDashboard';
import BusinessDashboard from '@/dashboards/business/BusinessDashboard';
import DesignerDashboard from '@/dashboards/designer/DesignerDashboard';
import AgencyDashboard from '@/dashboards/agency/AgencyDashboard';
import FreelancerDashboard from '@/dashboards/freelancer/FreelancerDashboard';
import TeamDashboard from '@/dashboards/team/TeamDashboard';
import AdminDashboard from '@/dashboards/admin/AdminDashboard';

// ── Content Creator Sub-pages ──────────────────────────────────────
import {
  CreatorAIStudio,
  CreatorDesigns,
  CreatorTemplates,
  CreatorSocial,
  CreatorVideo,
  CreatorAnalytics,
} from '@/dashboards/creator/pages/CreatorPages';

// ── Business Owner Sub-pages ───────────────────────────────────────
import {
  BusinessBrand,
  BusinessMarketing,
  BusinessCampaigns,
  BusinessAnalytics,
  BusinessBilling,
} from '@/dashboards/business/pages/BusinessPages';

// ── Designer Sub-pages ─────────────────────────────────────────────
import {
  DesignerDesigns,
  DesignerPortfolio,
  DesignerMarketplace,
  DesignerClients,
  DesignerEarnings,
  DesignerAnalytics,
  DesignerHistory,
} from '@/dashboards/designer/pages/DesignerPages';

// ── Marketing Agency Sub-pages ─────────────────────────────────────
import {
  AgencyClients,
  AgencyCampaigns,
  AgencyProjects,
  AgencyTeam,
  AgencyAnalytics,
  AgencyRevenue,
} from '@/dashboards/agency/pages/AgencyPages';

// ── Freelancer Sub-pages ───────────────────────────────────────────
import {
  FreelancerPortfolio,
  FreelancerProjects,
  FreelancerProposals,
  FreelancerEarnings,
  FreelancerAnalytics,
  FreelancerHistory,
} from '@/dashboards/freelancer/pages/FreelancerPages';

// ── Enterprise Team Sub-pages ──────────────────────────────────────
import TeamWorkspaces from '@/dashboards/team/pages/TeamWorkspaces';
import TeamAssets from '@/dashboards/team/pages/TeamAssets';
import TeamCollaborate from '@/dashboards/team/pages/TeamCollaborate';
import TeamGuidelines from '@/dashboards/team/pages/TeamGuidelines';
import TeamConsistency from '@/dashboards/team/pages/TeamConsistency';
import TeamAnalytics from '@/dashboards/team/pages/TeamAnalytics';
import TeamSecurity from '@/dashboards/team/pages/TeamSecurity';
import TeamIntegrations from '@/dashboards/team/pages/TeamIntegrations';

// ── Admin Sub-pages ────────────────────────────────────────────────
import {
  AdminUsers,
  AdminRevenue,
  AdminMarketplace,
  AdminAnalytics,
  AdminModeration,
  AdminReports,
} from '@/dashboards/admin/pages/AdminPages';

function ScrollRestoration() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollRestoration />
      <Routes>
        {/* ── Public ───────────────────────────────── */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* ── Auth ─────────────────────────────────── */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ── Protected Pages ───────────────────────── */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        {/* ── Content Creator ───────────────────────── */}
        <Route path="/dashboard/creator" element={<ProtectedRoute><CreatorDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/creator/studio" element={<ProtectedRoute><CreatorAIStudio /></ProtectedRoute>} />
        <Route path="/dashboard/creator/designs" element={<ProtectedRoute><CreatorDesigns /></ProtectedRoute>} />
        <Route path="/dashboard/creator/templates" element={<ProtectedRoute><CreatorTemplates /></ProtectedRoute>} />
        <Route path="/dashboard/creator/social" element={<ProtectedRoute><CreatorSocial /></ProtectedRoute>} />
        <Route path="/dashboard/creator/video" element={<ProtectedRoute><CreatorVideo /></ProtectedRoute>} />
        <Route path="/dashboard/creator/analytics" element={<ProtectedRoute><CreatorAnalytics /></ProtectedRoute>} />

        {/* ── Business Owner ────────────────────────── */}
        <Route path="/dashboard/business" element={<ProtectedRoute><BusinessDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/business/brand" element={<ProtectedRoute><BusinessBrand /></ProtectedRoute>} />
        <Route path="/dashboard/business/marketing" element={<ProtectedRoute><BusinessMarketing /></ProtectedRoute>} />
        <Route path="/dashboard/business/campaigns" element={<ProtectedRoute><BusinessCampaigns /></ProtectedRoute>} />
        <Route path="/dashboard/business/analytics" element={<ProtectedRoute><BusinessAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/business/billing" element={<ProtectedRoute><BusinessBilling /></ProtectedRoute>} />

        {/* ── Designer ──────────────────────────────── */}
        <Route path="/dashboard/designer" element={<ProtectedRoute><DesignerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/designer/designs" element={<ProtectedRoute><DesignerDesigns /></ProtectedRoute>} />
        <Route path="/dashboard/designer/portfolio" element={<ProtectedRoute><DesignerPortfolio /></ProtectedRoute>} />
        <Route path="/dashboard/designer/marketplace" element={<ProtectedRoute><DesignerMarketplace /></ProtectedRoute>} />
        <Route path="/dashboard/designer/clients" element={<ProtectedRoute><DesignerClients /></ProtectedRoute>} />
        <Route path="/dashboard/designer/earnings" element={<ProtectedRoute><DesignerEarnings /></ProtectedRoute>} />
        <Route path="/dashboard/designer/analytics" element={<ProtectedRoute><DesignerAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/designer/history" element={<ProtectedRoute><DesignerHistory /></ProtectedRoute>} />

        {/* ── Marketing Agency ──────────────────────── */}
        <Route path="/dashboard/agency" element={<ProtectedRoute><AgencyDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/agency/clients" element={<ProtectedRoute><AgencyClients /></ProtectedRoute>} />
        <Route path="/dashboard/agency/campaigns" element={<ProtectedRoute><AgencyCampaigns /></ProtectedRoute>} />
        <Route path="/dashboard/agency/projects" element={<ProtectedRoute><AgencyProjects /></ProtectedRoute>} />
        <Route path="/dashboard/agency/team" element={<ProtectedRoute><AgencyTeam /></ProtectedRoute>} />
        <Route path="/dashboard/agency/analytics" element={<ProtectedRoute><AgencyAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/agency/revenue" element={<ProtectedRoute><AgencyRevenue /></ProtectedRoute>} />

        {/* ── Freelancer ────────────────────────────── */}
        <Route path="/dashboard/freelancer" element={<ProtectedRoute><FreelancerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/freelancer/portfolio" element={<ProtectedRoute><FreelancerPortfolio /></ProtectedRoute>} />
        <Route path="/dashboard/freelancer/projects" element={<ProtectedRoute><FreelancerProjects /></ProtectedRoute>} />
        <Route path="/dashboard/freelancer/proposals" element={<ProtectedRoute><FreelancerProposals /></ProtectedRoute>} />
        <Route path="/dashboard/freelancer/earnings" element={<ProtectedRoute><FreelancerEarnings /></ProtectedRoute>} />
        <Route path="/dashboard/freelancer/analytics" element={<ProtectedRoute><FreelancerAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/freelancer/history" element={<ProtectedRoute><FreelancerHistory /></ProtectedRoute>} />

        {/* ── Enterprise Team ───────────────────────── */}
        <Route path="/dashboard/team" element={<ProtectedRoute><TeamDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/team/workspaces" element={<ProtectedRoute><TeamWorkspaces /></ProtectedRoute>} />
        <Route path="/dashboard/team/assets" element={<ProtectedRoute><TeamAssets /></ProtectedRoute>} />
        <Route path="/dashboard/team/collaborate" element={<ProtectedRoute><TeamCollaborate /></ProtectedRoute>} />
        <Route path="/dashboard/team/guidelines" element={<ProtectedRoute><TeamGuidelines /></ProtectedRoute>} />
        <Route path="/dashboard/team/consistency" element={<ProtectedRoute><TeamConsistency /></ProtectedRoute>} />
        <Route path="/dashboard/team/analytics" element={<ProtectedRoute><TeamAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/team/security" element={<ProtectedRoute><TeamSecurity /></ProtectedRoute>} />
        <Route path="/dashboard/team/integrations" element={<ProtectedRoute><TeamIntegrations /></ProtectedRoute>} />

        {/* ── Admin ─────────────────────────────────── */}
        <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/dashboard/admin/revenue" element={<ProtectedRoute><AdminRevenue /></ProtectedRoute>} />
        <Route path="/dashboard/admin/marketplace" element={<ProtectedRoute><AdminMarketplace /></ProtectedRoute>} />
        <Route path="/dashboard/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
        <Route path="/dashboard/admin/moderation" element={<ProtectedRoute><AdminModeration /></ProtectedRoute>} />
        <Route path="/dashboard/admin/reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />

        {/* ── 404 ───────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CustomCursor />
          <AppRoutes />
          <ScrollToTop />
          <ToastContainer />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
