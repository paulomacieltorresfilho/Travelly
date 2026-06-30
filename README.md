# **Sistema de Reservas de Viagens Personalizadas**

## **Descrição do Projeto**

## Travelly

- Travelly é um sistema de reservas de viagens que permite aos usuários explorar destinos, personalizar itinerários e reservar pacotes turísticos com facilidade. O sistema é suportado por um banco de dados robusto, projetado para gerenciar todas as etapas da jornada de viagem, desde a pesquisa e reserva até avaliações pós-viagem.

## **Como rodar o projeto**

1. **Subir o banco de dados:**
   - Após clonar o projeto, navegue até a pasta principal e execute o seguinte comando para subir o banco de dados:
     ```bash
     docker compose up -d
     ```

2. **Subir o backend:**
   - Navegue até a pasta `travelly-backend`, instale os pacotes necessários e rode o servidor:
     ```bash
     cd travelly-backend
     npm i
     npm run dev
     ```

3. **Subir o frontend:**
   - Navegue até a pasta `travelly-frontend`, instale os pacotes necessários e rode o servidor:
     ```bash
     cd travelly-frontend
     npm i
     npm run dev
     ```

O projeto estará rodando localmente com o backend e o frontend conectados ao banco de dados.


## **Tecnologias Utilizadas**

- **Backend**:
  - **Linguagem**: TypeScript
  - **Framework**: Node.js com Express
  - **ORM**: Driver do Postgres (sem orm)
- **Banco de Dados**:
  - **SGBD**: PostgreSQL
  - **Modelagem**: BRModelo
- **Infraestrutura**:
  - **Docker**: Contêineres para facilitar o desenvolvimento e a implantação.
- **Frontend**:
  - **Linguagem**: Typescript
  - **Framework**: Next.js

