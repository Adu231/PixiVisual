export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  plan: 'free' | 'pro' | 'business' | 'enterprise';
  createdAt: string;
  bio?: string;
  company?: string;
  website?: string;
  location?: string;
}

export type UserRole = 'content-creator' | 'business-owner' | 'designer' | 'marketing-agency' | 'freelancer' | 'enterprise-team' | 'admin';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface DesignTemplate {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  isPremium: boolean;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  type: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  impressions: number;
  clicks: number;
  conversions: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
