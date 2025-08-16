
export interface Skill {
  name: string;
  category: string;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  imageUrl: string;
  codeVideoUrl?: string;
  workingVideoUrl?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  imageUrl: string;
}

export interface Education {
  degree: string;
  major: string;
  university: string;
  period: string;
  details: string;
}