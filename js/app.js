const tracks = [
  {
    id: 'base',
    icon: '01',
    color: '#36e3ff',
    name: 'Fundamentos',
    desc: 'Variáveis, tipos, operadores e leitura de código.',
    topics: [
      'Variáveis e constantes',
      'Tipos de dados',
      'Operadores aritméticos',
      'Entrada e saída',
      'Conversão de tipos'
    ]
  },
  {
    id: 'logic',
    icon: '02',
    color: '#9d7bff',
    name: 'Decisão & lógica',
    desc: 'Booleanos, tabelas-verdade e estruturas condicionais.',
    topics: [
      'Booleanos',
      'Operadores lógicos',
      'if / elif / else',
      'Tabelas-verdade',
      'Comparações'
    ]
  },
  {
    id: 'loops',
    icon: '03',
    color: '#ffca75',
    name: 'Repetição',
    desc: 'Contadores, acumuladores e laços de controle.',
    topics: [
      'for',
      'while',
      'Contadores',
      'Acumuladores',
      'break e continue'
    ]
  },
  {
    id: 'arrays',
    icon: '04',
    color: '#86efac',
    name: 'Vetores & matrizes',
    desc: 'Percurso, agregação e acesso a estruturas.',
    topics: [
      'Listas',
      'Índices',
      'Laços em listas',
      'Matrizes',
      'Agregações'
    ]
  },
  {
    id: 'functions',
    icon: '05',
    color: '#f58bbb',
    name: 'Funções',
    desc: 'Parâmetros, retorno, escopo e recursão.',
    topics: [
      'Definição',
      'Parâmetros',
      'Retorno',
      'Escopo',
      'Recursão'
    ]
  },
  {
    id: 'strings',
    icon: '06',
    color: '#66b7ff',
    name: 'Strings',
    desc: 'Manipule textos, caracteres e padrões.',
    topics: [
      'Índices',
      'Fatiamento',
      'Métodos',
      'Normalização',
      'Padrões'
    ]
  },
  {
    id: 'algorithms',
    icon: '07',
    color: '#fd9d65',
    name: 'Busca & ordenação',
    desc: 'Estratégias, custo e implementação essencial.',
    topics: [
      'Busca linear',
      'Busca binária',
      'Ordenação',
      'Complexidade',
      'Trocas'
    ]
  },
  {
    id: 'reasoning',
    icon: '08',
    color: '#d6e579',
    name: 'Raciocínio de prova',
    desc: 'Sequências, proposições e problemas clássicos.',
    topics: [
      'Proposições',
      'Sequências',
      'Conjuntos',
      'Probabilidade',
      'Argumentação'
    ]
  }
];

const $ = s => document.querySelector(s), home = $('#inicio'), workspace = $('#workspace');
let state = JSON.parse(localStorage.getItem('looplab-state') || '{"solved":[],"attempts":0,"hits":0,"code":{}}');
state.code ??= {};
const track = () => tracks.find(t => location.hash === `#trilha/${ t.id }`);

function save() {
  localStorage.setItem('looplab-state', JSON.stringify(state));
  $('#solved-count').textContent = state.solved.length;
  $('#accuracy').textContent = state.attempts ? `${ Math.round(state.hits / state.attempts * 100) }%` : '—';
}

