# BitOne Command Center - Documentação do Projeto

## 📋 Visão Geral

O **BitOne Command Center** é um dashboard B2B profissional para monitoramento em tempo real de operações financeiras. Desenvolvido como teste técnico para demonstrar habilidades avançadas de front-end, o projeto implementa uma arquitetura limpa com separação de responsabilidades, seguindo princípios de **Clean Architecture** e **Domain-Driven Design**.

## 🎯 Escopo do MVP

### Features Implementadas

1. **KPIs (Indicadores)**
   - Total de contratos processados no dia
   - Volume financeiro total (em R$)
   - Taxa de sucesso vs. Taxa de erro (em %)
   - Contratos pendentes de revisão

2. **Gráfico de Throughput (Vazão)**
   - Visualização de volume de processamento hora a hora nas últimas 24h
   - Atualização automática a cada 10 segundos
   - Tooltip interativo com formatação de moeda

3. **Tabela de Operações (Data Grid)**
   - Listagem detalhada dos últimos contratos
   - Colunas: ID, Cliente, Banco, Valor, Status, Data/Hora
   - Filtros locais por status e busca por ID/Cliente/Banco
   - Paginação com 10 itens por página

4. **Drawer de Detalhes (Tratamento de Exceção)**
   - Ao clicar em um contrato, abre-se um painel lateral
   - Exibe informações completas do contrato
   - Para contratos com erro: mostra código e mensagem de erro

## 🏗️ Arquitetura

### Estrutura de Pastas

```
client/src/
├── components/               # Componentes de UI
│   ├── __tests__             # Testes unitários
│   ├── KpiCard.tsx           # Card de indicador
│   ├── ThroughputChart.tsx   # Gráfico de throughput
│   ├── ContractsTable.tsx    # Tabela com filtros e drawer
│   ├── DashboardHeader.tsx   # Header com indicador Live
│   └── ui/                   # ShadCN UI components  
├── hooks/                    # Custom hooks
│   ├── __tests__             # Testes unitários
│   └── useContracts.ts       # Hook de polling de contratos
├── lib/                      # Utilities e tipos 
│   ├── __tests__             # Testes unitários
│   ├── types.ts              # Tipos TypeScript (Domain)
│   ├── mock-data.ts          # Gerador de dados mockados
│   └── format.ts             # Funções de formatação
├── pages/                    # Page components
│   ├── NotFound.tsx          # Página de not found
│   ├── Dashboard.tsx         # Tipos TypeScript (Domain)
│   ├── Grid.tsx              # Tabela de operações
│   └── Login.tsx             # Login page
├── App.tsx                   # Router principal
└── index.css                 # Estilos globais
```

### Camadas de Arquitetura

#### 1. **Domain Layer** (`lib/types.ts`)
Define as entidades e interfaces de negócio, independente de framework:
- `Contract` - Entidade de contrato
- `ContractStatus` - Enum de status
- `DashboardStats` - Estatísticas agregadas
- `ThroughputDataPoint` - Ponto de dados de throughput

#### 2. **Infrastructure Layer** (`lib/mock-data.ts`)
Implementações técnicas e geração de dados:
- `generateContracts()` - Cria contratos mockados
- `calculateStats()` - Calcula estatísticas
- `generateThroughputData()` - Gera dados de throughput

#### 3. **Presentation Layer** (`components/` e `pages/`)
Componentes de UI puros e reutilizáveis:
- Componentes ShadCN para consistência visual
- Custom components para domínio específico
- Hooks customizados para lógica de estado

## 🔄 Fluxo de Dados

```
Dashboard (Page)
  ├── useContracts() [Hook]
  │   └── generateContracts() [Mock Data]
  │       └── Contract[] [Domain]
  │
  ├── KpiCard x4
  │   └── calculateStats() → DashboardStats
  │
  ├── ThroughputChart
  │   └── generateThroughputData() → ThroughputDataPoint[]
  │
  └── ContractsTable
      ├── Filtros (status, busca)
      ├── Paginação
      └── Sheet (Drawer) para detalhes
```

