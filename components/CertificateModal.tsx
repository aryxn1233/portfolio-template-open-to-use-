import React from 'react';
import type { Certification } from '../types';
import { getGoogleDriveEmbedUrl } from '../src/utils/videoUtils';

interface CertificateModalProps {
  certificate: Certification | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const isGoogleDriveUrl = certificate.imageUrl.includes('drive.google.com');
  const embedUrl = isGoogleDriveUrl ? getGoogleDriveEmbedUrl(certificate.imageUrl) : certificate.imageUrl;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity animate-fade-in-up" 
        style={{ animationDuration: '0.3s' }} 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-3xl m-4 transform transition-transform scale-100 max-h-[90vh] flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{certificate.name}</h2>
            <p className="text-brand-muted">Issued by {certificate.issuer}</p>
          </div>
          <button onClick={onClose} className="text-4xl font-light text-brand-muted hover:text-white leading-none">&times;</button>
        </div>
        
        <div className="flex-grow overflow-auto">
          {isGoogleDriveUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full min-h-[400px] rounded-md"
              allow="autoplay"
              allowFullScreen
            />
          ) : (
            <img 
              src={certificate.imageUrl} 
              alt={`Certificate for ${certificate.name}`} 
              className="w-full h-auto rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};
