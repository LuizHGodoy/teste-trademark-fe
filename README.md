# Visão Geral

Este projeto é um Gerenciador de Tarefas desenvolvido com React e Next.js. Ele permite que os usuários criem, editem, excluam e organizem tarefas num formato de lista e Kanban. O projeto utiliza várias bibliotecas para facilitar a construção da interface e a gestão do estado.

# Tecnologias Utilizadas

- Next.js: Utilizado para criar a interface do usuário e gerenciar o estado.
- Axios: Biblioteca para fazer requisições HTTP.
- Dnd Kit: Biblioteca para implementar arrastar e soltar (drag and drop).
- Tailwind CSS: Utilizado para estilizar a interface do usuário.
- Radix UI: Utilizado para criar componentes de interface do usuário.
- React Toastify: Utilizado para exibir notificações de sucesso e erro.

# Estrutura de Arquivos

A estrutura de arquivos do projeto segue a seguinte estrutura:

```
/src
  /app
    /layout.tsx
    /page.tsx
    /sign-in
      /page.tsx
    /sign-up
      /page.tsx
  /components
    /create-task.tsx
    /delete-task-dialog.tsx
    /footer.tsx
    /header.tsx
    /kanban-view.tsx
    /kanban-column.tsx
    /kanban-task.tsx
    /priority-select.tsx
    /task-list.tsx
    /ui
      /button.tsx
      /checkbox.tsx
      /dialog.tsx
      /input.tsx
      /popover.tsx
      /select.tsx
      /textarea.tsx
  /context
    /auth-context.tsx
  /services
    /api
      /tasks.ts
      /sign-in.ts
    /index.ts
  /common
    /exceptions
      /api-error.ts
  /lib
    /utils.ts
  /styles
    /globals.css
/package.json
/.env.local
/.env.local.example
```

# Configuração do Ambiente

Para configurar o ambiente, siga os seguintes passos:

1. Clone o repositório:

```bash
  git clone https://github.com/LuizHGodoy/teste-trademark-fe.git
  cd teste-trademark-fe
```

2. Instale as dependências:

```bash
  pnpm install
```

3. Configure as variáveis de ambiente:

- Renomeie o arquivo .env.local.example para .env.local.
- Defina a variável NEXT_PUBLIC_API_URL com a URL da sua API. 
  Por exemplo:
  ```
       NEXT_PUBLIC_API_URL=http://localhost:3434
  ```
4. Inicie o servidor de desenvolvimento: 

```bash
   pnpm dev
```
5. Acesse a aplicação: 
Abra seu navegador e vá para http://localhost:3000 

# Licença

This project is not licensed for public use. All rights reserved.

