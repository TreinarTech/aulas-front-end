# Estrutura Curricular - Fundamentos de Front-end  

## Módulo 1: HTML (Estruturação Web)  
1. **Introdução**  
   - O que é HTML  
   - Estrutura básica (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`)  
   - Extensão de arquivos (`.html`)  
   - DOM e seletores (noção básica)  

2. **Tags Fundamentais**  
   - Títulos (`<h1>` a `<h6>`) e parágrafos (`<p>`)  
   - Listas (`<ul>`, `<ol>`, `<li>`)  
   - Links (`<a href="...">`)  

3. **Conteúdo Multimídia**  
   - Imagens (`<img>`)  
   - Áudio (`<audio>`) e Vídeo (`<video>`)  

4. **Tabelas e Formulários**  
   - Tabelas (`<table>`, `<tr>`, `<td>`, `<th>`)  
   - Formulários (`<form>`, `<input>`, `<button>`)  

5. **HTML Semântico e Acessibilidade**  
   - Tags semânticas (`<header>`, `<main>`, `<footer>`, `<article>`, `<section>`)  
   - Boas práticas de acessibilidade (`alt`, `aria-label`, etc.)  

6. **Exercícios Práticos**  


## Módulo 2: CSS (Estilização)  
1. **Introdução**  
   - O que é CSS  
   - Sintaxe básica (`seletor { propriedade: valor; }`)  
   - Formas de incluir CSS (inline, interno, externo)  
   - CSSOM (noção básica)  

2. **Seletores e Propriedades**  
   - Classes (`.classe`) e IDs (`#id`)  
   - Propriedades básicas (`color`, `font-size`, `background`)  

3. **Box Model e Layout**  
   - `margin`, `padding`, `border`, `box-sizing`  
   - Display (`block`, `inline`, `inline-block`)  
   - Flexbox (`display: flex`, `justify-content`, `align-items`)  
   - Grid (`display: grid`, `grid-template-columns`)  

4. **Responsividade**  
   - Media Queries (`@media (max-width: ...)`)  

5. **Organização de Código**  
   - Nesting (pré-processadores como SASS, se aplicável)  

6. **Exercícios Práticos**  

---  

## Módulo 3: JavaScript (Lógica e Interatividade)  

### Parte 1: Fundamentos da Programação  
1. **Introdução**  
   - O que é JavaScript  
   - `console.log("Hello World")`  
   - Variáveis (`let`, `const`) e Tipos (`string`, `number`, `boolean`)  

2. **Operadores e Estruturas de Controle**  
   - Operadores aritméticos (`+`, `-`, `*`, `/`) e comparação (`==`, `===`, `>`, `<`)  
   - Condicionais (`if`, `else`, `else if`)  
   - Loops (`for`, `while`)  

3. **Funções e Estruturas de Dados**  
   - Declaração de funções (`function`, arrow functions)  
   - Arrays (`push`, `pop`, `map`)  
   - Objetos (`{ chave: valor }`)  

### Parte 2: Manipulação do DOM  
4. **Interação com HTML**  
   - Seletores (`document.querySelector`, `getElementById`)  
   - Modificar conteúdo (`innerHTML`, `textContent`)  
   - Eventos (`addEventListener`, `click`, `submit`)  

5. **Exercícios Práticos**  

---  

### Projeto Integrador  
- Criar uma página web simples (ex.: portfólio, calculadora, lista de tarefas) aplicando:  
  - Estrutura semântica (HTML)  
  - Estilização responsiva (CSS)  
  - Interatividade (JavaScript)  

## Nível Intermediário

### 1. JavaScript Intermediário
#### **DOM Avançado**
- Event bubbling/capturing
- Manipulação avançada de elementos (cloneNode, insertAdjacentHTML)
- Event delegation

#### **ES6+ Moderno**
- Let/const vs var
- Template literals
- Arrow functions
- Destructuring
- Spread/Rest operators
- Modules (import/export)

#### **Assincronicidade**
- Callbacks
- Promises
- Async/await
- Fetch API

#### **Armazenamento**
- localStorage/sessionStorage
- Cookies
- IndexedDB (conceitos básicos)

### 2. CSS Intermediário
#### **Pré-processadores**
- SASS/SCSS (variáveis, nesting, mixins)
- PostCSS

#### **Animações**
- Transitions
- Keyframes animations
- Transformações 2D/3D

#### **Metodologias**
- BEM (Block Element Modifier)
- SMACSS

### 3. Ferramentas Essenciais
- Git/GitHub (branching, merge, conflitos)
- NPM/Yarn (gerenciamento de pacotes)
- Webpack/Vite (conceitos básicos)

### 4. Frameworks CSS
- Bootstrap/Tailwind
- Design Systems

---

## Nível Avançado

### 1. Frameworks JavaScript
#### **React.js**
- JSX
- Componentes (funcionais e classes)
- Props e State
- Hooks (useState, useEffect, useContext)
- React Router
- Context API
- Gerenciamento de estado (Redux/Zustand)

#### **Vue.js (opcional)**
- Options API
- Composition API
- Vuex/Pinia

### 2. TypeScript
- Tipos básicos
- Interfaces
- Generics
- Type inference
- Integração com React/Vue

### 3. Testes
- Jest (unitários)
- React Testing Library/Vue Test Utils
- Cypress (E2E)

### 4. Performance Web
- Lazy loading
- Code splitting
- Memoization
- Web Workers (conceitos)
- Bundle analysis

### 5. Arquitetura Front-end
- Micro-frontends
- Server-side rendering (Next.js/Nuxt.js)
- Static site generation
- Progressive Web Apps (PWA)

### 6. APIs Avançadas
- GraphQL (Apollo Client)
- REST avançado (autenticação JWT, interceptors)
- WebSockets

### 7. CI/CD para Front-end
- GitHub Actions
- Deploy automatizado (Vercel, Netlify)
- Docker básico para front-end

---

## Projetos por Nível

### Intermediário:
1. **SPA com Vanilla JS** (Single Page Application)
2. **Dashboard responsivo** com gráficos (Chart.js)
3. **App de clima** consumindo API pública

### Avançado:
1. **E-commerce completo** (React/Redux, paginação, carrinho)
2. **Rede social** (Vue/Nuxt, autenticação)
3. **PWA offline-first** com service workers

---