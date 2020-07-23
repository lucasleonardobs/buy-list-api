// Adicionando atributo "user" dentro do request.

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
