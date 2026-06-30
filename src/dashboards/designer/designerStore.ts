import { useState, useEffect } from 'react';

export interface DesignerDesign {
  id: string;
  title: string;
  type: string;
  thumb: string;
  updated: string;
  status: 'published' | 'draft';
  price?: number;
  sales?: number;
  revenue?: number;
  rating?: number;
  views?: number;
  downloads?: number;
}

const STORAGE_KEY = 'pixivisual_designer_designs';

const DEFAULT_DESIGNS: DesignerDesign[] = [
  { id: '1', title: 'Minimal Business Card', type: 'Branding', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop', updated: '1h ago', status: 'published', price: 3, sales: 234, downloads: 234, rating: 4.8, revenue: 702, views: 3400 },
  { id: '2', title: 'Bold Social Media Kit', type: 'Social Media', thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop', updated: '5h ago', status: 'published', price: 5, sales: 189, downloads: 189, rating: 4.9, revenue: 945, views: 2800 },
  { id: '3', title: 'Corporate Presentation', type: 'Presentation', thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', updated: '1d ago', status: 'draft', price: 8, sales: 142, downloads: 142, rating: 4.7, revenue: 1136, views: 1900 },
  { id: '4', title: 'E-commerce Promo Set', type: 'Marketing', thumb: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop', updated: '2d ago', status: 'published', price: 10, sales: 98, downloads: 98, rating: 4.6, revenue: 980, views: 1500 },
  { id: '5', title: 'App UI Concept', type: 'UI/UX', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', updated: '3d ago', status: 'draft', price: 12, sales: 0, downloads: 0, rating: 0, revenue: 0, views: 120 },
  { id: '6', title: 'Poster Collection', type: 'Print', thumb: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', updated: '5d ago', status: 'published', price: 6, sales: 45, downloads: 45, rating: 4.5, revenue: 270, views: 550 },
];

export function getDesignerDesigns(): DesignerDesign[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DESIGNS));
    return DEFAULT_DESIGNS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_DESIGNS;
  }
}

export function saveDesignerDesigns(designs: DesignerDesign[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  window.dispatchEvent(new Event('designer_designs_changed'));
}

export function addDesignerDesign(design: Omit<DesignerDesign, 'id' | 'updated'>) {
  const designs = getDesignerDesigns();
  const newDesign: DesignerDesign = {
    ...design,
    id: Math.random().toString(36).substring(2, 9),
    updated: 'Just now',
    sales: design.sales ?? 0,
    downloads: design.downloads ?? 0,
    rating: design.rating ?? 5.0,
    revenue: design.revenue ?? 0,
    views: design.views ?? 0,
  };
  saveDesignerDesigns([newDesign, ...designs]);
  return newDesign;
}

export function updateDesignerDesign(id: string, updates: Partial<Omit<DesignerDesign, 'id'>>) {
  const designs = getDesignerDesigns();
  const updated = designs.map(d => d.id === id ? { ...d, ...updates, updated: 'Just now' } : d);
  saveDesignerDesigns(updated);
}

export function deleteDesignerDesign(id: string) {
  const designs = getDesignerDesigns();
  const target = designs.find(d => d.id === id);
  if (target) {
    addDeletedHistoryItem({
      id: target.id,
      title: target.title,
      type: target.type,
      thumb: target.thumb,
      price: target.price,
      sales: target.sales
    });
  }
  const filtered = designs.filter(d => d.id !== id);
  saveDesignerDesigns(filtered);
}

export function useDesignerDesignsState() {
  const [designs, setDesigns] = useState<DesignerDesign[]>(getDesignerDesigns);

  useEffect(() => {
    const handleUpdate = () => {
      setDesigns(getDesignerDesigns());
    };
    window.addEventListener('designer_designs_changed', handleUpdate);
    return () => {
      window.removeEventListener('designer_designs_changed', handleUpdate);
    };
  }, []);

  return [designs, setDesigns] as const;
}

// ──────────────────────────────────────────────────────────────────
// DELETED HISTORY STORE
// ──────────────────────────────────────────────────────────────────

const HISTORY_STORAGE_KEY = 'pixivisual_designer_deleted_history';

export interface DeletedItem {
  id: string;
  title: string;
  type: string;
  thumb: string;
  deletedAt: string;
  price?: number;
  sales?: number;
}

export function getDeletedHistory(): DeletedItem[] {
  const data = localStorage.getItem(HISTORY_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveDeletedHistory(history: DeletedItem[]) {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  window.dispatchEvent(new Event('designer_history_changed'));
}

export function addDeletedHistoryItem(item: Omit<DeletedItem, 'deletedAt'>) {
  const history = getDeletedHistory();
  const newItem: DeletedItem = {
    ...item,
    deletedAt: new Date().toISOString()
  };
  saveDeletedHistory([newItem, ...history]);
}

export function deleteDeletedHistoryItem(id: string) {
  const history = getDeletedHistory();
  const filtered = history.filter(item => item.id !== id);
  saveDeletedHistory(filtered);
}

export function useDeletedHistoryState() {
  const [history, setHistory] = useState<DeletedItem[]>(getDeletedHistory);

  useEffect(() => {
    const handleUpdate = () => {
      setHistory(getDeletedHistory());
    };
    window.addEventListener('designer_history_changed', handleUpdate);
    return () => {
      window.removeEventListener('designer_history_changed', handleUpdate);
    };
  }, []);

  return [history, setHistory] as const;
}

export function restoreDeletedHistoryItem(id: string) {
  const history = getDeletedHistory();
  const target = history.find(item => item.id === id);
  if (target) {
    const designs = getDesignerDesigns();
    const restoredDesign: DesignerDesign = {
      id: target.id,
      title: target.title,
      type: target.type,
      thumb: target.thumb,
      updated: 'Just now',
      status: 'draft',
      price: target.price ?? 0,
      sales: target.sales ?? 0,
      downloads: target.sales ?? 0,
      rating: 5.0,
      revenue: (target.price ?? 0) * (target.sales ?? 0),
      views: 0
    };
    saveDesignerDesigns([restoredDesign, ...designs]);
    deleteDeletedHistoryItem(id);
    return true;
  }
  return false;
}
