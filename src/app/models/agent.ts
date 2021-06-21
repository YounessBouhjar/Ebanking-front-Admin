import { Agence } from './agence';

export interface Agent {
  id: number;
  nom: string;
  prenom: string;
  cin: string;
  adresse: string;
  telephone: string;
  email: string;
  agence: Agence;
  username: string;
  password: string;
}
