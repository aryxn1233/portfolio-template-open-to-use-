import React, { useEffect, useState } from 'react';
import type { Project } from '../types';
import { CodeIcon, LinkIcon, VideoIcon } from './Icons';
import { getGoogleDriveEmbedUrl } from '../src/utils/videoUtils';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (project) {
      setIsPlaying(true);
    }
  }, [project]);

  if (!project) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity animate-fade-in-up" 
        style={{ animationDuration: '0.3s' }} 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-4xl m-4 transform transition-transform scale-100 max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-white">{project.title}</h2>
          <button onClick={onClose} className="text-4xl font-light text-brand-muted hover:text-white leading-none">&times;</button>
        </div>
        
        <p className="text-brand-muted mb-6">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs font-semibold bg-sky-900/50 text-sky-300 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {project.workingVideoUrl && (
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center"><VideoIcon className="w-5 h-5 mr-2 text-brand-primary" /> Working Demo</h3>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe
                            src={getGoogleDriveEmbedUrl(project.workingVideoUrl)}
                            className="w-full h-full"
                            allow="autoplay"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
             {project.codeVideoUrl && (
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center"><CodeIcon className="w-5 h-5 mr-2 text-brand-primary" /> Code Walkthrough</h3>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe
                            src={getGoogleDriveEmbedUrl(project.codeVideoUrl)}
                            className="w-full h-full"
                            allow="autoplay"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
        
        <div className="border-t border-slate-700 pt-4 text-center">
             <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-bold text-brand-primary hover:text-sky-400 transition-colors text-lg"
              >
                View Live Project <LinkIcon className="ml-2 w-5 h-5" />
            </a>
        </div>
      </div>
    </div>
  );
};
