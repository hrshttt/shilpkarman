export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Service {
  title: string;
  description: string;
  image: string;
}

export interface PhilosophyStep {
  title: string;
  description: string;
  image: string;
}