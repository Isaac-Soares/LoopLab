# LoopLab

Site de treino de lógica de programação em Python, feito para quem está se preparando para provas de estágio, concursos e entrevistas técnicas. Os exercícios rodam direto no navegador, sem instalar nada.

[![Abrir o LoopLab](https://img.shields.io/badge/abrir-LoopLab-36e3ff?style=for-the-badge)](https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/)

## O que tem

- **8 trilhas de estudo:** Fundamentos, Decisão & lógica, Repetição, Vetores & matrizes, Funções, Strings, Busca & ordenação e Raciocínio de prova.
- **60 exercícios por trilha:** 30 questões objetivas (múltipla escolha, com explicação) e 30 desafios para programar.
- **Editor de código** com cores de sintaxe do Python, numeração de linhas, indentação automática e fechamento automático de parênteses, colchetes, chaves e aspas.
- **Execução de Python no navegador** com [Pyodide](https://pyodide.org). Ao rodar, o site compara a saída do seu código com a saída esperada e só marca o exercício como resolvido se bater.
- **Código salvo automaticamente** por exercício, no próprio navegador (`localStorage`).
- **Busca** para filtrar as questões de cada trilha.
- **Contador de resolvidos e precisão** nas questões objetivas.

## Como usar

1. Abra a página inicial e escolha uma trilha (ou clique em **Desafio aleatório**).
2. Escolha entre **Objetivas** e **Para codar**.
3. Nos desafios de programar, escreva a solução, clique em **Rodar código** e confira a saída.

A primeira execução baixa o Python (alguns segundos). Depois disso ele fica em cache.

## Rodando localmente

O projeto é estático, sem build e sem dependências para instalar. Clone o repositório e sirva a pasta com qualquer servidor local:

```bash
git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
cd NOME-DO-REPOSITORIO
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

É necessário ter internet, porque o Pyodide, o CodeMirror e as fontes são carregados por CDN.

## Estrutura

```
.
├── index.html
├── css
│   └── style.css
└── js
    └── app.js
```

- `index.html`: página inicial, carregamento das bibliotecas externas e contêiner das trilhas.
- `css/style.css`: estilos do site, incluindo o tema de cores do editor e as regras responsivas.
- `js/app.js`: dados das trilhas, geração dos exercícios, navegação por hash, execução do Python e salvamento.

## Tecnologias

- HTML, CSS e JavaScript puros
- [Pyodide](https://pyodide.org) 0.26.4 para executar Python no navegador
- [CodeMirror](https://codemirror.net) 5.65.16 como editor de código
- Fontes Space Grotesk e DM Mono (Google Fonts)

## Publicando no GitHub Pages

1. Envie os arquivos para um repositório, com o `index.html` na raiz.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. Aguarde alguns minutos. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Limitações conhecidas

- O progresso fica salvo apenas no navegador e no dispositivo em que foi feito. Limpar os dados do navegador apaga tudo.
- O Python roda na thread principal da página, então um laço infinito (por exemplo, `while True` sem saída) trava a aba. Basta recarregar.
- Os desafios de programar são validados comparando a saída impressa com a esperada. Use `print()` para exibir o resultado.
- Bibliotecas que dependem de rede, como `requests`, não funcionam no Pyodide.
