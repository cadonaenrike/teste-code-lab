# Coder Burguer - Projeto Fullstack

Este projeto consiste em uma aplicação para gerenciar um cardápio online, onde os administradores podem adicionar, editar, visualizar e excluir produtos, além de listar todas as categorias disponíveis.

## Backend

O backend da aplicação foi desenvolvido utilizando as seguintes tecnologias e frameworks:

- **Node.js**: Plataforma de desenvolvimento rápida e eficiente para aplicações JavaScript.
- **NestJS**: Framework TypeScript para construção de aplicativos escaláveis e eficientes no lado do servidor.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática e facilita a manutenibilidade do código.
- **PostgreSQL**: Banco de dados relacional escolhido pela sua robustez e eficiência.
- **TypeORM**: ORM utilizado para facilitar a interação com o banco de dados PostgreSQL.
- **bcrypt**: Biblioteca para hashing de senhas, proporcionando segurança na autenticação de usuários.
- **jsonwebtoken (JWT)**: Implementação de tokens JWT para autenticação de usuários, garantindo segurança na comunicação entre o frontend e o backend.

### Endpoints da API

- **Autenticação**
  - `POST /auth/login`: Endpoint para login de administradores, retornando um token de autenticação para ser utilizado nas outras requisições.

- **Categoria**
  - `GET /category`: Endpoint para listar todas as categorias de produtos.

- **Produto**
  - `GET /product`: Endpoint para listar todos os produtos.
  - `GET /product/:id`: Endpoint para obter detalhes de um produto específico.
  - `POST /product`: Endpoint para criar um novo produto.
  - `PATCH /product/:id`: Endpoint para atualizar informações de um produto existente.
  - `DELETE /product/:id`: Endpoint para excluir um produto existente.

## Frontend

O frontend da aplicação foi desenvolvido utilizando as seguintes tecnologias e bibliotecas:

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router Dom**: Biblioteca para roteamento de páginas em aplicações React, proporcionando uma experiência de usuário fluída.
- **SASS**: Pré-processador de CSS utilizado para facilitar a organização e reutilização de estilos.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática e facilita a manutenibilidade do código.

### Funcionalidades do Frontend

- **Listagem de Produtos**: Layout responsivo em forma de grid, onde a quantidade de colunas se ajusta conforme o tamanho da tela do dispositivo.
- **Detalhes do Produto**: Página responsiva para visualização detalhada de um produto selecionado, proporcionando uma experiência de usuário agradável em qualquer dispositivo.
- **Página de Login**: Para acessar a área administrativa, utilize as seguintes credenciais:
  - **E-mail:** admin@admin.com
  - **Senha:** admin123
- **Página Administrativa**: Na página administrativa, é possível realizar um CRUD (Create, Read, Update, Delete) dos produtos disponíveis no cardápio.

## Instruções para Executar o Projeto Localmente

### Backend

1. Clone este repositório em sua máquina local.
2. Navegue até a pasta `code-menu-api-back-end`.
3. Execute `yarn install` para instalar as dependências do backend.
4. Configure o arquivo `.env` com as informações do banco de dados PostgreSQL.
5. Execute `yarn start` para iniciar o servidor do backend.

### Frontend

1. Navegue até a pasta `code-menu-app`.
2. Execute `npm install` para instalar as dependências do frontend.
3. Execute `npm start` para iniciar o servidor de desenvolvimento do frontend.

Acesse a aplicação em seu navegador através do endereço fornecido pelo servidor de desenvolvimento do frontend.

Este projeto foi desenvolvido como parte de um teste para Desenvolvedor(a) Fullstack, utilizando as melhores práticas de organização de código e tecnologias modernas, incluindo padrões de segurança como bcrypt para hashing de senhas e JWT para autenticação de usuários.

**Desenvolvido por:** Éverton Henrique Cadona
