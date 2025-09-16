# Film Royale 🎞️

Bem-vindo ao Film Royale, uma aplicação web moderna para descobrir, pesquisar e salvar seus filmes favoritos. Este projeto foi desenvolvido em React e consome a rica API do The Movie Database (TMDB).

## 🚀 Live Demo

**[Clique aqui para ver o projeto ao vivo!](https://react-movie-app-nine-navy.vercel.app/)**

![Screenshot da tela inicial do Film Royale](https://github.com/lucassenacode/react-movie-app/blob/main/img/Captura%20de%20tela%202025-09-02%20110944.png) 

## 📜 Sobre o Projeto

Este projeto foi criado como um desafio para consolidar conhecimentos em desenvolvimento front-end com React. A aplicação permite que os usuários busquem em um vasto catálogo de filmes, vejam informações detalhadas sobre eles e mantenham uma lista pessoal de favoritos que persiste no navegador.

## ✨ Funcionalidades

* **Busca de Filmes:** Pesquise filmes em tempo real na base de dados do TMDB.
* **Paginação:** Navegue facilmente por múltiplas páginas de resultados.
* **Detalhes do Filme:** Veja informações completas, incluindo sinopse, avaliação, duração, elenco e diretor.
* **Lista de Favoritos:** Adicione ou remova filmes de uma lista de favoritos que fica salva localmente no seu navegador (`localStorage`).
* **Tema Claro/Escuro:** Alterne entre os temas visualmente com um clique.
* **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a celulares.

## 🛠️ Tecnologias Utilizadas

* **React:** Biblioteca principal para a construção da interface.
* **Vite:** Ferramenta de build e servidor de desenvolvimento ultrarrápido.
* **React Router DOM:** Para gerenciamento de rotas e navegação entre páginas.
* **Axios:** Para fazer as requisições HTTP para a API do TMDB.
* **React Icons:** Para a utilização de ícones (como o de filme e o de redes sociais).
* **CSS Moderno:** Estilização com variáveis CSS, Flexbox e Grid para layouts responsivos.

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 16 ou superior)
* npm (geralmente já vem com o Node.js)

### Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/lucassenacode/react-movie-app.git](https://github.com/lucassenacode/react-movie-app.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd react-movie-app
    ```

3.  **Crie sua Chave de API (Obrigatório):**
    * Você precisa de uma chave da API do TMDB. Se ainda não tiver, siga os passos [neste link](https://developer.themoviedb.org/docs/getting-started).
    * Na raiz do projeto, crie um arquivo chamado `.env`.
    * Dentro do `.env`, adicione a seguinte linha, substituindo `SUA_CHAVE_AQUI` pela sua chave:
        ```
        VITE_APP_API_KEY="SUA_CHAVE_AQUI"
        ```
    * O arquivo `.env` já está no `.gitignore`, então sua chave não será enviada para o GitHub.

### Instalação

Instale todas as dependências do projeto com o npm:
```bash
npm install