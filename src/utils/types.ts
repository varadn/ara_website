export interface WikiEntry {
  id: number;
  articleName: string;
  Content: string;
  created_at: string;

}

export interface Person {
    id: number;
    name: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    website: string;
    projects: string[];
    active: boolean;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    people: string[]
}