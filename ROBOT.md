# ROBOT.md

## 1. Objetivo do projeto

Desenvolver uma aplicação web chamada:

**Agenda Semanal de Atividades – DCT**

A aplicação será utilizada internamente pelo Departamento de Ciência e Tecnologia – DCT para:

- visualizar a rotina semanal padrão do departamento;
- visualizar um calendário mensal;
- cadastrar atividades específicas por data;
- visualizar atividades da semana;
- editar e excluir atividades;
- acompanhar o status das atividades;
- registrar visitas, reuniões, atendimentos, projetos e outros compromissos;
- manter um histórico das atividades;
- exportar atividades semanais ou mensais para PDF.

A aplicação deverá ser simples, limpa, responsiva e fácil de usar por pessoas sem conhecimento técnico.

---

# 2. Stack obrigatória

Utilizar:

- HTML5
- CSS3
- JavaScript ES6+
- Supabase
- Supabase Auth
- Supabase PostgreSQL
- GitHub Pages
- biblioteca para geração de PDF no frontend

Não utilizar framework frontend na primeira versão.

Não utilizar React, Vue, Angular, Next.js ou similares.

Não criar backend próprio em Node.js, Python ou outra linguagem nesta versão.

O Supabase será utilizado diretamente pelo frontend.

---

# 3. Arquitetura

A arquitetura deve seguir:

```text
Usuário
   ↓
GitHub Pages
   ↓
HTML + CSS + JavaScript
   ↓
Supabase
   ├── Auth
   └── PostgreSQL
```

A aplicação será publicada no GitHub Pages.

O Supabase será responsável por:

- autenticação;
- armazenamento das atividades;
- leitura das atividades;
- atualização;
- exclusão;
- segurança através de Row Level Security.

---

# 4. Estrutura de arquivos recomendada

Criar inicialmente:

```text
agenda-dct/
│
├── index.html
├── login.html
│
├── css/
│   ├── style.css
│   ├── calendar.css
│   └── responsive.css
│
├── js/
│   ├── config.js
│   ├── supabase.js
│   ├── auth.js
│   ├── calendar.js
│   ├── weeklyRoutine.js
│   ├── activities.js
│   ├── modal.js
│   ├── filters.js
│   ├── pdf.js
│   └── app.js
│
├── assets/
│   ├── icons/
│   └── images/
│
├── README.md
└── ROBOT.md
```

Pode adaptar os nomes dos arquivos se houver justificativa técnica clara.

Evitar arquivos JavaScript gigantes.

Separar responsabilidades.

---

# 5. Tela de login

A aplicação deverá possuir autenticação.

A tela de login deve possuir:

- nome/logo do DCT;
- campo de e-mail;
- campo de senha;
- botão Entrar;
- mensagem de erro em caso de login inválido.

Após autenticação bem-sucedida:

```text
login.html
     ↓
index.html
```

Usuários não autenticados não devem conseguir acessar a agenda.

Se `index.html` for aberto sem sessão válida, redirecionar para:

```text
login.html
```

---

# 6. Segurança

Nunca utilizar ou expor a `service_role key`.

No frontend poderá existir apenas:

- Supabase Project URL;
- Supabase anon public key.

Implementar:

- Supabase Auth;
- Row Level Security;
- policies adequadas;
- verificação da sessão;
- sanitização básica das entradas;
- validação dos formulários.

Não assumir que esconder algo no JavaScript representa segurança.

A segurança dos dados deve ser garantida através do Supabase.

---

# 7. Agenda padrão semanal

Existe uma rotina fixa do DCT.

Essa rotina não deve ser cadastrada manualmente no banco toda semana.

Ela deve existir como configuração fixa da aplicação.

## Segunda-feira

### Planejamento na sala

Descrição:

Dia destinado ao planejamento semanal da equipe, organização da agenda, definição das atividades, elaboração e acompanhamento dos projetos, distribuição das demandas e preparação das ações que serão realizadas durante a semana.

### Plantas

- molhar;
- verificar as condições das plantas.

---

## Terça-feira

### Desenvolvimento de projetos na sala

Descrição:

Dia voltado para o trabalho interno com os projetos do DCT. A equipe poderá desenvolver ideias, produzir materiais, pesquisar, elaborar propostas, organizar projetos científicos e tecnológicos e preparar atividades para serem realizadas com as escolas.

