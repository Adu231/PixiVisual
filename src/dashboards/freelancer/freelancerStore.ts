import { useState, useEffect } from 'react';

// ──────────────────────────────────────────────────────────────────
// INTERFACES & MODEL TYPES
// ──────────────────────────────────────────────────────────────────

export interface FreelancerPortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  likes: number;
  views: number;
}

export interface FreelancerProject {
  id: string;
  title: string;
  client: string;
  due: string;
  budget: number;
  progress: number;
  status: 'in-progress' | 'review' | 'completed' | 'new';
  desc?: string;
  deliverables?: string[];
}

export interface FreelancerProposal {
  id: string;
  title: string;
  client: string;
  budget: string;
  sent: string;
  status: 'pending' | 'accepted' | 'rejected';
  coverLetter?: string;
}

export interface FreelancerDeletedItem {
  id: string;
  title: string;
  category: string; // e.g. "Portfolio Item", "Proposal", "Project" or original category
  image?: string;
  deletedAt: string;
  originalType: 'portfolio' | 'project' | 'proposal';
  originalData: any; // original item object to allow full restoration
}

// ──────────────────────────────────────────────────────────────────
// CONSTANTS & DEFAULTS
// ──────────────────────────────────────────────────────────────────

const PORTFOLIO_KEY = 'pixivisual_freelancer_portfolio';
const PROJECTS_KEY = 'pixivisual_freelancer_projects';
const PROPOSALS_KEY = 'pixivisual_freelancer_proposals';
const HISTORY_KEY = 'pixivisual_freelancer_deleted_history';

