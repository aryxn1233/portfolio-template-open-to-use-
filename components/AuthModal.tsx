
import React, { useState, useEffect } from 'react';
import type { Project, Certification } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdd: (project: Project) => void;
  onCertificateAdd: (certificate: Certification) => void;
  isAuthenticated: boolean;
  setAuthenticated: (isAuth: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onProjectAdd, onCertificateAdd, isAuthenticated, setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [formType, setFormType] = useState<'project' | 'certificate'>('project');

  // Project form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [codeVideoUrl, setCodeVideoUrl] = useState('');
  const [workingVideoUrl, setWorkingVideoUrl] = useState('');
  const [tags, setTags] = useState('');

  // Certificate form state
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certImageUrl, setCertImageUrl] = useState('');

  const resetProjectForm = () => {
    setTitle('');
    setDescription('');
    setLink('');
    setCodeVideoUrl('');
    setWorkingVideoUrl('');
    setTags('');
  }

  const resetCertificateForm = () => {
    setCertName('');
    setCertIssuer('');
    setCertImageUrl('');
  }

  useEffect(() => {
    if (!isOpen) {
      // Reset all state on close
      setUsername('');
      setPassword('');
      setError('');
      resetProjectForm();
      resetCertificateForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'aryan' && password === 'password123') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      title,
      description,
      link,
      tags: tags.split(',').map(tag => tag.trim()),
      imageUrl: `https://picsum.photos/seed/${title.replace(/\s+/g, '-')}/600/400`,
      codeVideoUrl: codeVideoUrl || undefined,
      workingVideoUrl: workingVideoUrl || undefined,
    };
    onProjectAdd(newProject);
    resetProjectForm(); // Reset form after submission
  };
  
  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCertificate: Certification = {
        name: certName,
        issuer: certIssuer,
        imageUrl: certImageUrl,
    };
    onCertificateAdd(newCertificate);
    resetCertificateForm(); // Reset form after submission
  }
  
  const getTabClass = (tabName: 'project' | 'certificate') => {
    const baseClass = "flex-1 py-2 text-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-t-md";
    if (formType === tabName) {
        return `${baseClass} bg-slate-700 text-white`;
    }
    return `${baseClass} text-slate-400 hover:bg-slate-600`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8 w-full max-w-md m-4 transform transition-transform scale-100" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{isAuthenticated ? 'Add Content' : 'Admin Authentication'}</h2>
          <button onClick={onClose} className="text-4xl font-light text-brand-muted hover:text-white leading-none">&times;</button>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none"
                placeholder=""
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-brand-primary hover:bg-sky-400 text-white font-bold py-2 px-4 rounded-md transition-colors">
              Login
            </button>
          </form>
        ) : (
          <div>
            <div className="flex border-b border-slate-600 mb-4">
                <button className={getTabClass('project')} onClick={() => setFormType('project')}>Project</button>
                <button className={getTabClass('certificate')} onClick={() => setFormType('certificate')}>Certificate</button>
            </div>
            
            {formType === 'project' && (
                <form onSubmit={handleAddProject} className="space-y-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                    <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="title">Project Title</label>
                    <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none"></textarea>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="link">Project Link</label>
                    <input id="link" type="url" value={link} onChange={e => setLink(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="codeVideoUrl">Code Video Link (Optional)</label>
                    <input id="codeVideoUrl" type="url" value={codeVideoUrl} onChange={e => setCodeVideoUrl(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="workingVideoUrl">Working Video Link (Optional)</label>
                    <input id="workingVideoUrl" type="url" value={workingVideoUrl} onChange={e => setWorkingVideoUrl(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="tags">Tags (comma-separated)</label>
                    <input id="tags" type="text" value={tags} onChange={e => setTags(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" placeholder="React, Node.js, API" />
                    </div>
                    <button type="submit" className="w-full bg-brand-primary hover:bg-sky-400 text-white font-bold py-2 px-4 rounded-md transition-colors">
                    Add Project
                    </button>
                </form>
            )}
            {formType === 'certificate' && (
                <form onSubmit={handleAddCertificate} className="space-y-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="certName">Certificate Name</label>
                        <input id="certName" type="text" value={certName} onChange={e => setCertName(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="certIssuer">Issuer</label>
                        <input id="certIssuer" type="text" value={certIssuer} onChange={e => setCertIssuer(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="certImageUrl">Certificate Image URL</label>
                        <input id="certImageUrl" type="url" value={certImageUrl} onChange={e => setCertImageUrl(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                    </div>
                    <button type="submit" className="w-full bg-brand-primary hover:bg-sky-400 text-white font-bold py-2 px-4 rounded-md transition-colors mt-4">
                        Add Certificate
                    </button>
                </form>
            )}

          </div>
        )}
      </div>
    </div>
  );
};