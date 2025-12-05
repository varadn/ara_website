export interface WikiEntry {
  id: number;
  articleName: string;
  Content: string;
  created_at: string;

}

export interface Person {
    id?: number;
    name: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    website: string;
    projects: Project[];
    active: boolean;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    people: string[];
    dateCreated: Date;
    link: string;
}

export interface News {
    id: number;
    title: string;
    date: string;
    location: string;
    imageSrc: string;
    imageAlt: string;
    description: string;
}

export interface WeatherData {
    temp: number;
    condition: string;
    location: string;
}