function objective(t, n) {
  const a = n + 2, b = n % 8 + 1;
  let q = [
    `Resultado da expressão`,
    `Qual é o resultado de <code>${ a } * 2 + ${ b }</code>?`,
    [
      `${ a * 2 + b }`,
      `${ (a + b) * 2 }`,
      `${ a + b }`,
      `${ a * 2 - b }`
    ],
    0,
    'Multiplicação é executada antes da soma.'
  ];
  if (t.id === 'logic')
    q = [
      'Tabela-verdade',
      `Se p é verdadeiro e q é falso, <code>p and not q</code> vale:`,
      [
        'verdadeiro',
        'falso',
        'nulo',
        'indefinido'
      ],
      0,
      'not q é verdadeiro; então verdadeiro and verdadeiro é verdadeiro.'
    ];
  if (t.id === 'loops')
    q = [
      'Acumulador',
      `Qual valor fica em soma após <code>soma = 0; for i in range(1, ${ a + 1 }): soma += i</code>?`,
      [
        `${ a * (a + 1) / 2 }`,
        `${ a * a }`,
        `${ a + 1 }`,
        `${ a }`
      ],
      0,
      'O acumulador recebe cada inteiro do intervalo.'
    ];
  if (t.id === 'arrays')
    q = [
      'Índices',
      `Uma lista tem ${ a + 4 } itens. Qual é o último índice?`,
      [
        `${ a + 3 }`,
        `${ a + 4 }`,
        '0',
        `${ a + 5 }`
      ],
      0,
      'Em Python, o último índice é tamanho − 1.'
    ];
  if (t.id === 'functions')
    q = [
      'Retorno',
      `Uma função recebe x=${ a } e retorna <code>x * x</code>. Qual valor retorna?`,
      [
        `${ a * a }`,
        `${ a * 2 }`,
        `${ a }`,
        `${ a + 1 }`
      ],
      0,
      'O retorno é o quadrado do argumento.'
    ];
  if (t.id === 'strings')
    q = [
      'Comprimento',
      `Qual é o tamanho de <code>"code${ 'x'.repeat(n % 4) }"</code>?`,
      [
        `${ 4 + n % 4 }`,
        `${ 3 + n % 4 }`,
        `${ 5 + n % 4 }`,
        '0'
      ],
      0,
      'Cada caractere conta uma posição.'
    ];
  if (t.id === 'algorithms')
    q = [
      'Custo de busca',
      'Em uma lista ordenada muito grande, qual busca elimina metade das opções?',
      [
        'busca binária',
        'busca linear',
        'bubble sort',
        'pilha'
      ],
      0,
      'A busca binária divide o intervalo de busca a cada etapa.'
    ];
  if (t.id === 'reasoning')
    q = [
      'Sequência',
      `Complete: ${ a }, ${ a + 3 }, ${ a + 6 }, ?`,
      [
        `${ a + 9 }`,
        `${ a + 8 }`,
        `${ a + 12 }`,
        `${ a + 6 }`
      ],
      0,
      'A regra é acrescentar 3 a cada termo.'
    ];
  return {
    title: `${ t.name } · objetiva ${ String(n + 1).padStart(2, '0') }: ${ q[0] }`,
    text: q[1],
    answers: q[2],
    correct: q[3],
    explain: q[4]
  };
}

function code(t, n) {
  let x = n + 5, r = {
      title: `Some os números de 1 a ${ x }`,
      brief: `Escreva um programa que calcule e exiba a soma de todos os inteiros de 1 até ${ x }.`,
      starter: `# Desafio ${ n + 1 }\n# Escreva sua solução abaixo\n\n`
    };
  if (t.id === 'base')
    r = {
      title: `Converta ${ x } minutos`,
      brief: `Crie a variável minutos com valor ${ x } e exiba quantos segundos esse total representa.`,
      starter: `minutos = ${ x }\n\n# calcule e exiba os segundos\n`
    };
  if (t.id === 'logic')
    r = {
      title: `Classifique o número ${ x }`,
      brief: `Guarde ${ x } em uma variável. Exiba "par" se ele for par; caso contrário, exiba "ímpar".`,
      starter: `numero = ${ x }\n\n# escreva a decisão aqui\n`
    };
  if (t.id === 'loops')
    r = {
      title: `Tabuada do ${ x }`,
      brief: `Use um laço para exibir a tabuada de ${ x }, de 1 a 10.`,
      starter: `numero = ${ x }\n\n# use for e range\n`
    };
  if (t.id === 'arrays')
    r = {
      title: 'Maior valor da lista',
      brief: 'Encontre e exiba o maior número da lista. Não use max() neste desafio.',
      starter: `numeros = [${ x }, 2, ${ x + 4 }, 1, ${ x - 2 }]\nmaior = numeros[0]\n\n# percorra a lista\n`
    };
  if (t.id === 'functions')
    r = {
      title: 'Função dobro',
      brief: `Crie a função dobro que receba um número e retorne seu dobro. Depois, exiba o retorno para ${ x }.`,
      starter: `def dobro(numero):\n    # retorne o dobro\n    pass\n\n# chame a função\n`
    };
  if (t.id === 'strings')
    r = {
      title: 'Conte as vogais',
      brief: 'Conte e exiba quantas vogais existem na palavra "programacao".',
      starter: `palavra = "programacao"\nvogais = "aeiou"\ncontador = 0\n\n# percorra a palavra\n`
    };
  if (t.id === 'algorithms')
    r = {
      title: 'Busca linear',
      brief: `Crie uma busca linear que encontre o valor ${ x } em uma lista e exiba seu índice.`,
      starter: `numeros = [3, ${ x - 1 }, 8, ${ x }, 12]\nalvo = ${ x }\n\n# implemente a busca linear\n`
    };
  if (t.id === 'reasoning')
    r = {
      title: 'Sequência de pares',
      brief: `Exiba os primeiros ${ Math.min(x, 12) } números pares positivos usando um laço.`,
      starter: `quantidade = ${ Math.min(x, 12) }\n\n# gere a sequência\n`
    };
  return {
    ...r,
    hints: [
      'Que dados entram no problema?',
      'Qual estrutura resolve melhor?',
      'Teste mentalmente com valores pequenos.'
    ]
  };
}

