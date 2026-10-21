const o = (title, text, answers, correct, explain) => ({ title, text, answers, correct, explain });
const p = (title, brief, starter, tests) => ({ title, brief, starter, tests });
const io = (input, out) => ({ in: input, out });
const fn = (name, args) => `def ${ name }(${ args }):\n    pass\n`;

const tracks = [
  {
    id: 'base', icon: '01', color: '#36e3ff', name: 'Fundamentos',
    desc: 'Variáveis, tipos, entrada e saída.',
    topics: ['Variáveis', 'Tipos de dados', 'Operadores', 'print e input', 'Conversão de tipos'],
    objectives: [
      o('Divisão inteira e resto', '<code>x = 7\ny = 2\nprint(x // y, x % y)</code>O que o código imprime?', ['3 1', '3.5 1', '3 2', '4 1'], 0, '// é a divisão inteira (7 // 2 = 3) e % é o resto (7 % 2 = 1).'),
      o('Tipo do input', 'Qual é o tipo do valor devolvido por <code>input()</code>, mesmo que a pessoa digite 25?', ['int', 'str', 'float', 'depende do que for digitado'], 1, 'input() sempre devolve texto. Use int() ou float() para converter.'),
      o('Conversão de tipos', '<code>print(int("4") + float("1.5"))</code>O que o código imprime?', ['5.5', '41.5', '5', 'erro'], 0, 'int("4") vira 4, float("1.5") vira 1.5, e a soma é 5.5.')
    ],
    codes: [
      p('Saudação', 'Leia um nome com <code>input()</code> e exiba <code>Olá, NOME!</code>. Use input() sem mensagem dentro dos parênteses.', '# leia o nome e exiba a saudação\n', [io(['Ana'], 'Olá, Ana!'), io(['Isaac'], 'Olá, Isaac!')]),
      p('Soma de dois números', 'Leia dois números inteiros (um por linha) e exiba a soma deles.', '# leia dois inteiros e exiba a soma\n', [io(['3', '4'], '7'), io(['10', '-2'], '8'), io(['0', '0'], '0')])
    ]
  },
  {
    id: 'logic', icon: '02', color: '#9d7bff', name: 'Decisão & lógica',
    desc: 'Booleanos, comparações e if/elif/else.',
    topics: ['Booleanos', 'Operadores lógicos', 'if / elif / else', 'Comparações', 'Valores falsos'],
    objectives: [
      o('Precedência lógica', '<code>print(True and not False or False)</code>O que o código imprime?', ['True', 'False', 'None', 'erro'], 0, 'not tem precedência sobre and, que tem sobre or: True and True or False = True.'),
      o('elif', '<code>x = 15\nif x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")</code>O que é impresso?', ['A', 'B', 'A e B', 'C'], 0, 'Só o primeiro bloco verdadeiro é executado; o elif é ignorado.'),
      o('Valores falsos', '<code>print(bool(""), bool("0"))</code>O que o código imprime?', ['False True', 'False False', 'True True', 'True False'], 0, 'Texto vazio é falso; qualquer texto não vazio, até "0", é verdadeiro.')
    ],
    codes: [
      p('Par ou ímpar', 'Leia um inteiro e exiba <code>par</code> ou <code>ímpar</code>.', '# leia n e decida\n', [io(['4'], 'par'), io(['7'], 'ímpar'), io(['0'], 'par')]),
      p('Situação do aluno', 'Leia uma nota inteira. Exiba <code>Aprovado</code> se for 70 ou mais, <code>Recuperação</code> se for de 50 a 69, e <code>Reprovado</code> abaixo de 50.', '# leia a nota e classifique\n', [io(['85'], 'Aprovado'), io(['70'], 'Aprovado'), io(['55'], 'Recuperação'), io(['49'], 'Reprovado')])
    ]
  },
  {
    id: 'loops', icon: '03', color: '#ffca75', name: 'Repetição',
    desc: 'for, while, contadores e acumuladores.',
    topics: ['for e range', 'while', 'Contadores', 'Acumuladores', 'break e continue'],
    objectives: [
      o('range', '<code>for i in range(3):\n    print(i)</code>O que é impresso?', ['0 1 2', '1 2 3', '0 1 2 3', '1 2'], 0, 'range(3) gera 0, 1 e 2: começa em 0 e não inclui o 3.'),
      o('while', '<code>n = 0\nwhile n < 3:\n    n += 2\nprint(n)</code>O que é impresso?', ['2', '3', '4', 'laço infinito'], 2, 'n vai de 0 a 2 (2 < 3, continua) e depois a 4, quando o laço para.'),
      o('continue', '<code>for i in range(5):\n    if i == 2:\n        continue\n    print(i)</code>O que é impresso?', ['0 1 3 4', '0 1', '0 1 2 3 4', '3 4'], 0, 'continue pula só a repetição atual: o 2 não é impresso.')
    ],
    codes: [
      p('Soma de 1 até n', 'Leia n e exiba a soma de todos os inteiros de 1 até n.', '# use um acumulador\n', [io(['5'], '15'), io(['1'], '1'), io(['100'], '5050')]),
      p('Pares até n', 'Leia n e exiba, um por linha, os números pares de 1 até n.', '# percorra de 1 até n\n', [io(['10'], '2\n4\n6\n8\n10'), io(['7'], '2\n4\n6'), io(['1'], '')])
    ]
  },
  {
    id: 'arrays', icon: '04', color: '#86efac', name: 'Vetores & matrizes',
    desc: 'Listas, percurso, dicionários e agregações.',
    topics: ['Listas', 'Índices e fatias', 'Percorrer listas', 'Matrizes', 'Dicionários'],
    objectives: [
      o('Índice negativo e fatia', '<code>lista = [10, 20, 30, 40]\nprint(lista[-1], lista[1:3])</code>O que é impresso?', ['40 [20, 30]', '40 [20, 30, 40]', '10 [20, 30]', '30 [10, 20]'], 0, '-1 é o último elemento e [1:3] vai do índice 1 até o 2.'),
      o('append e insert', '<code>l = [1, 2, 3]\nl.append(4)\nl.insert(0, 0)\nprint(len(l))</code>O que é impresso?', ['4', '5', '6', 'erro'], 1, 'A lista começa com 3 itens e ganha mais 2: um no fim e um no início.'),
      o('Matriz', '<code>m = [[1, 2], [3, 4]]\nprint(m[1][0])</code>O que é impresso?', ['1', '2', '3', '4'], 2, 'm[1] é [3, 4] e o [0] pega o primeiro elemento dessa linha.')
    ],
    codes: [
      p('Inverter lista', 'Crie <code>inverter_lista(lista)</code> que devolva uma nova lista com os itens na ordem contrária. Sem usar reverse().', fn('inverter_lista', 'lista'), [['inverter_lista([1, 2, 3])', [3, 2, 1]], ['inverter_lista([])', []], ['inverter_lista(["a", "b"])', ['b', 'a']]]),
      p('Maior valor', 'Crie <code>maior(lista)</code> que devolva o maior número da lista, sem usar max().', fn('maior', 'lista'), [['maior([3, 9, 2])', 9], ['maior([-5, -1, -8])', -1], ['maior([7])', 7]]),
      p('Total por item', 'Crie <code>total_por_item(itens, valores)</code>. Os dois vetores têm o mesmo tamanho; devolva um dicionário que soma os valores de cada item (itens repetidos somam).', fn('total_por_item', 'itens, valores'), [['total_por_item(["pizza", "burger", "pizza"], [2, 3, 4])', { pizza: 6, burger: 3 }], ['total_por_item(["a"], [5])', { a: 5 }], ['total_por_item([], [])', {}]])
    ]
  },
  {
    id: 'functions', icon: '05', color: '#f58bbb', name: 'Funções',
    desc: 'Parâmetros, retorno, escopo e recursão.',
    topics: ['def e chamada', 'Parâmetros', 'return', 'Escopo', 'Recursão'],
    objectives: [
      o('Chamadas aninhadas', '<code>def f(x):\n    return x * 2\nprint(f(f(3)))</code>O que é impresso?', ['6', '9', '12', '18'], 2, 'f(3) é 6 e f(6) é 12.'),
      o('Sem return', '<code>def f(x):\n    x = x + 1\nr = f(5)\nprint(r)</code>O que é impresso?', ['6', '5', 'None', 'erro'], 2, 'Sem return, a função devolve None.'),
      o('Escopo', '<code>x = 10\ndef f():\n    x = 3\nf()\nprint(x)</code>O que é impresso?', ['3', '10', 'None', 'erro'], 1, 'O x dentro da função é local e não altera o x global.')
    ],
    codes: [
      p('Número primo', 'Crie <code>eh_primo(n)</code> que devolva True se n for primo e False caso contrário.', fn('eh_primo', 'n'), [['eh_primo(2)', true], ['eh_primo(1)', false], ['eh_primo(9)', false], ['eh_primo(13)', true], ['eh_primo(0)', false]]),
      p('Fatorial recursivo', 'Crie <code>fatorial(n)</code> usando recursão. O fatorial de 0 é 1.', fn('fatorial', 'n'), [['fatorial(0)', 1], ['fatorial(3)', 6], ['fatorial(5)', 120]])
    ]
  },
  {
    id: 'strings', icon: '06', color: '#66b7ff', name: 'Strings',
    desc: 'Índices, fatias, métodos e texto.',
    topics: ['Índices', 'Fatiamento', 'Métodos', 'split e join', 'Comparação de texto'],
    objectives: [
      o('Fatiamento', '<code>s = "python"\nprint(s[1:4], s[::-1])</code>O que é impresso?', ['yth nohtyp', 'pyth nohtyp', 'yt nohtyp', 'yth python'], 0, 's[1:4] pega os índices 1 a 3, e [::-1] inverte o texto.'),
      o('split', '<code>print("a,b,c".split(","))</code>O que é impresso?', ["['a', 'b', 'c']", "['a,b,c']", 'a b c', "('a', 'b', 'c')"], 0, 'split devolve uma lista com os pedaços.'),
      o('Repetição de texto', '<code>print("ab" * 2 + "c")</code>O que é impresso?', ['abc', 'ababc', 'abbc', 'erro'], 1, '"ab" * 2 é "abab", e depois concatena "c".')
    ],
    codes: [
      p('Inverter texto', 'Crie <code>inverter(texto)</code> que devolva o texto ao contrário.', fn('inverter', 'texto'), [['inverter("abc")', 'cba'], ['inverter("")', ''], ['inverter("Python")', 'nohtyP']]),
      p('Palíndromo', 'Crie <code>eh_palindromo(texto)</code>. Ignore maiúsculas, minúsculas e espaços.', fn('eh_palindromo', 'texto'), [['eh_palindromo("ovo")', true], ['eh_palindromo("Arara")', true], ['eh_palindromo("A base do teto desaba")', true], ['eh_palindromo("python")', false]])
    ]
  },
  {
    id: 'algorithms', icon: '07', color: '#fd9d65', name: 'Busca & ordenação',
    desc: 'Busca linear e binária, ordenação e custo.',
    topics: ['Busca linear', 'Busca binária', 'Ordenação', 'Complexidade', 'Trocas'],
    objectives: [
      o('Busca binária', 'Em uma lista ordenada com 1024 itens, quantas comparações a busca binária faz, no máximo, aproximadamente?', ['10', '32', '512', '1024'], 0, 'Cada passo divide a lista ao meio: log2(1024) = 10.'),
      o('sorted', '<code>print(sorted([3, 1, 2], reverse=True))</code>O que é impresso?', ['[1, 2, 3]', '[3, 2, 1]', '[3, 1, 2]', 'None'], 1, 'sorted devolve uma nova lista; reverse=True ordena do maior para o menor.'),
      o('Pré-requisito', 'A busca binária só funciona corretamente se a lista estiver...', ['ordenada', 'sem repetidos', 'com tamanho par', 'só com inteiros'], 0, 'Descartar metade da lista só faz sentido quando os itens estão em ordem.')
    ],
    codes: [
      p('Busca linear', 'Crie <code>busca_linear(lista, alvo)</code> que devolva o índice de <code>alvo</code>, ou -1 se não existir.', fn('busca_linear', 'lista, alvo'), [['busca_linear([4, 8, 15], 8)', 1], ['busca_linear([4, 8, 15], 9)', -1], ['busca_linear([], 1)', -1]]),
      p('Ordenar sem sorted', 'Crie <code>ordenar(lista)</code> que devolva a lista em ordem crescente, implementando você mesmo um algoritmo (por exemplo, bubble sort). Sem sorted() nem sort().', fn('ordenar', 'lista'), [['ordenar([3, 1, 2])', [1, 2, 3]], ['ordenar([])', []], ['ordenar([5, 5, 1, 9, 0])', [0, 1, 5, 5, 9]]])
    ]
  },
  {
    id: 'oop', icon: '08', color: '#d6e579', name: 'Classes & objetos',
    desc: 'Atributos, métodos, construtor e herança.',
    topics: ['Classes e objetos', 'Atributos', 'Métodos', '__init__ e self', 'Herança'],
    objectives: [
      o('Construtor', '<code>class A:\n    def __init__(self, n):\n        self.n = n\na = A(5)\nprint(a.n)</code>O que é impresso?', ['5', 'n', 'None', 'erro'], 0, '__init__ roda ao criar o objeto e guarda 5 no atributo n.'),
      o('self', 'O que o parâmetro <code>self</code> representa em um método?', ['A própria instância', 'A classe', 'Um módulo', 'Uma palavra opcional'], 0, 'self é o objeto que chamou o método.'),
      o('Herança', '<code>class A:\n    def f(self): return "A"\nclass B(A):\n    def f(self): return "B"\nprint(B().f())</code>O que é impresso?', ['A', 'B', 'AB', 'erro'], 1, 'B redefine f, e o método da subclasse tem prioridade.')
    ],
    codes: [
      p('Conta bancária', 'Crie a classe <code>Conta</code> com saldo inicial, o método <code>depositar(valor)</code> e o método <code>sacar(valor)</code>. Se o saldo for insuficiente, sacar não altera nada e devolve False; senão desconta e devolve True. O saldo fica no atributo <code>saldo</code>.', 'class Conta:\n    pass\n', [['c = Conta(100)\nc.depositar(50)\nc.saldo', 150], ['c = Conta(100)\nc.sacar(30)\nc.saldo', 70], ['c = Conta(20)\nc.sacar(50)', false], ['c = Conta(20)\nc.sacar(50)\nc.saldo', 20]]),
      p('Retângulo', 'Crie a classe <code>Retangulo</code> com largura e altura, e os métodos <code>area()</code> e <code>perimetro()</code>.', 'class Retangulo:\n    pass\n', [['Retangulo(3, 4).area()', 12], ['Retangulo(3, 4).perimetro()', 14], ['Retangulo(1, 1).area()', 1]])
    ]
  }
];
