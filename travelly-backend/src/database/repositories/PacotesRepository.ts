import {
  Pacote,
  IPacoteRepository,
} from "../../domain/interfaces/IPacotesRepository";
import { dbConnection } from "../db";

export class PacoteRepository implements IPacoteRepository {
  async getByDestinyId(id: string): Promise<Pacote[]> {
    const result = await dbConnection.query(
      "select * from pacote_turistico where pacote_turistico.destino_id = $1",
      [id]
    );
    return result.rows || null;
  }

  async updatePrices(): Promise<void> {
    await dbConnection.query("CALL AtualizarPrecoPacotes()");
  }
}
