import React, { useState } from 'react';
import type { Project, Certification, Education, Skill } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  certifications: Certification[];
  educationInfo: Education;
  skills: Skill[];
  personalInfo: any;
  
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateCertifications: (certifications: Certification[]) => void;
  onUpdateEducation: (education: Education) => void;
  onUpdateSkills: (skills: Skill[]) => void;
  onUpdatePersonalInfo: (personalInfo: any) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  projects,
  certifications,
  educationInfo,
  skills,
  personalInfo,
  onUpdateProjects,
  onUpdateCertifications,
  onUpdateEducation,
  onUpdateSkills,
  onUpdatePersonalInfo
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certifications' | 'education' | 'skills' | 'personal'>('projects');
  
  // Form states
  const [projectForm, setProjectForm] = useState<Project>({
    title: '',
    description: '',
    link: '',
    tags: [],
    imageUrl: '',
    codeVideoUrl: '',
    workingVideoUrl: ''
  });
  
  const [certForm, setCertForm] = useState<Certification>({
    name: '',
    issuer: '',
    imageUrl: ''
  });
  
  const [educationForm, setEducationForm] = useState<Education>(educationInfo);
  const [skillsForm, setSkillsForm] = useState<Skill[]>(skills);
  const [personalForm, setPersonalForm] = useState(personalInfo);

  if (!isOpen) return null;

  const getTabClass = (tabName: string) => {
    const baseClass = "px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-t-md";
    if (activeTab === tabName) {
      return `${baseClass} bg-slate-700 text-white`;
    }
    return `${baseClass} text-slate-400 hover:bg-slate-600`;
  };

  const handleAddProject = () => {
    if (projectForm.title && projectForm.description && projectForm.link) {
      const newProject: Project = {
        ...projectForm,
        tags: typeof projectForm.tags === 'string' 
          ? (projectForm.tags as string).split(',').map(tag => tag.trim())
          : projectForm.tags
      };
      onUpdateProjects([newProject, ...projects]);
      setProjectForm({
        title: '',
        description: '',
        link: '',
        tags: [],
        imageUrl: '',
        codeVideoUrl: '',
        workingVideoUrl: ''
      });
    }
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    onUpdateProjects(updatedProjects);
  };

  const handleAddCertification = () => {
    if (certForm.name && certForm.issuer && certForm.imageUrl) {
      onUpdateCertifications([certForm, ...certifications]);
      setCertForm({ name: '', issuer: '', imageUrl: '' });
    }
  };

  const handleDeleteCertification = (index: number) => {
    const updatedCerts = certifications.filter((_, i) => i !== index);
    onUpdateCertifications(updatedCerts);
  };

  const handleUpdateEducation = () => {
    onUpdateEducation(educationForm);
  };

  const handleAddSkill = () => {
    const newSkill = { name: '', category: 'Frontend' };
    setSkillsForm([...skillsForm, newSkill]);
  };

  const handleUpdateSkill = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = [...skillsForm];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkillsForm(updatedSkills);
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = skillsForm.filter((_, i) => i !== index);
    setSkillsForm(updatedSkills);
  };

  const handleSaveSkills = () => {
    onUpdateSkills(skillsForm);
  };

  const handleUpdatePersonalInfo = () => {
    onUpdatePersonalInfo(personalForm);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden m-4">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <button onClick={onClose} className="text-3xl font-light text-brand-muted hover:text-white">&times;</button>
        </div>

        <div className="flex border-b border-slate-700">
          <button className={getTabClass('projects')} onClick={() => setActiveTab('projects')}>Projects</button>
          <button className={getTabClass('certifications')} onClick={() => setActiveTab('certifications')}>Certifications</button>
          <button className={getTabClass('education')} onClick={() => setActiveTab('education')}>Education</button>
          <button className={getTabClass('skills')} onClick={() => setActiveTab('skills')}>Skills</button>
          <button className={getTabClass('personal')} onClick={() => setActiveTab('personal')}>Personal Info</button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Manage Projects</h3>
              
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-3">Add New Project</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  />
                  <input
                    type="url"
                    placeholder="Project Link"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({...projectForm, link: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  />
                  <textarea
                    placeholder="Description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white md:col-span-2"
                    rows={2}
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={Array.isArray(projectForm.tags) ? projectForm.tags.join(', ') : projectForm.tags}
                    onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  />
                  <input
                    type="url"
                    placeholder="Code Video URL (optional)"
                    value={projectForm.codeVideoUrl}
                    onChange={(e) => setProjectForm({...projectForm, codeVideoUrl: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  />
                  <input
                    type="url"
                    placeholder="Working Video URL (optional)"
                    value={projectForm.workingVideoUrl}
                    onChange={(e) => setProjectForm({...projectForm, workingVideoUrl: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  />
                </div>
                <button
                  onClick={handleAddProject}
                  className="mt-4 bg-brand-primary hover:bg-sky-400 text-white px-4 py-2 rounded"
                >
                  Add Project
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-white mb-3">Existing Projects</h4>
                {projects.map((project, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-700 rounded">
                    <span className="text-white">{project.title}</span>
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Manage Certifications</h3>
              
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-3">Add New Certification</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Certificate Name"
                    value={certForm.name}
                    onChange={(e) => setCertForm({...certForm, name: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({...certForm, issuer: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={certForm.imageUrl}
                    onChange={(e) => setCertForm({...certForm, imageUrl: e.target.value})}
                    className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white md:col-span-2"
                  />
                </div>
                <button
                  onClick={handleAddCertification}
                  className="mt-4 bg-brand-primary hover:bg-sky-400 text-white px-4 py-2 rounded"
                >
                  Add Certification
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-white mb-3">Existing Certifications</h4>
                {certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-700 rounded">
                    <span className="text-white">{cert.name}</span>
                    <button
                      onClick={() => handleDeleteCertification(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Update Education</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Degree"
                  value={educationForm.degree}
                  onChange={(e) => setEducationForm({...educationForm, degree: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Major"
                  value={educationForm.major}
                  onChange={(e) => setEducationForm({...educationForm, major: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="University"
                  value={educationForm.university}
                  onChange={(e) => setEducationForm({...educationForm, university: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Period (e.g., 2023 - 2027)"
                  value={educationForm.period}
                  onChange={(e) => setEducationForm({...educationForm, period: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                />
                <textarea
                  placeholder="Details"
                  value={educationForm.details}
                  onChange={(e) => setEducationForm({...educationForm, details: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  rows={4}
                />
                <button
                  onClick={handleUpdateEducation}
                  className="bg-brand-primary hover:bg-sky-400 text-white px-4 py-2 rounded"
                >
                  Update Education
                </button>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Manage Skills</h3>
              
              <div className="mb-6">
                <button
                  onClick={handleAddSkill}
                  className="bg-brand-primary hover:bg-sky-400 text-white px-4 py-2 rounded mb-4"
                >
                  Add Skill
                </button>
                
                <div className="space-y-2">
                  {skillsForm.map((skill, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={skill.name}
                        onChange={(e) => handleUpdateSkill(index, 'name', e.target.value)}
                        className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                      />
                      <select
                        value={skill.category}
                        onChange={(e) => handleUpdateSkill(index, 'category', e.target.value)}
                        className="bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="Languages">Languages</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                      </select>
                      <button
                        onClick={() => handleDeleteSkill(index)}
                        className="text-red-400 hover:text-red-300 px-2"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={handleSaveSkills}
                  className="mt-4 bg-brand-primary hover:bg-sky-400 text-white px-4 py-2 rounded"
                >
                  Save Skills
                </button>
              </div>
            </div>
          )}

          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Update Personal Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={personalForm.name}
                  onChange={(e) => setPersonalForm({...personalForm, name: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={personalForm.title}
                  onChange={(e) => setPersonalForm({...personalForm, title: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={personalForm.email}
                  onChange={(e) => setPersonalForm({...personalForm, email: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={personalForm.phone}
                  onChange={(e) => setPersonalForm({...personalForm, phone: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                />
                <input
                  type="url"
                  placeholder="Upwork Profile URL"
                  value={personalForm.upwork}
                  onChange={(e) => setPersonalForm({...personalForm, upwork: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                />
                <textarea
                  placeholder="Summary"
                  value={personalForm.summary}
                  onChange={(e) => setPersonalForm({...personalForm, summary: e.target.value})}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                  rows={4}
                />
                <button
                  onClick={handleUpdatePersonalInfo}
                  className="bg-brand-primary hover:bg-sky-400 text-white px-4 py-2 rounded"
                >
                  Update Personal Info
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