---

## Quarta-feira

### Visitas na sala / Atendimento

Descrição:

Dia destinado à recepção de visitantes, professores, gestores e demais profissionais da educação, além do atendimento às demandas relacionadas à Ciência e Tecnologia.

Também será um momento para apresentar os projetos desenvolvidos pelo departamento e fortalecer a integração com a comunidade escolar.

### Plantas

- molhar;
- realizar uma verificação geral.

---

## Quinta-feira

### Visitas às escolas

Descrição:

Dia reservado para visitas técnicas e pedagógicas às escolas da rede municipal.

As visitas terão como objetivo:

- acompanhar projetos;
- conhecer as necessidades das unidades escolares;
- orientar professores;
- orientar estudantes;
- identificar oportunidades;
- fortalecer ações de Ciência, Tecnologia e Inovação.

---

## Sexta-feira

### Limpeza, organização e avaliação

Descrição:

Dia destinado à limpeza e organização da sala, materiais e equipamentos do departamento.

Também será realizado:

- balanço das atividades da semana;
- organização das pendências;
- preparação das demandas para a semana seguinte.

### Plantas

- molhar;
- retirar folhas secas;
- organizar o espaço para a próxima semana.

---

# 8. Representação da rotina semanal no JavaScript

Criar um arquivo como:

```text
js/weeklyRoutine.js
```

Exemplo conceitual:

```javascript
export const weeklyRoutine = {
  monday: {
    title: "Planejamento na sala",
    description: "...",
    plants: "Molhar e verificar as condições das plantas."
  },

  tuesday: {
    title: "Desenvolvimento de projetos na sala",
    description: "..."
  },

  wednesday: {
    title: "Visitas na sala / Atendimento",
    description: "...",
    plants: "Molhar e realizar uma verificação geral."
  },

  thursday: {
    title: "Visitas às escolas",
    description: "..."
  },

  friday: {
    title: "Limpeza, organização e avaliação",
    description: "...",
    plants: "Molhar, retirar folhas secas e organizar o espaço."
  }
}
```

Não armazenar essas rotinas diariamente na tabela de atividades.

---

# 9. Tela principal

A página principal deverá funcionar como dashboard da agenda.

Deve conter, no mínimo:

```text
┌────────────────────────────────────────────────────┐
│ Agenda Semanal de Atividades – DCT                 │
│                                                    │
│ Outubro 2026              [+ Nova atividade]       │
├────────────────────────────────────────────────────┤
│                                                    │
│                  CALENDÁRIO                        │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│                 SEMANA ATUAL                       │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│            ATIVIDADES CADASTRADAS                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

# 10. Calendário mensal

Criar um calendário mensal funcional.

Mostrar:

- mês;
- ano;
- dias da semana;
- dias do mês;
- botão para mês anterior;
- botão para próximo mês;
- destaque do dia atual;
- destaque visual de dias com atividades cadastradas.

Preferencialmente:

```text
SEG  TER  QUA  QUI  SEX  SAB  DOM
               1    2    3    4
 5    6    7    8    9   10   11
12   13   14   15   16   17   18
```

Ao clicar em um dia:

- selecionar a data;
- exibir rotina padrão daquele dia, se houver;
- listar as atividades cadastradas naquela data;
- permitir adicionar nova atividade usando a data selecionada.

---

# 11. Visualização diária

Ao selecionar uma data:

Exemplo:

```text
15 de outubro de 2026

Rotina do dia
─────────────────────────
Visitas às escolas

Atividades
─────────────────────────

08:30
Visita à Escola Municipal João XXIII

10:30
Visita à Escola Municipal José de Alencar

14:00
Reunião com professores

[ + Adicionar atividade ]
```

Se o dia selecionado for segunda, quarta ou sexta, mostrar também o cuidado com as plantas correspondente.

---

# 12. Visualização da semana atual

Criar seção específica:

```text
Semana de 12/10 até 16/10
```

Separar por dia.

Exemplo:

```text
SEGUNDA
Planejamento na sala

Atividades:
09:00 Reunião interna

────────────────────

TERÇA
Desenvolvimento de projetos

Atividades:
14:00 Desenvolvimento do projeto X

────────────────────

