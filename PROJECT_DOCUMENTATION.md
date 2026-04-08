# BitOne Command Center - Documentação do Projeto

## 📋 Visão Geral

O **BitOne Command Center** é um dashboard B2B profissional para monitoramento em tempo real de operações financeiras. Desenvolvido como teste técnico para demonstrar habilidades avançadas de front-end, o projeto implementa uma arquitetura limpa com separação de responsabilidades, seguindo princípios de **Clean Architecture** e **Domain-Driven Design**.

## 🎯 Escopo do MVP

### Features Implementadas

1. **Real-time KPIs (Indicadores)**
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

5. **Indicador Live**
   - Dot verde piscando no header
   - Indica que o sistema está recebendo dados em tempo real

## 🏗️ Arquitetura

### Estrutura de Pastas

```
client/src/
├── components/           # Componentes de UI
│   ├── KpiCard.tsx      # Card de indicador
│   ├── ThroughputChart.tsx  # Gráfico de throughput
│   ├── ContractsTable.tsx   # Tabela com filtros e drawer
│   ├── DashboardHeader.tsx  # Header com indicador Live
│   └── ui/              # ShadCN UI components
├── hooks/               # Custom hooks
│   └── useContracts.ts  # Hook de polling de contratos
├── lib/                 # Utilities e tipos
│   ├── types.ts        # Tipos TypeScript (Domain)
│   ├── mock-data.ts    # Gerador de dados mockados
│   └── format.ts       # Funções de formatação
├── pages/               # Page components
│   └── Dashboard.tsx    # Página principal
├── App.tsx              # Router principal
└── index.css            # Estilos globais
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
cd /home/ubuntu/bitone-command-center
pnpm install
pnpm dev
```

Acesse em: `http://localhost:3000`

### Build
```bash
pnpm build
```

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

## 📝 Melhorias Futuras

1. **Integração com API Real**
   - Substituir mock data por chamadas reais
   - Implementar WebSockets para verdadeiro tempo real

2. **Dark Mode**
   - Switch de tema
   - Otimizado para monitoramento 24/7

3. **Filtros Avançados**
   - Salvar filtros na URL
   - Comportamento de Senior

4. **Validação com Zod**
   - Drawer de edição com react-hook-form
   - Validação assíncrona

5. **Autenticação**
   - Manus OAuth
   - Controle de acesso por role

## 📚 Referências

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [React Best Practices](https://react.dev)
- [ShadCN UI Documentation](https://ui.shadcn.com)

---

**Desenvolvido com ❤️ para demonstrar excelência técnica em front-end**
