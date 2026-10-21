const $ = s => document.querySelector(s), home = $('#inicio'), workspace = $('#workspace');
let state = JSON.parse(localStorage.getItem('looplab-state-v2') || '{"solved":[],"attempts":0,"hits":0,"code":{}}');
state.code ??= {};
const total = t => t.objectives.length + t.codes.length;
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const track = () => tracks.find(t => location.hash === `#trilha/${ t.id }`);

function save() {
  localStorage.setItem('looplab-state-v2', JSON.stringify(state));
  $('#solved-count').textContent = state.solved.length;
  $('#total-count').textContent = tracks.reduce((sum, t) => sum + total(t), 0);
  $('#accuracy').textContent = state.attempts ? `${ Math.round(state.hits / state.attempts * 100) }%` : '—';
}

function renderTracks() {
  $('#track-grid').innerHTML = tracks.map(t => `
    <article class="track" style="--track:${ t.color }" data-track="${ t.id }">
      <div class="track-icon">${ t.icon }</div>
      <h3>${ t.name }</h3>
      <p>${ t.desc }</p>
      <div class="track-foot">
        <span>${ state.solved.filter(x => x.startsWith(t.id)).length }/${ total(t) }</span>
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
          <strong>${ done }/${ total(t) }</strong>
        </div>
      </header>
      <div class="course-body">
        <aside class="course-nav">
          <label>CONTEÚDOS DA TRILHA</label>
          <ul class="topic-list">${ topicItems }</ul>
          <div class="mini-stat">
            <b>${ done }/${ total(t) }</b>
            <span>exercícios concluídos</span>
          </div>
        </aside>
        <section class="course-content" id="course-content"></section>
      </div>
    </section>
  `;
}

function cards(t, type) {
  const isObjective = type === 'objective';
  const items = isObjective ? t.objectives : t.codes;
  return items.map((q, n) => `
    <button class="exercise-card" data-type="${ type }" data-index="${ n }">
      <span class="card-n">${ String(n + 1).padStart(2, '0') } / ${ items.length }</span>
      <h3>${ q.title }</h3>
      <p>${ isObjective ? 'Teste sua leitura de código e conceitos.' : 'Escreva o código e rode os testes automáticos.' }</p>
      <span class="card-type">${ isObjective ? 'MÚLTIPLA ESCOLHA' : 'LABORATÓRIO PYTHON' } →</span>
    </button>
  `).join('');
}

function list(t, type = 'objective') {
  let el = $('#course-content');
  const isObjective = type === 'objective';
  el.innerHTML = `
    <div class="content-kicker">// ${ isObjective ? 'CONHECIMENTO' : 'PRÁTICA GUIADA' }</div>
    <h2>${ isObjective ? 'Questões objetivas' : 'Desafios para programar' }</h2>
    <p>${ isObjective ? `${ t.objectives.length } perguntas com explicação para consolidar conceitos antes da prática.` : `${ t.codes.length } problemas com testes automáticos. Seu código fica salvo neste navegador.` }</p>
    <div class="switcher">
      <button class="${ isObjective ? 'active' : '' }" data-list="objective">${ t.objectives.length } OBJETIVAS</button>
      <button class="${ isObjective ? '' : 'active' }" data-list="code">${ t.codes.length } PARA CODAR</button>
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
    const q = t.objectives[n];
    const choices = q.answers.map((a, i) => `<button class="choice" data-answer="${ i }">${ String.fromCharCode(65 + i) }. ${ a }</button>`).join('');
    el.innerHTML = `
      <div class="challenge-view">
        <div class="challenge-toolbar">
          <button id="back-list">← VOLTAR ÀS QUESTÕES</button>
          <span class="content-kicker">OBJETIVA ${ String(n + 1).padStart(2, '0') } / ${ t.objectives.length }</span>
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
  let q = t.codes[n], key = `${ t.id }-code-${ n }`, draft = state.code[key] ?? q.starter;
  const examples = q.tests.slice(0, 2).map(test => `<li><code>${ esc(Array.isArray(test) ? test[0].replace(/\n/g, '; ') + '  →  ' + JSON.stringify(test[1]) : 'entrada: ' + (test.in.join(', ') || '—') + '  →  saída: ' + (test.out.replace(/\n/g, ' | ') || '(nada)')) }</code></li>`).join('');
  el.innerHTML = `
    <div class="challenge-view">
      <div class="challenge-toolbar">
        <button id="back-list">← VOLTAR AOS DESAFIOS</button>
        <span class="content-kicker">LABORATÓRIO ${ String(n + 1).padStart(2, '0') } / ${ t.codes.length }</span>
      </div>
      <article class="question-shell code-layout">
        <section class="challenge-copy">
          <div class="content-kicker">// DESAFIO PYTHON</div>
          <h2>${ q.title }</h2>
          <p>${ q.brief }</p>
          <h4>EXEMPLOS</h4>
          <ul>${ examples }</ul>
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

const NO_PROMPT = `import builtins
if not hasattr(builtins, '_li'):
    builtins._li = builtins.input
    builtins.input = lambda prompt='': builtins._li()`;

const EVAL_TEST = `import ast, json
_t = ast.parse(__expr)
_last = ast.Expression(_t.body.pop().value)
exec(compile(_t, '<teste>', 'exec'), globals())
_got = eval(compile(_last, '<teste>', 'eval'), globals())
json.dumps([_got == json.loads(__exp), repr(_got)])`;

const lastLine = e => String(e.message || e).trim().split('\n').pop();

async function runTest(py, src, test) {
  const ns = py.globals.get('dict')();
  const buf = [];
  py.setStdout({ batched: m => buf.push(m) });
  py.setStderr({ batched: m => buf.push(m) });
  try {
    if (Array.isArray(test)) {
      await py.runPythonAsync(src, { globals: ns });
      ns.set('__expr', test[0]);
      ns.set('__exp', JSON.stringify(test[1]));
      const [ok, got] = JSON.parse(await py.runPythonAsync(EVAL_TEST, { globals: ns }));
      return { ok, msg: `${ test[0].replace(/\n/g, '; ') }\n   obtido: ${ got }\n   esperado: ${ JSON.stringify(test[1]) }` };
    }
    const lines = [...test.in];
    py.setStdin({ stdin: () => lines.length ? lines.shift() : undefined });
    await py.runPythonAsync(NO_PROMPT, { globals: ns });
    await py.runPythonAsync(src, { globals: ns });
    const got = buf.join('\n');
    return { ok: norm(got) === norm(test.out), msg: `entrada: ${ test.in.join(', ') || '—' }\n   obtido: ${ got || '(nada)' }\n   esperado: ${ test.out || '(nada)' }` };
  } catch (e) {
    return { ok: false, msg: `${ Array.isArray(test) ? test[0].replace(/\n/g, '; ') : 'entrada: ' + test.in.join(', ') }\n   erro: ${ lastLine(e) }` };
  } finally {
    ns.destroy();
  }
}

async function runCode(t, n, src, out, btn) {
  if (!src.trim()) {
    out.textContent = '→ Ainda não há código. Comece escrevendo a solução.';
    return;
  }
  if (typeof loadPyodide === 'undefined') {
    out.textContent = '✗ Não consegui carregar o Python. Verifique sua conexão com a internet e recarregue a página.';
    return;
  }
  btn.disabled = true;
  out.textContent = '⏳ Carregando Python...';
  try {
    const py = await getPy();
    out.textContent = '⏳ Executando os testes...';
    const results = [];
    for (const test of t.codes[n].tests)
      results.push(await runTest(py, src, test));
    const passed = results.filter(r => r.ok).length;
    const failures = results.filter(r => !r.ok).slice(0, 3).map(r => '✗ ' + r.msg).join('\n\n');
    out.textContent = `${ passed }/${ results.length } testes passaram` + (failures ? '\n\n' + failures : '\n\n✓ Tudo certo! Exercício concluído.');
    if (passed === results.length) {
      const k = `${ t.id }-code-${ n }`;
      if (!state.solved.includes(k))
        state.solved.push(k);
      save();
    }
  } catch (e) {
    out.textContent = '✗ Erro ao executar: ' + lastLine(e);
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
$('#start-exam').onclick = () => location.hash = 'trilha/oop';
window.addEventListener('hashchange', route);
save();
route();
