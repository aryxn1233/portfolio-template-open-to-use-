import React, { useState } from 'react';
import type { Project } from '../types';
import { LinkIcon, VideoIcon, CodeIcon, DeleteIcon } from './Icons';
import { getGoogleDriveEmbedUrl, isGoogleDriveUrl } from '../src/utils/videoUtils';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
  onDelete: (projectId: string) => void;
  isAuthenticated: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject, onDelete, isAuthenticated }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete(project.id);
    }
  };

  return (
    <div 
      className="bg-slate-800 rounded-lg overflow-hidden shadow-lg group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/20 cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProject(project)}
      aria-label={`View details for ${project.title}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelectProject(project)}
    >
      {isAuthenticated && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
          aria-label="Delete project"
        >
          <DeleteIcon className="w-5 h-5" />
        </button>
      )}
      <div className="relative w-full h-48">
        {isGoogleDriveUrl(project.imageUrl) ? (
          <iframe
            src={getGoogleDriveEmbedUrl(project.imageUrl)}
            className="w-full h-full object-cover"
            allow="autoplay"
            allowFullScreen
          />
        ) : (
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        )}
        {isHovered && project.workingVideoUrl && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <VideoIcon className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm font-semibold">View Video</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-brand-muted mb-4 text-sm leading-relaxed h-16">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs font-semibold bg-sky-900/50 text-sky-300 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center font-semibold text-brand-primary group-hover:text-sky-400 transition-colors"
          >
            View Project <LinkIcon className="ml-2 w-4 h-4" />
          </a>
          {project.codeVideoUrl && (
             <a
              href={project.codeVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center font-semibold text-brand-primary group-hover:text-sky-400 transition-colors"
            >
              Code Video <CodeIcon className="ml-2 w-4 h-4" />
            </a>
          )}
          {project.workingVideoUrl && (
             <a
              href={project.workingVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center font-semibold text-brand-primary group-hover:text-sky-400 transition-colors"
            >
              Working Video <VideoIcon className="ml-2 w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
