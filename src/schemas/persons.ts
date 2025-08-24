export interface Persons {
  results?: ResultsEntity[] | null;
  info: Info;
}
export interface ResultsEntity {
  gender: string;
  name: Name;
  email: string;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}
export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Id {
  name: string;
  value: string;
}
export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}
