import { useState, useEffect, useRef } from 'react';
import { Camera, Save, User as UserIcon, Mail, Building, Globe, MapPin, FileText, Lock } from 'lucide-react';
import DashboardLayout, { getSidebarItemsForRole, getRoleLabel } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';
import { getInitials } from '@/lib/utils';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    website: user?.website || '',
    location: user?.location || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setAvatarError(false);
  }, [form.avatar]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast('error', 'File size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setForm(prev => ({ ...prev, avatar: base64 }));
        toast('success', 'Profile image selected. Click Save Changes to update.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    updateProfile(form);
    setIsSaving(false);
    toast('success', 'Profile updated successfully!');
  };

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const eErrors: Record<string, string> = {};
    if (!passwordForm.currentPassword) {
      eErrors.currentPassword = 'Current password is required';
    }
    if (!passwordForm.newPassword) {
      eErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 6) {
      eErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      eErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(eErrors).length > 0) {
      setPasswordErrors(eErrors);
      return;
    }

    setPasswordErrors({});
    setIsChangingPassword(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsChangingPassword(false);
    
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    toast('success', 'Password updated successfully!');
  };

  if (!user) return null;

  return (
    <DashboardLayout
      sidebarItems={getSidebarItemsForRole(user.role)}
      title="Profile"
      roleLabel={getRoleLabel(user.role)}
    >
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground mb-1">Your Profile</h1>
          <p className="text-muted-foreground text-sm">Manage your personal information and public profile.</p>
        </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Avatar + Quick Info */}
            <div className="space-y-5">
              <div className="p-6 rounded-2xl border border-border bg-card text-center">
                <div className="relative inline-block mb-4">
                  {form.avatar ? (
                    <img 
                      src={form.avatar} 
                      alt={user.name} 
                      className="w-20 h-20 rounded-2xl object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`;
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full gradient-primary flex items-center justify-center border-2 border-background cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
                <h3 className="text-base font-semibold text-foreground">{user.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{user.role.replace('-', ' ')}</p>
                <span className="inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">{user.plan} Plan</span>
              </div>
              <div className="p-4 rounded-2xl border border-border bg-card space-y-3">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Account Details</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground capitalize">
                  <UserIcon className="w-3.5 h-3.5 text-primary" />
                  <span>{user.role.replace(/-/g, ' ')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Building className="w-3.5 h-3.5 text-primary" />
                  <span>{user.company || 'Not set'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{user.location || 'Not set'}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-display font-semibold text-foreground mb-5">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input value={form.name} onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({...p, name: ''})); }} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${errors.name ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'}`} placeholder="Your full name" />
                      </div>
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="email" value={form.email} onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({...p, email: ''})); }} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${errors.email ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'}`} placeholder="you@company.com" />
                      </div>
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Company</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Your company" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="City, Country" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input value={form.website} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="https://yourwebsite.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} rows={3} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Tell us a bit about yourself..." />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{form.bio.length}/200 characters</p>
                  </div>
                  <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-glow-purple hover:-translate-y-0.5">
                    {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
                  </button>
                </div>
              </div>

              {/* Change Password Card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-display font-semibold text-foreground mb-5">Change Password</h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={e => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${passwordErrors.currentPassword ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                          placeholder="••••••••"
                        />
                      </div>
                      {passwordErrors.currentPassword && <p className="mt-1 text-xs text-destructive">{passwordErrors.currentPassword}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${passwordErrors.newPassword ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                          placeholder="At least 6 characters"
                        />
                      </div>
                      {passwordErrors.newPassword && <p className="mt-1 text-xs text-destructive">{passwordErrors.newPassword}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${passwordErrors.confirmPassword ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                          placeholder="Confirm new password"
                        />
                      </div>
                      {passwordErrors.confirmPassword && <p className="mt-1 text-xs text-destructive">{passwordErrors.confirmPassword}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-glow-purple hover:-translate-y-0.5"
                  >
                    {isChangingPassword ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Change Password
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
  );
}
