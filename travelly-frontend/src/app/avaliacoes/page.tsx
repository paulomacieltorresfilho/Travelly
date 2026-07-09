"use client";
import { useEffect, useState, useCallback } from "react";
import {
  AvaliacaoCompleteData,
  AvaliacaoCompleteDataResponse,
} from "../interface"; // Defina sua interface Avaliacao corretamente
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faArrowUpRightFromSquare,
  faUser,
  faPlane,
  faCalendar,
  faChartSimple,
  faX
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";

export function Estrelas({ nota }: { nota: number }) {
  return (
    <>
      {[...Array(nota)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} color="#FFD43B" />
      ))}
    </>
  );
}

export default function ListaAvaliacoes() {
  const [data, setData] = useState<AvaliacaoCompleteData[]>([]);
  const [loading, setLoading] = useState(true);
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const usuario_id = usuario.id;

  useEffect(() => {
    axios
      .get<AvaliacaoCompleteDataResponse>(
        "http://localhost:8664/api/views/get-ratings-info"
      )
      .then((res) => {
        console.log(res.data.completeRatingsList);
        setData(res.data.completeRatingsList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const onPress = useCallback(() => {
    setLoading(true);
    axios.post("http://localhost:8664/api/views/update-package-prices")
      .then((res) => {
        console.log(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const onClickDelete = (id: string) => {
    axios.delete("http://localhost:8664/api/avaliacao/delete", { data: { id } })
      .then((res) => {
        console.log(res.data.message);
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <span aria-busy> Carregando avaliações...  </span>
      </div>
    );
  }
  return (
    <>
      <main className="container">
        <h2>
          <FontAwesomeIcon icon={faChartSimple} /> Avaliações
        </h2>
        <div className="overflow-auto">
          <table>
            <thead>
              <tr>
                <th>
                  <FontAwesomeIcon icon={faUser} /> Usuário
                </th>
                <th>
                  <FontAwesomeIcon icon={faPlane} /> Destino
                </th>
                <th>
                  <FontAwesomeIcon icon={faStar} /> Nota
                </th>
                <th>
                  <FontAwesomeIcon icon={faCalendar} /> Data
                </th>
                <th></th>                <th></th>

              </tr>
            </thead>
            <tbody>
              {data.map((avaliacao) => (
                <tr key={avaliacao.avaliacao_id}>
                  <td>{avaliacao.usuario_nome}</td>
                  <td>
                    {avaliacao.destino_nome}, {avaliacao.destino_pais}
                  </td>
                  <td>
                    <Estrelas nota={avaliacao.nota} />
                  </td>
                  <td>
                    {new Date(avaliacao.data_avaliacao).toLocaleDateString(
                      "pt-BR"
                    )}
                  </td>
                  <td>
                      {usuario_id === avaliacao.usuario_id && (
                        <FontAwesomeIcon icon={faX} color="red" onClick={() => onClickDelete(avaliacao.avaliacao_id)} />
                      )}
                  </td>
                  <td>
                    <Link href={`/avaliacoes/${avaliacao.avaliacao_id}`}>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={onPress}>Atualizar Preços dos Pacotes</button>
        </div>
      </main>
    </>
  );
}
