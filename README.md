## Requisitos

- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

### Bibliotecas utilizadas

- [shadcn/ui](https://ui.shadcn.com)
- [tailwindcss](https://tailwindcss.com)
- [lucide-react](https://lucide.dev/guide/packages/lucide-react)

## Estrutura de pastas e arquivos

Este projeto foi desenvolvido em Next.js 15 (App Router)
```
├── app/
│   ├── (pages)/                      # Página raiz do projeto
│       ├── layout.tsx                # Layout base com metadata, viewport, fonts, favicon
│       ├── page.tsx                  # Página raiz do projeto com listagem de restaurantes
│       ├── global.css                # Arquivos com configurações do Tailwindcss e Cores customizadas do projeto
│       └── [catalogId]/              # Rota dinâmica para o restaurante selecionado (ex: restaurante 1)
│           ├── [product]/            # Rota dinâmica do tipo de produto selecionado do restaurante (ex: Produto Temaki)
│           │    ├── page.tsx         # Página do produto selecionado
│           │    └── [catalogId]/     # Rota dinâmica para a opção do produto selecionado (ex: Sabor Califórnia do produto Tekaki)
│           │        └── page.tsx     # Página dos detalhes da opção selecionada, onde pode ser adicionado itens a mais
│           └── ticket/               
│               └── page.tsx          # Página do carrinho (ticket)
│
├── components/                  # Componentes visuais reutilizáveis
│   ├── ui/                      # Componentes visuais reutilizáveis (botões, inputs, layout, etc.) instalados do shadcn/ui
│
├── contexts/                    # Centralização de contextos
│   └── ticketContext.tsx        # Contexto global para controle do carrinho (ticket)
│
├── providers/                   # Centralização de providers
│   └── ticketContext.tsx        # Contexto global para controle do carrinho (ticket)
│
├── hooks/
│   ├── useProductQuantityControlInTicket.ts # Hook para controle de quantidade
│   └── useOperationsTicket.ts               # Hook de funções auxiliares para controle do carrinho (ticket)
│
├── mocks/
│   └── restaurants.json         # Dados simulados para desenvolvimento
│
├── lib/                         # Pasta para configuração de bibliotecas externas (ex: shadcn/ui)
│
├── types/                       # Pasta de tipagens reutilizáveis
│   ├── Product.ts               # Tipagens do modelo de produto
│   └── Product.ts               # Tipagens do modelo das opções de produto
│
├── utils/                       # Pasta utils para funções mais puras e reutilizáveis
│   └── format-price.ts          # Utilitário para formatação de preço
│
├── public/
│   └── logos/                   # Logos dos restaurantes│       
│
├── tailwind.config.ts          # Configuração do TailwindCSS
├── components.json             # Configuração do shadcn/ui
└── tsconfig.json               # Configuração do TypeScript
```

## Começando

**Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/thoomassf/02-ignite-timer.git && cd 02-ignite-timer
$ gh repo clone thoomassf/02-ignite-timer && cd 02-ignite-timer
```

**Siga os passos abaixo**
```bash
# Instalar as dependências
npm install
# Iniciar projeto
npm run dev
```

Abra em [http://localhost:3000](http://localhost:3000).

Desenvolvido por Thomas Farias 👋 [LinkedIn](https://www.linkedin.com/in/thomas-sf)