QUARTA
Atendimento

Atividades:
10:00 Atendimento à escola Y

────────────────────

QUINTA
Visitas às escolas

Atividades:
08:30 Escola A
10:30 Escola B

────────────────────

SEXTA
Organização e avaliação
```

A rotina padrão e as atividades cadastradas devem ser visualmente diferentes.

---

# 13. Nova atividade

Adicionar botão global:

```text
+ Nova atividade
```

O formulário deve conter:

```text
Título
Data
Horário inicial
Horário final
Categoria
Responsável
Descrição
Status
```

Campos obrigatórios:

- título;
- data;
- categoria.

Horários poderão ser opcionais.

---

# 14. Categorias

Criar categorias predefinidas:

```text
Planejamento
Projeto
Atendimento
Visita à escola
Reunião
Evento
Manutenção
Administrativo
Outro
```

Cada categoria pode possuir um ícone ou indicador visual.

Não exagerar no uso de cores.

---

# 15. Status

Criar:

```text
Planejada
Em andamento
Concluída
Cancelada
```

Armazenar os valores internamente de forma consistente, por exemplo:

```text
planned
in_progress
completed
cancelled
```

A interface poderá exibir os valores em português.

---

# 16. Responsável

A atividade poderá conter o responsável.

Na primeira versão, o campo poderá ser texto simples.

Exemplo:

```text
Responsável:
Equipe DCT
```

Não é necessário criar tabela separada de responsáveis inicialmente.

---

# 17. Modal

Usar modal para:

- criar atividade;
- editar atividade;
- confirmar exclusão;
- visualizar detalhes, se necessário.

O formulário não deve ocupar permanentemente muito espaço na tela.

---

# 18. CRUD

Implementar integralmente:

## Create

Cadastrar atividade.

## Read

Visualizar atividade no:

- calendário;
- dia;
- semana;
- listagem.

## Update

Editar atividade.

## Delete

Excluir atividade mediante confirmação.

---

# 19. Banco Supabase

Criar uma tabela:

```sql
activities
```

Estrutura sugerida:

```sql
id uuid primary key
title text not null
description text
activity_date date not null
start_time time
end_time time
category text not null
status text not null
responsible text
created_by uuid
created_at timestamptz
updated_at timestamptz
```

Preferencialmente:

```sql
id UUID DEFAULT gen_random_uuid()
```

Usar timestamps automáticos quando possível.

---

# 20. Usuário criador

`created_by` deve armazenar o usuário autenticado.

Preferencialmente relacionar com:

```text
auth.users.id
```

Ao cadastrar:

```javascript
created_by = user.id
```

---

# 21. Row Level Security

Ativar RLS.

A aplicação deve possuir policies adequadas.

Na primeira versão, considerar que usuários autenticados autorizados poderão visualizar e gerenciar as atividades do departamento.

Não liberar:

```text
INSERT
UPDATE
DELETE
```

para usuários anônimos.

---

# 22. Indicadores no calendário

Dias contendo atividade devem ter indicador.

Exemplo:

```text
14
 ●

15
 ●●
```

Não é necessário mostrar uma bolinha para cada atividade caso fique visualmente poluído.

Pode simplesmente mostrar um pequeno ponto, badge ou quantidade.

---

# 23. Filtros

Adicionar filtros simples:

- categoria;
- status;
- período.

Exemplo:

```text
[ Todas categorias ▼ ]

[ Todos status ▼ ]

De: [__/__/____]

Até: [__/__/____]

[ Filtrar ]
```

---

# 24. Pesquisa

Adicionar campo:

```text
Pesquisar atividade...
```

A pesquisa deverá considerar pelo menos:

- título;
- descrição;
- responsável.

---

# 25. PDF

Implementar:

```text
Exportar semana em PDF
Exportar mês em PDF
```

O PDF deverá mostrar algo semelhante a:

```text
DEPARTAMENTO DE CIÊNCIA E TECNOLOGIA – DCT

RELATÓRIO DE ATIVIDADES

Período:
01/10/2026 até 31/10/2026


15/10/2026
Visita à Escola Municipal João XXIII

Horário:
08:30 - 10:00

Categoria:
Visita à escola

Descrição:
Acompanhamento do projeto de robótica.

Responsável:
Equipe DCT

