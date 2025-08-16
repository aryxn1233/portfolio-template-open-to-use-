import type { Project, Skill, Certification, Education } from './types';

export const PERSONAL_INFO = {
  name: "Aryan Thakur",
  title: "Full-Stack Developer & CS Student",
  phone: "9015334416",
  email: "aryan1125.be23@chitkarauniversity.edu.in",
  upwork: "https://www.upwork.com/freelancers/~013bd946d7ec6fe778?mp_source=share",
  summary: "Highly motivated and results-driven 3rd-year Computer Science Engineering student with a strong foundation in both front-end and back-end web development. Passionate about creating high-quality, responsive, and user-friendly websites. Proficient in modern web technologies, various CMS platforms, and fundamental UI/UX principles. Eager to apply learned skills and contribute to innovative projects."
};

export const SKILLS: Skill[] = [
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'React.js', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Firebase', category: 'Database' },
  { name: 'Git', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
  { name: 'API Integration', category: 'Other' },
  { name: 'Agile Methodologies', category: 'Other' },
  { name: 'C', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    title: 'E-commerce Web Application(smart-sphere)',
    description: 'Developed a full-stack e-commerce platform with product management, user authentication, and order processing.',
    link: 'https://beautiful-churros-6448f8.netlify.app/',
    tags: ['css', 'html5', 'js'],
    imageUrl: 'https://lh3.googleusercontent.com/d/1ROqoHqOLaO6TlMnve_eAogUIPGRhBiFK=w600-h400',
    workingVideoUrl: 'https://drive.google.com/file/d/1BVx4jMlomecyKW3eW-hAods2TWH1dXxE/view?usp=sharing',
    codeVideoUrl: 'https://drive.google.com/file/d/1AtoldIpy_SnaFJmkR7xkvaf0EzfRFYD1/view?usp=sharing',
  },
  {
    title: 'Stock Market bot',
    description: 'Designed a web application providing real-time stock data and a bot that provides the predictions of the highs and lows of the market .',
    link: 'https://tradingboot.netlify.app/dashboard',
    tags: ['React', 'API', 'UI/UX', 'machine learning', 'artificial intelligence'],
    imageUrl: 'https://lh3.googleusercontent.com/d/13d8m5hgRyrygJkzT18B5A4kkq8n0IIPu=w600-h400',
    workingVideoUrl: 'https://drive.google.com/file/d/1jTAN3hpVV8vj1ac5s7xs20IzomUfVxoH/view?usp=sharing',
    codeVideoUrl: 'https://drive.google.com/file/d/1p4cqmM2vAY8kTYDpkqD2YZ4v_RdL90MO/view?usp=sharing',
  },
  {
    title: 'NFT Minter Application',
    description: 'Built an application for minting NFTs, demonstrating understanding of blockchain concepts and web3 integration.',
    link: 'https://nft-minter-mint-verse.vercel.app/',
    tags: ['React', 'Web3.js', 'Solidity', 'Blockchain'],
    imageUrl: 'https://lh3.googleusercontent.com/d/1PxoFWCdtQNg06Nt4MWNYcF5_kGJr0txH=w600-h400',
    workingVideoUrl: 'https://drive.google.com/file/d/1xN9im4I6PpT9XXMxcL4TjgHCiwdCmrfD/view?usp=sharing',
    codeVideoUrl: 'https://drive.google.com/file/d/1kcKM_YdMxxbkR88bJzPrUZ3Nde0HUOyV/preview',
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: 'Design Thinking', issuer: 'Infosys', imageUrl: 'https://drive.google.com/file/d/18z8AvXa6mozXKq0OAbFUih6yChCKx7Y9/view?usp=drive_link' },
  { name: 'Database Management System', issuer: 'Infosys', imageUrl: 'https://drive.google.com/file/d/1KJ5TON75IF_3JOmtem5kAIAOQeu8GRfN/view?usp=sharing' },
  { name: 'Intro to cybersecurity', issuer: 'cisco network academy', imageUrl: 'https://drive.google.com/file/d/1_y1pOLwXy0XUiD55O5fGqaxhnfTuAfMa/view?usp=sharing' },
  { name: 'Network Fundamentals', issuer: 'Infosys', imageUrl: 'https://drive.google.com/file/d/1IIJRgXHNH-Sps1TjOw0xYzs3PVirbi67/view?usp=sharing' },
  { name: 'Software Engineering fundamentals', issuer: 'Infosys', imageUrl: 'https://drive.google.com/file/d/1XbXUOxvMXletGBnQgzAJncA8ZKJJsKZr/view?usp=sharing' },
];

export const EDUCATION_INFO: Education = {
  degree: 'Bachelor of Engineering',
  major: 'Computer Science',
  university: 'Chitkara University, Himachal Pradesh',
  period: '2023 – 2027',
  details: 'Completed projects including an E-commerce web application, a Stock Market website, and an NFT Minter, showcasing practical application of full-stack web development skills.'
};