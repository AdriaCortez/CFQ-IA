# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

 ***DOCUMENTAÇÃO TÉCNICO-FUNCIONAL: SISTEMA CFQ IA***

  **\[Página de Início / Start\]**

   \* Rota: /enter (Arquivo: app/routes/page/startPage.tsx)

   \* Módulo: Gestão de Fluxo de Autenticação \- NÃO NECESSARIAMENTE

   \* Objetivo Principal: Atuar como Gateway (ponto de decisão) para que o usuário escolha entre criar um novo perfil ou acessar um perfil existente.

  ***Perfis de Usuário***

     \* Usuário Não Autenticado:

     \* Acesso: Irrestrito.

     \* Permissões: Navegar para /login, /subscribe ou retornar à raiz (/).

   \* Usuário Autenticado: Não há restrição ativa na rota que impeça um usuário já logado de acessá-la, dependendo do roteamento superior.

  ***Componentes da Interface (Especificações)***

      \* Background Visual: Fundo bg-black com elemento decorativo bg-blue-600/5 blur-\[150px\] para efeito de iluminação de profundidade \- DESNECESSÁRIO.

       \* Botão "Voltar" (Header):

       \* Ação: navigate("/").

       \* Comportamento Visual: Animação Framer Motion (x: \-20 para 0), hover revela translação no eixo X do ícone interno (seta).

       \* Botão Primário ("Entrar na conta"):

       \* Ação: Invoca função loginPage() (navigate("/login")).

       \* Comportamento Visual: Fundo bg-blue-600, no hover sofre scale: 1.02 e muda a cor para rgb(103, 181, 255). No click (tap) sofre scale: 0.98.

       \* Botão Secundário ("Criar novo perfil"):

       \* Ação: Invoca função SubsPage() (navigate("/subscribe")).

       \* Comportamento Visual: Fundo transparente com borda border-gray-800. No hover a borda escurece rgba(18,18,18,1) e fundo vai para bg-gray-900.

  ***Fluxos Principais***

   *1\. Acesso: O componente renderiza através do Router. As animações iniciais de opacidade (0 para 1\) e escala (0.9 para 1\) ocorrem no container principal.*

   *2\. Decisão: O usuário clica em uma das opções; a navegação ocorre puramente via React Router (Client-side), sem comunicação com backend neste estágio.*

  ***Regras de Negócio e Validações***

   *\* Não há validação de formulário, pois a página é estritamente um roteador visual.*

  **\[Página de Cadastro / Subscribe\]**

     \* Rota: /subscribe (Arquivos: subscribeService.tsx \+ subscribeForm.tsx)

     \* Módulo: Cadastro e Provisionamento

  \* Objetivo Principal: Coletar dados do usuário para criar um novo registro persistente e seguro na base de dados.

  ***Perfis de Usuário***

     \* Usuário Não Autenticado:

     \* Acesso: Irrestrito.

     \* Comportamento: Preenche o formulário para criação de identidade \- TROCAR PRA “PERFIL”.

  ***Componentes da Interface (Especificações)***

   \* Formulário (\<form\>): Intercepta o evento de submissão vinculando-o à função SubmitSubs \- TROCAR PRA “HANDLESUBSCRIBE”.

    \* Campo "Nome Completo": Input texto.

    \* Variável de estado: nome.

  \* Requisito: required. 

  \* Placeholder: "Como quer ser chamado?".

 \* Campo "E-mail": Input e-mail. Variável de estado: email. Requisito: required. Placeholder: "seu@email.com".

 \* Campo "Senha": Input senha. Variável de estado: senha. Requisito: required. Placeholder: "••••••••".

  \* Botão "Finalizar Cadastro": Submete o formulário. Hover altera brilho e escala (scale-\[1.02\]).

  ***Fluxos Principais \- Nota adicional: Não menciona as páginas de API***

       1\. Submissão: O evento e.preventDefault() bloqueia o recarregamento.

 2\. Requisição Backend: Fetch HTTP POST para [http\://localhost:3700/subscribe](http://localhost:3700/subscribe) com payload JSON { email, senha, nome } e credentials: "include".

   3\. Processamento Backend (API Login):

       \* Verifica nulidade de e-mail, nome ou senha (Retorna Erro 400).

       \* Executa o hash da senha: bcrypt.hash(senha, 10).

       \* Tenta salvar no MongoDB.

   4\. Resposta:

      \* Se Erro 11000 (MongoDB): Retorna 400 "Conta já cadastrada" \- ERRO 11000 E 400 SÃO DOIS DIFERENTES.

       \* Sucesso: Retorna 201 "Cadastro salvo\!" com o \_id.

   5\. Ação Frontend: Navega forçadamente para a página de Login (navigate("/login")).

  ***Validações***

   \* Frontend: Atributo HTML nativo required.

   \* Backend: Validação estrita contra campos nulos no Express.

  ***Estados da Aplicação***

   \* Erro Silencioso: Atualmente, erros no frontend (bloco catch no serviço) apenas disparam console.error. O usuário não recebe um toast visual caso a API recuse (ponto de atenção arquitetural).

  **\[Página de Autenticação / Login\]**

   \* Rota: /login (Arquivos: loginService.tsx \+ loginForm.tsx)

   \* Módulo: Gestão de Identidade e Sessão

  \* Objetivo Principal: Autenticar o usuário contra o banco de dados \- “CONTRA”? e gerar token de sessão via Cookie.

  ***Perfis de Usuário***

   \* Usuário Não Autenticado: Preenche credenciais para iniciar sessão.

  ***Componentes da Interface (Especificações)***

   \* Campo E-mail: Input email vinculado ao estado email.

   \* Campo Senha: Input password vinculado ao estado senha.

   \* Botão "Entrar": Input submit vinculado a HandleAuth.

  ***Fluxos Principais***

      *1\. Tentativa de Login: Disparo da função HandleAuth.*

   *2\. Requisição: POST para http\://localhost:3700/auth-login contendo { email, senha }.*

   ***Processamento Backend:***

       \* Busca registro por e-mail no Mongoose (forçando .select("+senha")).

   \* Compara a senha em texto plano com o hash armazenado via bcrypt.compare.

     \* Geração de Token: Assina um JWT contendo id e email com chave simétrica, expiração "20m".

   \* Set-Cookie: Define cookie auth (httpOnly: true, secure: false, sameSite: "lax", maxAge: 1200000).

   ***Recuperação de Estado (SubmitedToken):***

  \* Ao obter status ok do Login, o frontend dispara uma segunda requisição GET imediata para /st (Validação de Sessão).

   \* Este endpoint lê o recém-criado cookie auth, verifica o JWT, e devolve os dados completos do usuário (sem a senha).

   *5\. Sucesso: Navega para /chat injetando o payload do usuário no state do React Router (navigate("/chat", { state: { user } })).*

  ***Validações***

   \* Frontend: Prevenção de campos vazios pelo HTML5.

 \*Backend: Erro 403 padronizado para "Cadastro inválido\!" (não encontrado) ou "Senha inválida\!".

   \* Tratamento de Erro (Frontend): Se a API falhar, um alert("Credenciais inválidas. Crie uma conta ou tente novamente") é exibido nativamente no navegador.

  **\[Página de Inteligência Artificial / Chat\]**

   \* Rota: /chat (Arquivos: chatService.tsx \+ chatLayout.tsx)

   \* Módulo: Core / Interação

 \* Objetivo Principal: Interface persistente de comunicação entre o usuário e a IA Dalton

  ***Perfis de Usuário***

   \* Usuário Autenticado:

    \* Acesso: Protegido rigorosamente por validação no useEffect.

   \* Permissões: Enviar prompts, ler respostas, visualizar menu lateral de histórico, realizar logout.

  ***Componentes da Interface (Especificações)***

   \* Sidebar (Histórico):

 \* Abertura controlada pelo estado isSidebarOpen. Background escurecido (bg-black/60 backdrop-blur-sm).

       \* Renderiza o array Mensagem filtrando apenas as de autor \=== "user".

   \* Menu Dropdown (Usuário):

    \* Exibido no hover (onMouseEnter) sobre o nome do usuário.

    \* Opções: "Meu perfil" (profile()) e "Sair da conta" (logout()).

    \* Área de Mensagens:

    \* Container dinâmico com flex-col-reverse (para forçar o scroll na base).

     \* Balão do Usuário: Alinhado à direita, fundo bg-gray-800.

    \* Balão da IA: Alinhado à esquerda, fundo bg-blue-700.

   \* Input de Texto (textarea):

       \* Comporta crescimento automático até 200px.

       \* Permite submissão por botão de "Enter" (capturado no onKeyDown, evitado se shiftKey estiver pressionada).

  ***Fluxos Principais***

   *1\. Ciclo de Vida (Montagem):*

       \* O useEffect dispara a função Validacao(), que bate no backend (/st). Se falhar (usuário deslogado/cookie expirado), dispara alert() e derruba o usuário para /login.

       \* A função Historico() recupera o array do backend, inverte a ordem cronológica, formata o role ("user" ou "gepeto") e injeta no estado local Mensagem.

   *2\. Envio de Mensagem:*

 \* Usuário submete o formulário \-\> Chama a API http\://localhost:3701/chat/nova-mensagem.

     \* A mensagem é injetada no frontend provisoriamente. O input é limpo.

      \* A API backend cria registro na coleção Mensagens e Historico.

   *3\. Processamento da IA (Polling \- Regra Crítica):*

       \* A função frontend RespostaDaApi(\_id) é acionada.

       \* Faz fetch no endpoint /gepeto/:id. O backend, por sua vez, dispara POST para http\://geppetto.cfq.org.br:44401/api/message.

       \* Se a resposta da API Gepeto não estiver pronta (ou em caso de atraso na rede), o frontend executa chamadas recursivas setTimeout(() \=\> RespostaDaApi(\_id), 1000\) a cada 1 segundo até que o status seja "concluído".

   \* Ao obter o status "concluído", injeta o texto na tela. Se falhar gravemente, aguarda 3 segundos e tenta novamente.

  ***Regras de Negócio***

   *\* Integração Terceirizada Assíncrona: A aplicação depende de uma arquitetura de polling (perguntar repetidamente) para compensar a falta de WebSockets na comunicação com a API de IA.*

   *\* Persistência Dupla: O backend salva dados de texto tanto na coleção Mensagens (para gerenciamento de status de IA) quanto na Historico (para a linha do tempo do usuário).*

  ***Segurança e Auditoria***

   *\* Autenticação Obrigatória: O middleware de backend authObrigatorio inspeciona o token JWT (descriptografando o payload via chave simétrica process.env  4\. Validação Backend:*

       *\* O usuário é recuperado via req.userId extraído do Token JWT.*

       *\* O hash da senha atual é comparado via bcrypt.compare \- Repetido.*

     *\* Em caso de sucesso, bcrypt.hash gera a nova criptografia e .save() subscreve o registro..ACCESS\_TOKEN\_TEST) antes de permitir gravação de histórico ou comunicação com a IA.*

  **\[Página de Gestão de Perfil\]**

   \* Rota: /perfil (Arquivos: profilePage.tsx \+ changePasswordService.tsx \+ changePasswordForm.tsx)

   \* Módulo: Conta e Segurança

   \* Objetivo Principal: Exibição de dados não-sensíveis da sessão e painel para alteração destrutiva \- Eu alteraria pra “deletar usuário” ou atualização de credenciais.

  ***Perfis de Usuário***

    \* Usuário Autenticado:

   \* Possui controle total sobre o estado do próprio registro na base de dados.

  ***Componentes da Interface (Especificações)***

   \* Header: Exibe o Avatar (inicial do nome em maiúsculo), Nome e E-mail provindos do objeto user.

   \* Modais (Framer Motion AnimatePresence):

   \* Modal 1 (Configurações): Contém botões "Alterar Senha" (Navega para rota /trocar-senha) e "Deletar Conta".

   \* Modal 2 (Deletar): Renderização condicional por cima do Modal 1\. Contém input password para confirmação forçada e um botão vermelho letal desabilitado se o input estiver vazio.

  ***Fluxos Principais (Alteração de Senha)***

   1\. Acesso: O usuário é levado à rota /trocar-senha.

  2\. Validação Frontend: A função trocarsenha bloqueia a requisição \- (X ERRADO) se novasenha \!== confirmarsenha ou se a senhaatual for nula (via alert()).

3\. Requisição Backend: Método PUT [http\://localhost:3700/trocarsenha](http://localhost:3700/trocarsenha).

   ***4\. Validação Backend:***

       \* O usuário é recuperado via req.userId extraído do Token JWT.

       \* O hash da senha atual é comparado via bcrypt.compare \- Repetido.

     \* Em caso de sucesso, bcrypt.hash gera a nova criptografia e .save() subscreve o registro.

   ***5\. Ação Frontend: Finaliza com navigate("/perfil").***

  Fluxos Principais (Deleção de Conta)

   *1\. Confirmação: Usuário informa senha no modal.*

   *2\. Requisição Backend: Dispara requisição POST/DELETE repassando a senha em texto claro.*

   *3\. Processo Destrutivo: O backend repete a validação bcrypt.compare. Sendo verdadeira, chama Credenciais.findByIdAndDelete.*

   *4\. Limpeza de Sessão: O backend executa res.clearCookie("auth"), o usuário perde a sessão e o frontend realiza o logout completo.*

  **Validações e Feedback**

   \* Carregamento: A tela de "Alterar Senha" possui um estado booleano carregando (usado para inibir duplo clique e alterar botões visuais).

   \* Alerta de Fraude/Erro: Caso o usuário forneça a senha antiga errada, a aplicação aborta qualquer gravação de dados e avisa (Erro 403).

  **OBSERVAÇÕES ARQUITETURAIS**

   *1\. Dívida Técnica de UI/UX: A aplicação mistura a biblioteca de alertas "SweetAlert" (citada no arquivo chatService.tsx através da importação aviso('swal')) com funções nativas e primitivas do navegador (alert()), gerando uma inconsistência de experiência visual entre as telas de Login e de Chat.*

   *2\. Segurança da API IA: O backend de Chat possui uma rota GET /gepeto/:id protegida que expõe logs com tokens sensíveis (AUTHORIZATION DENIED) e interage com um modelo LLM externo através de um protocolo HTTP não seguro em porta customizada.*

   *3\. Cross-Origin (CORS): Os backends estão aceitando conexões de múltiplas portas (5173, 3700, 3701, e "localhost" bruto) com passagem explícita de credenciais, o que demonstra uma arquitetura robusta para ambientes distribuídos.*