Status:
Concluída
```

Não incluir atividades canceladas por padrão no relatório, a menos que exista uma opção explícita para isso.

---

# 26. Interface

Objetivo visual:

- institucional;
- moderno;
- simples;
- limpo;
- organizado;
- profissional.

Evitar:

- animações excessivas;
- gradientes exagerados;
- excesso de cards;
- excesso de sombras;
- excesso de ícones;
- visual muito parecido com dashboard corporativo genérico.

Priorizar legibilidade.

---

# 27. Paleta

O sistema pertence ao mesmo contexto do DCT.

Priorizar:

- azul;
- verde;
- branco;
- tons neutros.

Os tons específicos poderão ser refinados posteriormente.

Utilizar CSS variables.

Exemplo:

```css
:root {
  --primary: ...;
  --secondary: ...;
  --background: ...;
  --surface: ...;
  --text-primary: ...;
  --text-secondary: ...;
  --border: ...;
}
```

---

# 28. Responsividade

A aplicação deverá funcionar bem em:

- desktop;
- notebook;
- tablet;
- celular.

Prioridade inicial:

```text
Desktop > Tablet > Mobile
```

No mobile:

- calendário deve continuar utilizável;
- cards semanais podem ficar um abaixo do outro;
- modal deve ocupar grande parte da tela;
- botões devem possuir tamanho adequado para toque.

---

# 29. Datas

Internamente usar:

```text
YYYY-MM-DD
```

Exemplo:

```text
2026-10-15
```

Na interface usar padrão brasileiro:

```text
15/10/2026
```

Não armazenar datas em strings formatadas como:

```text
15/10/2026
```

no banco.

---

# 30. Horários

Utilizar formato de 24 horas.

Exemplo:

```text
08:30
14:00
17:30
```

---

# 31. Semana

Considerar semana de trabalho:

```text
Segunda-feira até sexta-feira
```

O calendário pode mostrar sábado e domingo, mas a seção de rotina semanal do DCT deve priorizar segunda a sexta.

---

# 32. Estados vazios

Não deixar espaços estranhos quando não houver dados.

Exemplo:

```text
Nenhuma atividade cadastrada para este dia.
```

E:

```text
Nenhuma atividade encontrada neste período.
```

---

# 33. Feedback ao usuário

Mostrar mensagens após operações.

Exemplos:

```text
Atividade adicionada com sucesso.
```

```text
Atividade atualizada.
```

```text
Atividade excluída.
```

```text
Não foi possível salvar a atividade.
```

Não utilizar `alert()` do navegador como solução principal.

Criar toast ou mensagem visual simples.

---

# 34. Loading

Mostrar estado de carregamento ao buscar dados no Supabase.

Não deixar a interface aparentemente travada.

Exemplo:

```text
Carregando atividades...
```

---

# 35. Tratamento de erros

Toda operação Supabase deve possuir tratamento de erro.

Exemplo:

```javascript
const { data, error } = await supabase
  .from("activities")
  .select("*")

