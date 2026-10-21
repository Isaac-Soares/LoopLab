# LoopLab

Site de treino de lógica de programação em Python, feito para quem está se preparando para provas de estágio, concursos e entrevistas técnicas. Os exercícios rodam direto no navegador, sem instalar nada.

[![Abrir o LoopLab](https://img.shields.io/badge/abrir-LoopLab-36e3ff?style=for-the-badge)](https://isaac-soares.github.io/LoopLab/)

## O que tem

- **8 trilhas de estudo:** Fundamentos, Decisão & lógica, Repetição, Vetores & matrizes, Funções, Strings, Busca & ordenação e Classes & objetos.
- **41 exercícios escritos à mão**, do básico ao intermediário: 24 questões objetivas (com explicação depois da resposta) e 17 desafios para programar.
- **Conteúdo real de Python:** `print` e `input`, `if/elif/else`, `for` e `while`, listas, matrizes, dicionários, funções, recursão, strings, busca, ordenação, classes e herança.
- **Testes automáticos** nos desafios de programar. O site roda o seu código contra vários casos, mostra quantos passaram e, nos que falharam, o que foi obtido e o que era esperado. O exercício só conta como resolvido quando todos passam.
- **Editor de código** com cores de sintaxe do Python, numeração de linhas, indentação automática e fechamento automático de parênteses, colchetes, chaves e aspas.
- **Execução de Python no navegador** com [Pyodide](https://pyodide.org), incluindo `input()` com entradas simuladas.
- **Código salvo automaticamente** por exercício, no próprio navegador (`localStorage`).
- **Busca** para filtrar as questões de cada trilha.
- **Contador de resolvidos e precisão** nas questões objetivas.

## Como usar

1. Abra a página inicial e escolha uma trilha (ou clique em **Desafio aleatório**).
2. Escolha entre **Objetivas** e **Para codar**.
3. Nos desafios de programar, leia o enunciado e os exemplos, escreva a solução e clique em **Rodar código**.

A primeira execução baixa o Python (alguns segundos). Depois disso ele fica em cache.

## Rodando localmente

O projeto é estático, sem build e sem dependências para instalar. Clone o repositório e sirva a pasta com qualquer servidor local:

```bash
git clone https://github.com/Isaac-Soares/LoopLab.git
cd LoopLab
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
├── js
│   ├── exercicios.js
│   └── app.js
└── img
    └── logo.jpg
```

- `index.html`: página inicial e carregamento das bibliotecas externas.
- `css/style.css`: estilos do site, incluindo o tema de cores do editor e as regras responsivas.
- `js/exercicios.js`: todas as trilhas e exercícios.
- `js/app.js`: navegação, editor, execução do Python, testes e salvamento.
- `img/logo.jpg`: ícone do site.

## Adicionando exercícios

Os exercícios ficam em `js/exercicios.js`, dentro de cada trilha.

**Questão objetiva:** título, enunciado (aceita HTML, como `<code>`), quatro alternativas, índice da correta e a explicação.

```js
o('Divisão inteira e resto', '<code>print(7 // 2, 7 % 2)</code>O que é impresso?', ['3 1', '3.5 1', '3 2', '4 1'], 0, '// é a divisão inteira e % é o resto.')
```

**Desafio de programar:** título, enunciado, código inicial e a lista de testes. Existem dois formatos de teste.

```js
// Testa funções e classes: [expressão em Python, valor esperado]
p('Maior valor', 'Crie maior(lista)...', fn('maior', 'lista'), [['maior([3, 9, 2])', 9], ['maior([7])', 7]])

// Testa programas com input e print: io(['linhas de entrada'], 'saída esperada')
p('Soma de dois números', 'Leia dois inteiros...', '', [io(['3', '4'], '7')])
```

## Tecnologias

- HTML, CSS e JavaScript puros
- [Pyodide](https://pyodide.org) 0.26.4 para executar Python no navegador
- [CodeMirror](https://codemirror.net) 5.65.16 como editor de código
- Fontes Space Grotesk e DM Mono (Google Fonts)

## Publicando no GitHub Pages

1. Envie os arquivos para um repositório, com o `index.html` na raiz.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. Aguarde alguns minutos. O site fica em `https://isaac-soares.github.io/LoopLab/`.

## Limitações conhecidas

- O progresso fica salvo apenas no navegador e no dispositivo em que foi feito. Limpar os dados do navegador apaga tudo.
- O Python roda na thread principal da página, então um laço infinito (por exemplo, `while True` sem saída) trava a aba. Basta recarregar.
- Nos exercícios com `input()`, não coloque mensagem dentro dos parênteses: o texto da mensagem não é exibido.
- Bibliotecas que dependem de rede, como `requests`, não funcionam no Pyodide.