const DEFAULT_PORTFOLIO: FreelancerPortfolioItem[] = [
  { id: '1', title: 'Brand Identity for TechCo', category: 'Branding', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop', likes: 124, views: 1840 },
  { id: '2', title: 'E-commerce UI Redesign', category: 'UI/UX', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop', likes: 98, views: 1240 },
  { id: '3', title: 'Mobile App Design', category: 'Mobile UI', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=300&h=200&fit=crop', likes: 156, views: 2100 },
  { id: '4', title: 'Marketing Campaign Assets', category: 'Marketing', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', likes: 87, views: 980 },
  { id: '5', title: 'Logo Design Collection', category: 'Branding', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop', likes: 203, views: 3200 },
  { id: '6', title: 'Social Media Package', category: 'Social Media', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=200&fit=crop', likes: 145, views: 1780 },
];

const DEFAULT_PROJECTS: FreelancerProject[] = [
  { id: '1', title: 'Website Redesign', client: 'StartupX', due: 'Jul 15', budget: 2400, progress: 65, status: 'in-progress', desc: 'Revamping the front-end layout system, design editor grid, and optimizing overall page speed.', deliverables: ['Landing Page Wireframes', 'Tailwind Component Library', 'SEO Headings Structure Audit', 'Responsive Mobile Testing'] },
  { id: '2', title: 'Brand Refresh', client: 'LocalBiz', due: 'Jul 22', budget: 1800, progress: 30, status: 'in-progress', desc: 'Creating a new logo, color guidelines system, and typography presets for style guides.', deliverables: ['Primary & Secondary Color Tokens', 'Figma Icon Kit Hand-off', 'Modern Logo Variants'] },
  { id: '3', title: 'Poster Design', client: 'EventCo', due: 'Jul 8', budget: 600, progress: 90, status: 'review', desc: 'Designing eye-catching vector posters for print marketing campaign in dynamic gradients.', deliverables: ['Concept Art Options', 'High-res Vector Source PDF'] },
  { id: '4', title: 'Logo Design Pack', client: 'RetailCorp', due: 'Jun 28', budget: 1200, progress: 100, status: 'completed', desc: 'Designed a vector logo set and brand visual guidelines.', deliverables: ['Vector Logo SVG Files', 'Primary & Secondary Color Tokens Guidelines', 'Final Asset Guidelines PDF'] },
];

const DEFAULT_PROPOSALS: FreelancerProposal[] = [
  { id: '1', title: 'E-commerce Product Photos', client: 'RetailBrand', budget: '$800-1200', sent: '2d ago', status: 'pending', coverLetter: 'Hi there, I have extensive experience in visual content styling and premium photo mockups. I would love to help you build out beautiful retail visual guide books.' },
  { id: '2', title: 'App Icon Set', client: 'MobileStart', budget: '$400-600', sent: '4d ago', status: 'accepted', coverLetter: 'Hello! I can deliver high-quality vector app icons with a state-of-the-art visual style. I will provide presets for both iOS and Android stores.' },
  { id: '3', title: 'Annual Report Design', client: 'Corp Inc', budget: '$1500-2000', sent: '1w ago', status: 'rejected', coverLetter: 'I will design a sleek corporate report deck with custom recharts graphs and rich typography.' },
];

// ──────────────────────────────────────────────────────────────────
// GETTER & SETTER HELPER FUNCTIONS
// ──────────────────────────────────────────────────────────────────

export function getFreelancerPortfolio(): FreelancerPortfolioItem[] {
  const data = localStorage.getItem(PORTFOLIO_KEY);
  if (!data) {
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(DEFAULT_PORTFOLIO));
    return DEFAULT_PORTFOLIO;
  }
  try { return JSON.parse(data); } catch { return DEFAULT_PORTFOLIO; }
}

export function saveFreelancerPortfolio(items: FreelancerPortfolioItem[]) {
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('freelancer_portfolio_changed'));
}

export function getFreelancerProjects(): FreelancerProject[] {
  const data = localStorage.getItem(PROJECTS_KEY);
  if (!data) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
  }
  try { return JSON.parse(data); } catch { return DEFAULT_PROJECTS; }
}

export function saveFreelancerProjects(projects: FreelancerProject[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event('freelancer_projects_changed'));
}

export function getFreelancerProposals(): FreelancerProposal[] {
  const data = localStorage.getItem(PROPOSALS_KEY);
  if (!data) {
    localStorage.setItem(PROPOSALS_KEY, JSON.stringify(DEFAULT_PROPOSALS));
    return DEFAULT_PROPOSALS;
  }
  try { return JSON.parse(data); } catch { return DEFAULT_PROPOSALS; }
}

export function saveFreelancerProposals(proposals: FreelancerProposal[]) {
  localStorage.setItem(PROPOSALS_KEY, JSON.stringify(proposals));
  window.dispatchEvent(new Event('freelancer_proposals_changed'));
}

export function getFreelancerHistory(): FreelancerDeletedItem[] {
  const data = localStorage.getItem(HISTORY_KEY);
  if (!data) return [];
  try { return JSON.parse(data); } catch { return []; }
}

export function saveFreelancerHistory(history: FreelancerDeletedItem[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  window.dispatchEvent(new Event('freelancer_history_changed'));
}

// ──────────────────────────────────────────────────────────────────
// CRUD MUTATIONS
// ──────────────────────────────────────────────────────────────────

// 1. PORTFOLIO
export function addFreelancerPortfolio(item: Omit<FreelancerPortfolioItem, 'id' | 'likes' | 'views'>) {
  const items = getFreelancerPortfolio();
  const newItem: FreelancerPortfolioItem = {
    ...item,
    id: Math.random().toString(36).substring(2, 9),
    likes: 0,
    views: 0
  };
  saveFreelancerPortfolio([newItem, ...items]);
  return newItem;
}

export function updateFreelancerPortfolio(id: string, updates: Partial<Omit<FreelancerPortfolioItem, 'id'>>) {
  const items = getFreelancerPortfolio();
  saveFreelancerPortfolio(items.map(i => i.id === id ? { ...i, ...updates } : i));
}

export function deleteFreelancerPortfolio(id: string) {
  const items = getFreelancerPortfolio();
  const target = items.find(i => i.id === id);
  if (target) {
    addFreelancerHistoryItem({
      id: target.id,
      title: target.title,
      category: target.category,
      image: target.image,
      originalType: 'portfolio',
      originalData: target
    });
  }
  saveFreelancerPortfolio(items.filter(i => i.id !== id));
}

// 2. PROJECTS
export function addFreelancerProject(project: Omit<FreelancerProject, 'id' | 'progress'>) {
  const list = getFreelancerProjects();
  const newProj: FreelancerProject = {
    ...project,
    id: Math.random().toString(36).substring(2, 9),
    progress: 0
  };
  saveFreelancerProjects([newProj, ...list]);
  return newProj;
}

export function updateFreelancerProject(id: string, updates: Partial<Omit<FreelancerProject, 'id'>>) {
  const list = getFreelancerProjects();
  saveFreelancerProjects(list.map(p => p.id === id ? { ...p, ...updates } : p));
}

export function deleteFreelancerProject(id: string) {
  const list = getFreelancerProjects();
  const target = list.find(p => p.id === id);
  if (target) {
    addFreelancerHistoryItem({
      id: target.id,
      title: target.title,
      category: `Active Contract - ${target.client}`,
      originalType: 'project',
      originalData: target
    });
  }
  saveFreelancerProjects(list.filter(p => p.id !== id));
}

// 3. PROPOSALS
export function addFreelancerProposal(proposal: Omit<FreelancerProposal, 'id' | 'sent' | 'status'>) {
  const list = getFreelancerProposals();
  const newProp: FreelancerProposal = {
    ...proposal,
    id: Math.random().toString(36).substring(2, 9),
    sent: 'Just now',
    status: 'pending'
  };
  saveFreelancerProposals([newProp, ...list]);
  return newProp;
}

export function updateFreelancerProposal(id: string, updates: Partial<Omit<FreelancerProposal, 'id'>>) {
  const list = getFreelancerProposals();
  saveFreelancerProposals(list.map(p => p.id === id ? { ...p, ...updates } : p));
}

export function deleteFreelancerProposal(id: string) {
  const list = getFreelancerProposals();
  const target = list.find(p => p.id === id);
  if (target) {
    addFreelancerHistoryItem({
      id: target.id,
      title: target.title,
      category: `Job Proposal - ${target.client}`,
      originalType: 'proposal',
      originalData: target
    });
  }
  saveFreelancerProposals(list.filter(p => p.id !== id));
}

// 4. HISTORY HELPERS
function addFreelancerHistoryItem(item: Omit<FreelancerDeletedItem, 'deletedAt'>) {
  const history = getFreelancerHistory();
  const newItem: FreelancerDeletedItem = {
    ...item,
    deletedAt: new Date().toISOString()
  };
  saveFreelancerHistory([newItem, ...history]);
}

export function deleteFreelancerHistoryItem(id: string) {
  const history = getFreelancerHistory();
  saveFreelancerHistory(history.filter(h => h.id !== id));
}

export function restoreFreelancerHistoryItem(id: string) {
  const history = getFreelancerHistory();
  const target = history.find(h => h.id === id);
  if (target) {
    if (target.originalType === 'portfolio') {
      const active = getFreelancerPortfolio();
      saveFreelancerPortfolio([target.originalData, ...active]);
    } else if (target.originalType === 'project') {
      const active = getFreelancerProjects();
      saveFreelancerProjects([target.originalData, ...active]);
    } else if (target.originalType === 'proposal') {
      const active = getFreelancerProposals();
      saveFreelancerProposals([target.originalData, ...active]);
    }
    deleteFreelancerHistoryItem(id);
    return true;
  }
  return false;
}

// ──────────────────────────────────────────────────────────────────
// REACT HOOKS FOR LOCAL REACTIVE STATE UPDATE
// ──────────────────────────────────────────────────────────────────

export function useFreelancerPortfolioState() {
  const [items, setItems] = useState<FreelancerPortfolioItem[]>(getFreelancerPortfolio);
  useEffect(() => {
    const handle = () => setItems(getFreelancerPortfolio());
    window.addEventListener('freelancer_portfolio_changed', handle);
    return () => window.removeEventListener('freelancer_portfolio_changed', handle);
  }, []);
  return [items, setItems] as const;
}

export function useFreelancerProjectsState() {
  const [projects, setProjects] = useState<FreelancerProject[]>(getFreelancerProjects);
  useEffect(() => {
    const handle = () => setProjects(getFreelancerProjects());
    window.addEventListener('freelancer_projects_changed', handle);
    return () => window.removeEventListener('freelancer_projects_changed', handle);
  }, []);
  return [projects, setProjects] as const;
}

export function useFreelancerProposalsState() {
  const [proposals, setProposals] = useState<FreelancerProposal[]>(getFreelancerProposals);
  useEffect(() => {
    const handle = () => setProposals(getFreelancerProposals());
    window.addEventListener('freelancer_proposals_changed', handle);
    return () => window.removeEventListener('freelancer_proposals_changed', handle);
  }, []);
  return [proposals, setProposals] as const;
}

export function useFreelancerHistoryState() {
  const [history, setHistory] = useState<FreelancerDeletedItem[]>(getFreelancerHistory);
  useEffect(() => {
    const handle = () => setHistory(getFreelancerHistory());
    window.addEventListener('freelancer_history_changed', handle);
    return () => window.removeEventListener('freelancer_history_changed', handle);
  }, []);
  return [history, setHistory] as const;
}