## 🎨 Design & Estilo

### Paleta de Cores
- **Primary**: Azul corporativo (#2563eb)
- **Background**: Branco limpo (oklch(1 0 0))
- **Foreground**: Cinza escuro (oklch(0.235 0.015 65))
- **Accent**: Tons de azul para hierarquia

### Tipografia
- **Font**: Plus Jakarta Sans (Google Fonts)
- **Headings**: Font-weight 700, letter-spacing -0.02em
- **Body**: Font-weight 400-600 conforme necessário

### Componentes
- **Cards**: Bordas sutis, sombras suaves, hover effects
- **Tabela**: Striped rows, hover highlighting, responsive
- **Badges**: Cores por status (Verde=Aprovado, Amarelo=Pendente, Vermelho=Rejeitado)

## ⚡ Performance & Otimizações

1. **Polling Simulado**
   - `useContracts()` refetch a cada 5 segundos
   - `ThroughputChart` atualiza a cada 10 segundos
   - Simula ambiente de tempo real sem WebSockets

2. **Paginação**
   - 10 itens por página na tabela
   - Evita renderizar 100+ linhas simultaneamente
   - Mantém DOM leve e responsivo

3. **Memoização**
   - `useMemo` para filtros de contratos
   - Evita re-cálculos desnecessários

4. **Tipagem TypeScript**
   - Type-safety em toda a aplicação
   - Previne bugs em tempo de compilação

## 🚀 Como Executar

### Desenvolvimento
```bash
pnpm install
pnpm dev
```

Acesse em: `http://localhost:3000`

### Build
```bash
pnpm build
```

### Testes
```bash
# Executar todos os testes
pnpm test
```

## 🧪 Testes

O projeto inclui uma suíte completa de testes unitários e de componentes usando **Vitest**:

### Estrutura dos Testes

- **Testes de Componentes** (`client/src/components/__tests__/`)
  - Testam renderização e comportamento dos componentes React
  - Utilizam `@testing-library/react` para interações realistas

- **Testes de Hooks** (`client/src/hooks/__tests__/`)
  - Testam lógica de hooks customizados
  - Verificam estados e efeitos colaterais

- **Testes Unitários** (`client/src/lib/__tests__/`)
  - Testam funções utilitárias puras
  - Verificam formatação, cálculos e validações

### Cobertura Atual

- ✅ Componentes UI (KpiCard)
- ✅ Hooks customizados (useContracts)
- ✅ Funções utilitárias (format.ts)
- 📊 **20 testes passando** em 3 arquivos

Para mais detalhes sobre os testes, consulte [TESTES.md](TESTES.md).

### Stack de Testes

- **Vitest** - Framework de testes
- **@testing-library/react** - Testes de componentes
- **@testing-library/jest-dom** - Matchers DOM
- **jsdom** - Ambiente DOM simulado

## 📊 Dados Mockados

Os dados são gerados aleatoriamente com:
- **Bancos**: Itaú, Santander, Bradesco, Caixa, Banco do Brasil, HSBC, Nubank
- **Clientes**: Nomes aleatórios brasileiros
- **Status**: APPROVED (60%), PENDING (25%), REJECTED (15%)
- **Valores**: Entre R$ 10.000 e R$ 500.000
- **Erros**: Códigos ERR_001 a ERR_005 com mensagens descritivas

## 🔧 Stack Técnico

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **ShadCN UI** - Component library
- **Recharts** - Data visualization
- **Wouter** - Routing
- **Lucide React** - Icons
- **Vitest** - Testing framework
- **@testing-library/react** - Component testing
- **jsdom** - DOM simulation

## 📝 Melhorias Futuras

1. **Integração com API Real**
   - Substituir mock data por chamadas reais
   - Implementar WebSockets para verdadeiro tempo real

2. **Filtros Avançados**
   - Salvar filtros na URL
   - Comportamento de Senior

3. **Validação com Zod**
   - Drawer de edição com react-hook-form
   - Validação assíncrona

4. **Autenticação**
   - Manus OAuth
   - Controle de acesso por role

