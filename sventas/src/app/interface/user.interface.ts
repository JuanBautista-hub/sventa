export type Roles = 'VISITANTE' | 'ADMINISTRADOR' | 'ORGANIZADOR'|'CONFERENCISTA'|'EXPOSITOR'|'INSTRUCTOR';

export interface User {
  name: string;
  email: string;
  password: string;
  idevento:string;
  nombreEvento:string;
  expositor:[];
}

export interface UserResponse {
 id:string;
  name: string;
  avatar:string;
  idevento:string;
  nombreEvento:string;
  email: string;
  evento:[];
  expositor:[];
  message?: string;
  token?: string;
  userId?: string;  
  role: Roles;
  verified: boolean;
  cretedAt?: string;
  updateAt?: string;
  eventos:[];
  patrocinador:[];
  ocupacion:string;
  logo:string;
}