if (error) {
  console.error(error)
  showToast("Não foi possível carregar as atividades.", "error")
}
```

Não ignorar erros.

---

# 36. Código

O código deve ser:

- organizado;
- modular;
- legível;
- comentado somente quando necessário;
- sem duplicações desnecessárias.

Preferir funções pequenas.

Evitar:

```javascript
function doEverything() {
  // centenas de linhas
}
```

---

# 37. JavaScript

Utilizar:

```text
const
let
async/await
modules
template literals
```

Evitar:

```text
var
callbacks excessivos
JavaScript inline no HTML
```

---

# 38. HTML

Priorizar HTML semântico:

```text
header
main
section
nav
form
button
dialog
footer
```

Se possível, usar `<dialog>` para modais.

---

# 39. CSS

Organizar CSS.

Evitar:

```css
style=""
```

diretamente nos elementos.

Utilizar classes.

Utilizar:

```text
Flexbox
CSS Grid
media queries
CSS variables
```

---

# 40. Acessibilidade básica

Implementar:

- labels em campos;
- navegação por teclado;
- foco visível;
- contraste adequado;
- botões reais;
- `aria-label` quando necessário.

---

# 41. GitHub Pages

A aplicação deve funcionar quando hospedada no GitHub Pages.

Não utilizar caminhos absolutos quebráveis como:

```text
/css/style.css
```

quando o projeto estiver publicado em subdiretório.

Preferir:

```text
./css/style.css
```

ou caminhos relativos apropriados.

---

# 42. Configuração Supabase

Criar:

```text
js/config.js
```

Estrutura:

```javascript
export const SUPABASE_URL = "..."
export const SUPABASE_ANON_KEY = "..."
```

Nunca adicionar service role.

Adicionar comentário explicando que a anon key pode ficar no frontend, mas que o banco deve estar protegido por RLS.

---

# 43. Desenvolvimento incremental

Não tentar desenvolver tudo em uma única alteração enorme.

Seguir fases.

## Fase 1

Criar:

- estrutura;
- layout;
- calendário;
- rotina semanal;
- dados mockados.

## Fase 2

Adicionar Supabase.

- conexão;
- tabela;
- CRUD.

## Fase 3

Adicionar autenticação.

- login;
- logout;
- sessão.

## Fase 4

Adicionar:

- filtros;
- pesquisa;
- melhorias de UX.

## Fase 5

Adicionar:

- geração de PDF.

## Fase 6

Refinar:

- responsividade;
- acessibilidade;
- design;
- documentação.

---

# 44. Primeira implementação

Na primeira implementação, priorizar:

1. `index.html`
2. estrutura visual;
3. calendário;
4. rotina semanal;
5. seção da semana atual;
6. modal de nova atividade;
7. dados mockados.

Não conectar ao Supabase antes da interface básica funcionar.

---

# 45. Mock inicial

Pode utilizar atividades temporárias:

```javascript
const mockActivities = [
  {
    id: "1",
    title: "Visita à Escola Municipal João XXIII",
    description: "Acompanhamento do projeto de robótica.",
    activity_date: "2026-10-15",
    start_time: "08:30",
    end_time: "10:00",
    category: "school_visit",
    status: "planned",
    responsible: "Equipe DCT"
  }
]
```

Depois substituir pelo Supabase.

---

# 46. Fluxo principal esperado

```text
Login

↓

Dashboard

↓

Calendário mensal

↓

Seleciona uma data

↓

Visualiza rotina padrão

+

Atividades daquela data

↓

Nova atividade

↓

Preenche formulário

↓

Salva no Supabase

↓

Calendário e semana atualizam
```

---

# 47. Fluxo da segunda-feira

Segunda-feira será especialmente importante.

A tela deverá facilitar o planejamento da semana.

Idealmente mostrar:

```text
PLANEJAMENTO DA SEMANA

Segunda
+ atividade

Terça
+ atividade

Quarta
+ atividade

Quinta
+ atividade

