export interface WikiEntry {
  id: number;
  articleName: string;
  Content: string;
  created_at: string;

}

export interface Person {
    id: string;
    name: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    website: string;
    projects: string[];
    active: boolean;
}