function renderTracks() {
  $('#track-grid').innerHTML = tracks.map(t => `
    <article class="track" style="--track:${ t.color }" data-track="${ t.id }">
      <div class="track-icon">${ t.icon }</div>
      <h3>${ t.name }</h3>
      <p>${ t.desc }</p>
      <div class="track-foot">
        <span>${ state.solved.filter(x => x.startsWith(t.id)).length }/60</span>
        <b>ABRIR →</b>
      </div>
    </article>
  `).join('');
  document.querySelectorAll('.track').forEach(e => e.onclick = () => location.hash = `trilha/${ e.dataset.track }`);
}

function template(t) {
  let done = state.solved.filter(x => x.startsWith(t.id)).length;
  const topicItems = t.topics.map((topic, i) => `<li>${ String(i + 1).padStart(2, '0') } · ${ topic }</li>`).join('');
  return `
    <section class="course">
      <header class="course-hero">
        <button class="back" id="back-home">← VOLTAR AO MAPA</button>
        <div class="course-title">
          <div>
            <div class="eyebrow">// TRILHA ${ t.icon } · PYTHON</div>
            <h1>${ t.name }</h1>
            <p>${ t.desc } Escolha uma questão objetiva ou abra um laboratório Python para escrever sua solução.</p>
          </div>
          <strong>${ done }/60</strong>
        </div>
      </header>
      <div class="course-body">
        <aside class="course-nav">
          <label>CONTEÚDOS DA TRILHA</label>
          <ul class="topic-list">${ topicItems }</ul>
          <div class="mini-stat">
            <b>${ done }/60</b>
            <span>exercícios concluídos</span>
          </div>
        </aside>
        <section class="course-content" id="course-content"></section>
      </div>
    </section>
  `;
}

function cards(t, type) {
  return Array.from({ length: 30 }, (_, n) => {
    let q = type === 'objective' ? objective(t, n) : code(t, n);
    const isObjective = type === 'objective';
    return `
      <button class="exercise-card" data-type="${ type }" data-index="${ n }">
        <span class="card-n">${ String(n + 1).padStart(2, '0') } / 30</span>
        <h3>${ q.title.split(': ').pop() }</h3>
        <p>${ isObjective ? 'Teste sua leitura de código e conceitos.' : 'Abra o editor e escreva a solução em Python.' }</p>
        <span class="card-type">${ isObjective ? 'MÚLTIPLA ESCOLHA' : 'LABORATÓRIO PYTHON' } →</span>
      </button>
    `;
  }).join('');
}

