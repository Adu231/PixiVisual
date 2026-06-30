import { 
  Sparkles, Image as ImageIcon, Layers, Share2, Video, BarChart2,
  TrendingUp, CreditCard, FolderOpen, Briefcase, Store,
  Users, DollarSign, Clock, FileText, BookOpen, ShieldCheck, Lock, Shield
} from 'lucide-react';
import { SidebarItem } from './DashboardLayout';

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    'content-creator': 'Content Creator',
    'business-owner': 'Business Owner',
    'designer': 'Designer',
    'marketing-agency': 'Marketing Agency',
    'freelancer': 'Freelancer',
    'enterprise-team': 'Enterprise Team',
    'admin': 'Platform Admin',
  };
  return labels[role] || 'User';
}

export function getSidebarItemsForRole(role: string): SidebarItem[] {
  switch (role) {
    case 'content-creator':
      return [
        { label: 'AI Studio', href: '/dashboard/creator/studio', icon: Sparkles },
        { label: 'My Designs', href: '/dashboard/creator/designs', icon: ImageIcon },
        { label: 'Templates', href: '/dashboard/creator/templates', icon: Layers },
        { label: 'Social Media', href: '/dashboard/creator/social', icon: Share2 },
        { label: 'Video Studio', href: '/dashboard/creator/video', icon: Video },
        { label: 'Analytics', href: '/dashboard/creator/analytics', icon: BarChart2 },
      ];
    case 'business-owner':
      return [
        { label: 'Brand Kit', href: '/dashboard/business/brand', icon: Sparkles },
        { label: 'Marketing Hub', href: '/dashboard/business/marketing', icon: Layers },
        { label: 'Campaigns', href: '/dashboard/business/campaigns', icon: TrendingUp },
        { label: 'Analytics', href: '/dashboard/business/analytics', icon: BarChart2 },
        { label: 'Billing', href: '/dashboard/business/billing', icon: CreditCard },
      ];
    case 'designer':
      return [
        { label: 'My Designs', href: '/dashboard/designer/designs', icon: ImageIcon },
        { label: 'Portfolio', href: '/dashboard/designer/portfolio', icon: Briefcase },
        { label: 'Marketplace', href: '/dashboard/designer/marketplace', icon: Store },
        { label: 'Clients', href: '/dashboard/designer/clients', icon: Users },
        { label: 'Earnings', href: '/dashboard/designer/earnings', icon: DollarSign },
        { label: 'Analytics', href: '/dashboard/designer/analytics', icon: BarChart2 },
        { label: 'History', href: '/dashboard/designer/history', icon: Clock },
      ];
    case 'marketing-agency':
      return [
        { label: 'Clients', href: '/dashboard/agency/clients', icon: Users },
        { label: 'Campaigns', href: '/dashboard/agency/campaigns', icon: TrendingUp },
        { label: 'Projects', href: '/dashboard/agency/projects', icon: Briefcase },
        { label: 'Team', href: '/dashboard/agency/team', icon: Users },
        { label: 'Analytics', href: '/dashboard/agency/analytics', icon: BarChart2 },
        { label: 'Revenue', href: '/dashboard/agency/revenue', icon: DollarSign },
      ];
    case 'freelancer':
      return [
        { label: 'Portfolio', href: '/dashboard/freelancer/portfolio', icon: Briefcase },
        { label: 'Projects', href: '/dashboard/freelancer/projects', icon: Briefcase },
        { label: 'Proposals', href: '/dashboard/freelancer/proposals', icon: FileText },
        { label: 'Earnings', href: '/dashboard/freelancer/earnings', icon: DollarSign },
        { label: 'Analytics', href: '/dashboard/freelancer/analytics', icon: BarChart2 },
        { label: 'History', href: '/dashboard/freelancer/history', icon: Clock },
      ];
    case 'enterprise-team':
      return [
        { label: 'Workspaces', href: '/dashboard/team/workspaces', icon: FolderOpen },
        { label: 'Brand Assets', href: '/dashboard/team/assets', icon: ImageIcon },
        { label: 'Collaborate', href: '/dashboard/team/collaborate', icon: Users },
        { label: 'Brand Guidelines', href: '/dashboard/team/guidelines', icon: BookOpen },
        { label: 'Consistency Check', href: '/dashboard/team/consistency', icon: ShieldCheck },
        { label: 'Analytics', href: '/dashboard/team/analytics', icon: BarChart2 },
        { label: 'Security', href: '/dashboard/team/security', icon: Lock },
        { label: 'Integrations', href: '/dashboard/team/integrations', icon: Share2 },
      ];
    case 'admin':
      return [
        { label: 'Users', href: '/dashboard/admin/users', icon: Users },
        { label: 'Revenue', href: '/dashboard/admin/revenue', icon: DollarSign },
        { label: 'Marketplace', href: '/dashboard/admin/marketplace', icon: Store },
        { label: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart2 },
        { label: 'Content Moderation', href: '/dashboard/admin/moderation', icon: Shield },
        { label: 'Reports', href: '/dashboard/admin/reports', icon: FileText },
      ];
    default:
      return [];
  }
}
