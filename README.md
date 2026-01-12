# Teste Human Track

## 🛠️ Stack do Projeto

As principais tecnologias utilizadas neste projeto são:

- **React 19** - Biblioteca base para construção da interface.
- **React Router 7** - Framework para roteamento e gerenciamento de dados.
- **TypeScript** - Garantia de segurança de tipos e melhor experiência de desenvolvimento.
- **Tailwind CSS 4** - Estilização moderna e performática baseada em utilitários.
- **shadcn/ui** - Componentes de interface reutilizáveis e acessíveis.
- **Bun** - Gerenciador de pacotes e runtime extremamente rápido.
- **Biome** - Ferramenta unificada para linting e formatação de código.
- **React Hook Form & Zod** - Gerenciamento e validação de formulários.

---

## 🚀 Como Rodar o Projeto

Este projeto utiliza o **Bun** como gerenciador de pacotes principal. Certifique-se de tê-lo instalado em sua máquina.

### 1. Instalação de Dependências

No diretório raiz do projeto, execute:

```bash
bun install
```

### 2. Executando em Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento, utilize o comando:

```bash
bun dev
```

Após o comando, a aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

### 3. Build para Produção

Para gerar a versão otimizada de produção:

```bash
bun run build
```

### 4. Outros Comandos Úteis

- **Verificação de Tipos (TypeScript):**
  ```bash
  bun run typecheck
  ```

- **Linting e Formatação (Biome):**
  ```bash
  bun run check
  ```

---

## 📁 Estrutura de Pastas

- `src/components`: Componentes reutilizáveis (incluindo shadcn/ui).
- `src/features`: Lógica de negócio e componentes organizados por funcionalidade (ex: `gas`).
- `src/routes`: Definição das rotas da aplicação.
- `src/shared`: Contextos, hooks e utilitários compartilhados.