function list(t, type = 'objective') {
  let el = $('#course-content');
  const isObjective = type === 'objective';
  el.innerHTML = `
    <div class="content-kicker">// ${ isObjective ? 'CONHECIMENTO' : 'PRÁTICA GUIADA' }</div>
    <h2>${ isObjective ? 'Questões objetivas' : 'Desafios para programar' }</h2>
    <p>${ isObjective ? '30 perguntas com feedback para consolidar conceitos antes da prática.' : '30 problemas com editor Python. Seus rascunhos ficam salvos neste dispositivo.' }</p>
    <div class="switcher">
      <button class="${ isObjective ? 'active' : '' }" data-list="objective">30 OBJETIVAS</button>
      <button class="${ isObjective ? '' : 'active' }" data-list="code">30 PARA CODAR</button>
    </div>
    <input id="search" class="search" type="search" placeholder="Buscar questão (ex.: lista, soma, par)" aria-label="Buscar questão">
    <div class="exercise-grid">${ cards(t, type) }</div>
  `;
  document.querySelectorAll('[data-list]').forEach(b => b.onclick = () => list(t, b.dataset.list));
  $('#search').oninput = e => {
    let q = e.target.value.toLowerCase();
    document.querySelectorAll('.exercise-card').forEach(c => c.hidden = !c.textContent.toLowerCase().includes(q));
  };
  document.querySelectorAll('.exercise-card').forEach(b => b.onclick = () => challenge(t, b.dataset.type, +b.dataset.index));
}

function challenge(t, type, n) {
  let el = $('#course-content');
  if (type === 'objective') {
    let q = objective(t, n);
    const choices = q.answers.map((a, i) => `<button class="choice" data-answer="${ i }">${ String.fromCharCode(65 + i) }. ${ a }</button>`).join('');
    el.innerHTML = `
      <div class="challenge-view">
        <div class="challenge-toolbar">
          <button id="back-list">← VOLTAR ÀS QUESTÕES</button>
          <span class="content-kicker">OBJETIVA ${ String(n + 1).padStart(2, '0') } / 30</span>
        </div>
        <article class="question-shell">
          <div class="question-head">
            <div class="content-kicker">// ${ t.name.toUpperCase() }</div>
            <h2>${ q.title }</h2>
            <p>${ q.text }</p>
          </div>
          <div class="choices">${ choices }</div>
          <div class="answer-feedback" id="answer-feedback"></div>
        </article>
      </div>
    `;
    $('#back-list').onclick = () => list(t);
    document.querySelectorAll('.choice').forEach(b => b.onclick = () => answer(t, n, +b.dataset.answer, q));
    return;
  }
  let q = code(t, n), key = `${ t.id }-code-${ n }`, draft = state.code[key] ?? q.starter;
  const hints = q.hints.map(hint => `<li>${ hint }</li>`).join('');
  el.innerHTML = `
    <div class="challenge-view">
      <div class="challenge-toolbar">
        <button id="back-list">← VOLTAR AOS DESAFIOS</button>
        <span class="content-kicker">LABORATÓRIO ${ String(n + 1).padStart(2, '0') } / 30</span>
      </div>
      <article class="question-shell code-layout">
        <section class="challenge-copy">
          <div class="content-kicker">// DESAFIO PYTHON</div>
          <h2>${ q.title }</h2>
          <p>${ q.brief }</p>
          <h4>ROTEIRO DE PENSAMENTO</h4>
          <ul>${ hints }</ul>
        </section>
        <section class="editor-pane">
          <div class="editor-head">solution.py <span class="cyan">●</span> salvo neste navegador</div>
          <textarea class="editor" id="code-editor" spellcheck="false" aria-label="Editor Python"></textarea>
          <div class="editor-actions">
            <button class="button" id="check-code">Rodar código</button>
            <button class="button primary" id="save-code">Salvar código</button>
            <span class="saved-status" id="saved-status">salvo automaticamente</span>
          </div>
          <pre class="run-result" id="run-result">Escreva sua solução e clique em “Rodar código”. A primeira execução baixa o Python (alguns segundos).</pre>
        </section>
      </article>
    </div>
  `;
  const ta = $('#code-editor');
  const cm = typeof CodeMirror !== 'undefined' ? CodeMirror.fromTextArea(ta, {
    mode: 'python',
    theme: 'looplab',
    lineNumbers: true,
    indentUnit: 4,
    smartIndent: true,
    autoCloseBrackets: true,
    extraKeys: {
      Tab: c => c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('    ', 'end'),
      'Shift-Tab': c => c.indentSelection('subtract')
    }
  }) : null;
  const get = () => cm ? cm.getValue() : ta.value;
  if (cm) {
    cm.setValue(draft);
  } else {
    ta.value = draft;
    ta.onkeydown = e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, '    ');
      }
    };
  }
  let timer;
  const persist = () => {
    state.code[key] = get();
    save();
    $('#saved-status').textContent = 'salvo agora';
  };
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(persist, 350);
  };
  if (cm) cm.on('change', schedule);
  else ta.oninput = schedule;
  $('#save-code').onclick = persist;
  $('#back-list').onclick = () => list(t, 'code');
  $('#check-code').onclick = () => runCode(t, n, get(), $('#run-result'), $('#check-code'));
}

