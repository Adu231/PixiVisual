import { useState, useEffect } from 'react';

export interface CreatorDesign {
  id: string;
  title: string;
  type: string;
  thumb: string;
  updated: string;
  status: 'published' | 'draft';
  style?: string;
  ratio?: string;
}

const STORAGE_KEY = 'pixivisual_creator_designs';

const DEFAULT_DESIGNS: CreatorDesign[] = [
  { id: '1', title: 'Summer Instagram Post', type: 'Social Media', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', updated: '2h ago', status: 'published', style: 'Neon', ratio: '1:1' },
  { id: '2', title: 'YouTube Thumbnail', type: 'YouTube', thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop', updated: '5h ago', status: 'draft', style: 'Photorealistic', ratio: '16:9' },
  { id: '3', title: 'Blog Cover Image', type: 'Blog', thumb: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=400&fit=crop', updated: '1d ago', status: 'published', style: 'Illustration', ratio: '3:2' },
  { id: '4', title: 'Story Template', type: 'Instagram Story', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', updated: '2d ago', status: 'published', style: 'Minimalist', ratio: '9:16' },
  { id: '5', title: 'LinkedIn Banner', type: 'LinkedIn', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop', updated: '3d ago', status: 'published', style: '3D Render', ratio: '16:9' },
  { id: '6', title: 'Product Ad', type: 'Ad Creative', thumb: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop', updated: '4d ago', status: 'draft', style: 'Vintage', ratio: '4:5' },
];

export function getCreatorDesigns(): CreatorDesign[] {
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

export function saveCreatorDesigns(designs: CreatorDesign[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  window.dispatchEvent(new Event('creator_designs_changed'));
}

export function addCreatorDesign(design: Omit<CreatorDesign, 'id' | 'updated'>) {
  const designs = getCreatorDesigns();
  const newDesign: CreatorDesign = {
    ...design,
    id: Math.random().toString(36).substring(2, 9),
    updated: 'Just now',
  };
  saveCreatorDesigns([newDesign, ...designs]);
  return newDesign;
}

export function updateCreatorDesign(id: string, updates: Partial<Omit<CreatorDesign, 'id'>>) {
  const designs = getCreatorDesigns();
  const updated = designs.map(d => d.id === id ? { ...d, ...updates, updated: 'Just now' } : d);
  saveCreatorDesigns(updated);
}

export function deleteCreatorDesign(id: string) {
  const designs = getCreatorDesigns();
  const filtered = designs.filter(d => d.id !== id);
  saveCreatorDesigns(filtered);
}

export function useCreatorDesignsState() {
  const [designs, setDesigns] = useState<CreatorDesign[]>(getCreatorDesigns);

  useEffect(() => {
    const handleUpdate = () => {
      setDesigns(getCreatorDesigns());
    };
    window.addEventListener('creator_designs_changed', handleUpdate);
    return () => {
      window.removeEventListener('creator_designs_changed', handleUpdate);
    };
  }, []);

  return [designs, setDesigns] as const;
}
