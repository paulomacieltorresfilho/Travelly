export interface Pacote {
  id?: number
  destino_id?: string; // UUID
  nome: string;
  descricao: string;
  preco_base: number;
}

export interface IPacoteRepository {
  getByDestinyId(id: string): Promise<Pacote[] | null>;
  updatePrices(): Promise<void>;
}
