import type { User, UserRole } from '@/types';
import { generateId } from './utils';

const AUTH_KEY = 'pixivisual_auth';
const USER_KEY = 'pixivisual_user';

export const MOCK_USERS: Record<string, User> = {
  'creator@pixivisual.com': {
    id: 'user_1',
    name: 'Alex Rivera',
    email: 'creator@pixivisual.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
    role: 'content-creator',
    plan: 'pro',
    createdAt: '2024-01-15',
    bio: 'Digital content creator passionate about visual storytelling.',
    company: 'Self-Employed',
    location: 'San Francisco, CA',
  },
  'business@pixivisual.com': {
    id: 'user_2',
    name: 'Jordan Mitchell',
    email: 'business@pixivisual.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    role: 'business-owner',
    plan: 'business',
    createdAt: '2024-02-20',
    bio: 'Founder & CEO building the next generation of retail brands.',
    company: 'StyleHouse',
    location: 'New York, NY',
  },
  'designer@pixivisual.com': {
    id: 'user_3',
    name: 'Maya Chen',
    email: 'designer@pixivisual.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=80&h=80&fit=crop&crop=face',
    role: 'designer',
    plan: 'pro',
    createdAt: '2024-03-10',
    bio: 'Senior graphic designer with 8+ years of experience.',
    company: 'Freelance',
    location: 'Los Angeles, CA',
  },
  'agency@pixivisual.com': {
    id: 'user_4',
    name: 'Marcus Williams',
    email: 'agency@pixivisual.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    role: 'marketing-agency',
    plan: 'enterprise',
    createdAt: '2024-01-05',
    bio: 'Creative Director at Bloom Agency managing 50+ client brands.',
    company: 'Bloom Agency',
    location: 'Chicago, IL',
  },
  'freelancer@pixivisual.com': {
    id: 'user_5',
    name: 'Sam Torres',
    email: 'freelancer@pixivisual.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
    role: 'freelancer',
    plan: 'pro',
    createdAt: '2024-04-01',
    bio: 'Freelance designer specializing in brand identity and UI/UX.',
    company: 'Freelance',
    location: 'Austin, TX',
  },
  'team@pixivisual.com': {
    id: 'user_7',
    name: 'Jordan Lee',
    email: 'team@pixivisual.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
    role: 'enterprise-team',
    plan: 'enterprise',
    createdAt: '2024-05-10',
    bio: 'Enterprise Team Lead managing workspaces, brand assets, and cross-functional collaboration.',
    company: 'GlobalBrand Corp',
    location: 'Austin, TX',
  },
  'admin@pixivisual.com': {
    id: 'admin_1',
    name: 'Admin User',
    email: 'admin@pixivisual.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    role: 'admin',
    plan: 'enterprise',
    createdAt: '2023-06-01',
    bio: 'Platform administrator and product manager.',
    company: 'PixiVisual',
    location: 'Remote',
  },
  'demo@pixivisual.com': {
    id: 'demo_1',
    name: 'Demo User',
    email: 'demo@pixivisual.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
    role: 'content-creator',
    plan: 'free',
    createdAt: '2025-01-01',
    bio: 'Exploring PixiVisual features.',
    company: 'Demo Company',
    location: 'Worldwide',
  },
};

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const user = MOCK_USERS[email.toLowerCase()];
  if (!user) {
    return { success: false, error: 'No account found with this email address.' };
  }
  if (password.length < 6) {
    return { success: false, error: 'Invalid password. Please try again.' };
  }
  localStorage.setItem(AUTH_KEY, 'true');
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function register(name: string, email: string, password: string, role: UserRole = 'content-creator'): { success: boolean; user?: User; error?: string } {
  if (MOCK_USERS[email.toLowerCase()]) {
    return { success: false, error: 'An account with this email already exists.' };
  }
  const newUser: User = {
    id: generateId(),
    name,
    email: email.toLowerCase(),
    role,
    plan: 'free',
    createdAt: new Date().toISOString().split('T')[0],
  };
  localStorage.setItem(AUTH_KEY, 'true');
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  return { success: true, user: newUser };
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUser(): User | null {
  const isAuth = localStorage.getItem(AUTH_KEY);
  if (!isAuth) return null;
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function updateUserProfile(updates: Partial<User>): User | null {
  const current = getCurrentUser();
  if (!current) return null;
  const updated = { ...current, ...updates };
  localStorage.setItem(USER_KEY, JSON.stringify(updated));
  return updated;
}

export function getDashboardRoute(role: UserRole): string {
  const routes: Record<UserRole, string> = {
    'content-creator': '/dashboard/creator',
    'business-owner': '/dashboard/business',
    'designer': '/dashboard/designer',
    'marketing-agency': '/dashboard/agency',
    'freelancer': '/dashboard/freelancer',
    'enterprise-team': '/dashboard/team',
    'admin': '/dashboard/admin',
  };
  return routes[role] || '/dashboard/creator';
}