Sexta
+ atividade
```

Não é necessário implementar uma tela separada imediatamente, mas estruturar o código para permitir essa evolução.

---

# 48. Regras importantes

Não permitir cadastro sem título.

Não permitir cadastro sem data.

Não permitir horário final menor que horário inicial.

Ao editar atividade:

- manter o mesmo `id`;
- atualizar `updated_at`.

Ao excluir:

- solicitar confirmação.

Ao concluir:

- mudar status;
- não excluir a atividade.

---

# 49. Logout

Adicionar botão:

```text
Sair
```

Ao clicar:

- encerrar sessão Supabase;
- redirecionar para login.

---

# 50. README

Criar posteriormente um `README.md` contendo:

- apresentação;
- screenshots;
- funcionalidades;
- tecnologias;
- estrutura;
- instalação;
- Supabase;
- deploy;
- segurança;
- licença, se aplicável.

O README deve ser adequado para GitHub e portfólio.

---

# 51. Git

Utilizar commits pequenos e claros.

Exemplos:

```text
feat: create initial agenda layout
```

```text
feat: add monthly calendar
```

```text
feat: add weekly DCT routine
```

```text
feat: implement activity modal
```

```text
feat: integrate Supabase activities
```

```text
feat: add authentication
```

```text
feat: add PDF reports
```

Não criar um único commit gigantesco contendo o projeto inteiro.

---

# 52. Prioridades de UX

Ao tomar decisões de interface, considerar esta ordem:

1. facilidade de uso;
2. clareza;
3. rapidez;
4. organização;
5. estética.

A aplicação será usada como ferramenta de trabalho.

Não priorizar estética sobre funcionalidade.

---

# 53. Fora do escopo da V1

Não implementar inicialmente:

- notificações push;
- integração com WhatsApp;
- Google Calendar;
- e-mails automáticos;
- múltiplos departamentos;
- permissões complexas;
- chat;
- IA;
- upload de documentos;
- aplicativo Android/iOS;
- backend próprio.

Esses recursos podem ser considerados futuramente.

---

# 54. Possíveis evoluções futuras

Preparar o projeto para futuramente suportar:

- múltiplos usuários;
- administradores;
- responsáveis cadastrados;
- anexos;
- fotos de visitas;
- dashboard de atividades;
- estatísticas;
- histórico anual;
- integração com calendário externo;
- notificações;
- relatórios avançados;
- exportação CSV;
- logs de alterações.

Não implementar agora.

---

# 55. Regra para o Codex

Antes de alterar muitos arquivos:

1. analisar a estrutura existente;
2. verificar o que já foi implementado;
3. evitar sobrescrever código funcional sem necessidade;
4. modificar apenas o necessário;
5. manter consistência com a arquitetura definida neste documento.

Ao encontrar uma decisão não especificada:

- escolher a alternativa mais simples;
- manter o projeto sem dependências desnecessárias;
- preservar compatibilidade com GitHub Pages;
- documentar decisões relevantes.

---

# 56. Critério de conclusão da primeira versão

A V1 estará funcional quando:

- usuário conseguir fazer login;
- usuário visualizar o calendário;
- usuário visualizar a rotina semanal;
- usuário selecionar uma data;
- usuário cadastrar atividade;
- usuário editar atividade;
- usuário excluir atividade;
- usuário marcar atividade como concluída;
- atividades permanecerem salvas no Supabase;
- usuário visualizar atividades da semana;
- aplicação funcionar no GitHub Pages;
- usuário não autenticado não conseguir alterar dados;
- layout funcionar corretamente em desktop e celular.

---

# 57. Nome do projeto

Nome visual:

**Agenda Semanal de Atividades – DCT**

Nome recomendado do repositório:

```text
dct-agenda
```

Outras opções aceitáveis:

```text
agenda-dct
dct-weekly-agenda
dct-activities
```

Preferência:

```text
dct-agenda
```

---

# 58. Instrução inicial ao Codex

Ao iniciar o desenvolvimento deste projeto:

1. leia este arquivo por completo;
2. inspecione os arquivos já existentes;
3. não implemente o projeto inteiro de uma vez;
4. comece pela Fase 1;
5. crie a estrutura básica;
6. implemente a tela principal;
7. implemente a rotina semanal fixa;
8. implemente o calendário mensal;
9. utilize dados mockados;
10. valide a interface antes da integração com Supabase.

Depois da Fase 1, aguarde uma nova solicitação antes de avançar para mudanças arquiteturais maiores.

---

# 59. Resultado esperado da Fase 1

Ao concluir a primeira fase, deve existir uma interface funcional semelhante a:

```text
┌───────────────────────────────────────────────────────┐
│ DCT                            Agenda       Sair       │
├───────────────────────────────────────────────────────┤
│                                                       │
│ Agenda Semanal de Atividades                          │
│                                                       │
│ Outubro 2026                      + Nova atividade    │
│                                                       │
│ ┌───────────────────────────────────────────────────┐ │
│ │                   CALENDÁRIO                      │ │
│ └───────────────────────────────────────────────────┘ │
│                                                       │
│ Semana atual                                          │
│                                                       │
│ Segunda                                               │
│ Planejamento na sala                                  │
│ 🌱 Cuidado com as plantas                            │
│                                                       │
│ Terça                                                 │
│ Desenvolvimento de projetos                           │
│                                                       │
│ Quarta                                                │
│ Atendimento                                           │
│ 🌱 Cuidado com as plantas                            │
│                                                       │
│ Quinta                                                │
│ Visitas às escolas                                    │
│                                                       │
│ Sexta                                                 │
│ Limpeza, organização e avaliação                      │
│ 🌱 Cuidado com as plantas                            │
│                                                       │
└───────────────────────────────────────────────────────┘
```

Este documento deve ser tratado como a principal referência funcional e arquitetural do projeto.