let pyReady;
const getPy = () => pyReady ??= loadPyodide();
const norm = s => s.trim().split(/\s+/).join(' ');

function expected(t, n) {
  const x = n + 5;
  switch (t.id) {
  case 'base':
    return String(x * 60);
  case 'logic':
    return x % 2 ? 'ímpar' : 'par';
  case 'loops':
    return Array.from({ length: 10 }, (_, i) => x * (i + 1)).join(' ');
  case 'arrays':
    return String(x + 4);
  case 'functions':
    return String(x * 2);
  case 'strings':
    return '5';
  case 'algorithms':
    return String([
      3,
      x - 1,
      8,
      x,
      12
    ].indexOf(x));
  case 'reasoning':
    return Array.from({ length: Math.min(x, 12) }, (_, i) => 2 * (i + 1)).join(' ');
  default:
    return String(x * (x + 1) / 2);
  }
}

async function runCode(t, n, src, out, btn) {
  if (!src.trim()) {
    out.textContent = '→ Ainda não há código. Comece por uma variável ou função.';
    return;
  }
  if (typeof loadPyodide === 'undefined') {
    out.textContent = '✗ Não consegui carregar o Python. Verifique sua conexão com a internet e recarregue a página.';
    return;
  }
  btn.disabled = true;
  out.textContent = '⏳ Carregando Python...';
  let buf = [];
  try {
    const py = await getPy();
    py.setStdout({ batched: m => buf.push(m) });
    py.setStderr({ batched: m => buf.push(m) });
    out.textContent = '⏳ Executando...';
    await py.runPythonAsync(src);
    const got = buf.join('\n'), exp = expected(t, n), ok = norm(got) === norm(exp);
    out.textContent = (got || '(sem saída: use print())') + '\n\n' + (ok ? '✓ Saída correta!' : '✗ Saída diferente do esperado.\nEsperado: ' + exp.split(' ').join(' '));
    if (ok) {
      const k = `${ t.id }-code-${ n }`;
      if (!state.solved.includes(k))
        state.solved.push(k);
      save();
    }
  } catch (e) {
    out.textContent = buf.join('\n') + (buf.length ? '\n' : '') + '✗ Erro:\n' + String(e.message || e).trim().split('\n').slice(-4).join('\n');
  }
  btn.disabled = false;
}

function answer(t, n, a, q) {
  let cs = document.querySelectorAll('.choice');
  if (cs[0].disabled)
    return;
  state.attempts++;
  let right = a === q.correct;
  if (right) {
    state.hits++;
    let key = `${ t.id }-obj-${ n }`;
    if (!state.solved.includes(key))
      state.solved.push(key);
  }
  cs.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct)
      b.classList.add('correct');
    if (i === a && !right)
      b.classList.add('wrong');
  });
  $('#answer-feedback').textContent = (right ? '✓ Correto. ' : '→ Revise este ponto. ') + q.explain;
  save();
}

function route() {
  let t = track();
  home.hidden = !!t;
  workspace.hidden = !t;
  document.querySelector('footer').hidden = !!t;
  if (t) {
    workspace.innerHTML = template(t);
    list(t);
    $('#back-home').onclick = () => location.hash = 'trilhas';
    window.scrollTo(0, 0);
  } else {
    workspace.innerHTML = '';
    renderTracks();
  }
}

$('#random-challenge').onclick = () => location.hash = `trilha/${ tracks[Math.floor(Math.random() * tracks.length)].id }`;
$('#start-exam').onclick = () => location.hash = 'trilha/reasoning';
window.addEventListener('hashchange', route);
save();
route();
