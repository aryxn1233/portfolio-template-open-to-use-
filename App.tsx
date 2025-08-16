import React, { useState, useEffect } from 'react';
import type { Project, Certification, Education, Skill } from './types';
import { PERSONAL_INFO, SKILLS, INITIAL_PROJECTS, CERTIFICATIONS, EDUCATION_INFO } from './constants';
import { ProjectCard } from './components/ProjectCard';
import { Section } from './components/Section';
import { AuthModal } from './components/AuthModal';
import { AdminPanel } from './components/AdminPanel';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CertificateModal } from './components/CertificateModal';
import { EmailIcon, PhoneIcon, UpworkIcon } from './components/Icons';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [certifications, setCertifications] = useState<Certification[]>(CERTIFICATIONS);
  const [educationInfo, setEducationInfo] = useState<Education>(EDUCATION_INFO);
  const [skills, setSkills] = useState<Skill[]>(SKILLS);
  const [personalInfo, setPersonalInfo] = useState(PERSONAL_INFO);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certification | null>(null);


  const updateEducationDetails = (projects: Project[]) => {
    if (projects.length === 0) return;
    
    const projectNames = projects.map(p => p.title);
    const lastProject = projectNames[0]; // Most recent project
    
    let updatedDetails = educationInfo.details;
    
    // If this is the first project being added
    if (!updatedDetails.includes('Completed projects including')) {
      updatedDetails = `${updatedDetails} Completed projects including ${lastProject}.`;
    } else {
      // Extract existing projects from the details string
      const match = updatedDetails.match(/Completed projects including (.+?)\./);
      if (match) {
        const existingProjects = match[1].split(', ').filter(p => p.trim());
        
        // Check if project already exists
        if (!existingProjects.some(p => p.includes(lastProject))) {
          existingProjects.unshift(lastProject);
          updatedDetails = updatedDetails.replace(
            /Completed projects including (.+?)\./,
            `Completed projects including ${existingProjects.join(', ')}.`
          );
        }
      } else {
        updatedDetails = `${updatedDetails} Completed projects including ${lastProject}.`;
      }
    }
    
    setEducationInfo(prev => ({ ...prev, details: updatedDetails }));
  };

  const handleAddProject = (project: Project) => {
    setProjects(prevProjects => {
      const newProjects = [project, ...prevProjects];
      updateEducationDetails(newProjects);
      return newProjects;
    });
  };

  const handleAddCertificate = (certificate: Certification) => {
    setCertifications(prevCerts => [certificate, ...prevCerts]);
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans">
      <main className="container mx-auto px-6 py-12 md:px-12 md:py-20 lg:py-24">
        {/* Hero Section */}
        <section className="mb-24 text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
            {PERSONAL_INFO.name}
          </h1>
          <h2 className="text-xl md:text-2xl text-brand-muted font-medium mb-6">{PERSONAL_INFO.title}</h2>
          <div className="flex justify-center items-center space-x-6 text-brand-muted">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center space-x-2 hover:text-brand-primary transition-colors">
              <EmailIcon className="w-5 h-5" />
              <span className="hidden md:inline">{PERSONAL_INFO.email}</span>
            </a>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center space-x-2 hover:text-brand-primary transition-colors">
              <PhoneIcon className="w-5 h-5" />
               <span className="hidden md:inline">{PERSONAL_INFO.phone}</span>
            </a>
            <a href={PERSONAL_INFO.upwork} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-brand-primary transition-colors">
              <UpworkIcon className="w-5 h-5" />
               <span className="hidden md:inline">Upwork Profile</span>
            </a>
          </div>
        </section>

        {/* Summary Section */}
        <Section title="About Me" animationDelay="200ms">
          <p className="text-lg text-brand-muted max-w-3xl mx-auto text-center leading-relaxed">
            {PERSONAL_INFO.summary}
          </p>
        </Section>

        {/* Skills Section */}
        <Section title="Technical Skills" animationDelay="300ms">
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <span key={index} className="bg-slate-800 text-sky-300 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                  {skill.name}
                </span>
              ))}
            </div>
        </Section>

        {/* Projects Section */}
        <Section title="Projects" animationDelay="400ms">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                onSelectProject={setSelectedProject} 
                onDelete={handleDeleteProject} 
                isAuthenticated={isAuthenticated} 
              />
            ))}
          </div>
          {isAuthenticated && (
             <div className="text-center mt-12 space-x-4">
                <button
                    onClick={() => setIsAdminPanelOpen(true)}
                    className="bg-brand-primary hover:bg-sky-400 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
                >
                    Admin Panel
                </button>
                <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
                >
                    Add Content
                </button>
            </div>
          )}
           {!isAuthenticated && (
             <div className="text-center mt-12">
                <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
                >
                    Admin Login
                </button>
            </div>
          )}
        </Section>

        {/* Education & Certifications Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Section title="Education" animationDelay="500ms">
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-bold text-white">{educationInfo.degree} in {educationInfo.major}</h3>
                    <p className="text-brand-primary font-semibold mt-1">{educationInfo.university}</p>
                    <p className="text-brand-muted text-sm my-2">{educationInfo.period}</p>
                    <p className="text-slate-300">{educationInfo.details}</p>
                </div>
            </Section>

            <Section title="Certifications" animationDelay="600ms">
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    <ul className="space-y-1">
                        {certifications.map((cert, index) => (
                            <li 
                                key={index} 
                                className="flex items-center p-2 rounded-md transition-colors hover:bg-slate-700 cursor-pointer"
                                onClick={() => setSelectedCertificate(cert)}
                                onKeyDown={(e) => e.key === 'Enter' && setSelectedCertificate(cert)}
                                tabIndex={0}
                                role="button"
                                aria-label={`View certificate for ${cert.name}`}
                            >
                                <span className="text-brand-primary mr-3">✦</span>
                                <span className="text-white font-medium">{cert.name}</span>
                                <span className="text-brand-muted ml-auto text-sm">{cert.issuer}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>
        </div>

      </main>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onProjectAdd={handleAddProject}
        onCertificateAdd={handleAddCertificate}
        isAuthenticated={isAuthenticated}
        setAuthenticated={setIsAuthenticated}
      />
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        projects={projects}
        certifications={certifications}
        educationInfo={educationInfo}
        skills={skills}
        personalInfo={personalInfo}
        onUpdateProjects={setProjects}
        onUpdateCertifications={setCertifications}
        onUpdateEducation={setEducationInfo}
        onUpdateSkills={setSkills}
        onUpdatePersonalInfo={setPersonalInfo}
      />
       {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
      <footer className="text-center py-8 border-t border-slate-800">
        <p className="text-brand-muted">&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;