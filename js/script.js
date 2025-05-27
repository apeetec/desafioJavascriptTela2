const degrees = [
  { "id": 1, "name": "Ensino Fundamental" },
  { "id": 2, "name": "1° ano do ensino médio" },
  { "id": 3, "name": "2° ano ensino médio" },
  { "id": 4, "name": "3° ano do ensino médio" },
  { "id": 5, "name": "Cursinho" },
  { "id": 8, "name": "4º ano do ensino fundamental" },
  { "id": 9, "name": "5º ano do ensino fundamental" },
  { "id": 10, "name": "6º ano do ensino fundamental" },
  { "id": 11, "name": "7º ano do ensino fundamental" },
  { "id": 12, "name": "8º ano do ensino fundamental" },
  { "id": 13, "name": "9º ano do ensino fundamental" },
  { "id": 6, "name": "Estudo em casa" },
  { "id": 7, "name": "Outros" }
];

const classes = [
    {"name":"A"},
    {"name":"B"},
    {"name":"C"},
    {"name":"D"},
    {"name":"E"},
    {"name":"F"}
]

const teachers = [
  { "id": 1, "name": "Professor 1" },
  { "id": 2, "name": "Professor 2" },
  { "id": 3, "name": "Professor 3" },
  { "id": 4, "name": "Professor 4" },
  { "id": 5, "name": "Professor 5" },
  { "id": 6, "name": "Professor 6" }
];

const matters = [
  { "id": 1, "name": "Matemática" },
  { "id": 2, "name": "Português" },
  { "id": 3, "name": "História" },
  { "id": 4, "name": "Geografia" }
];

let relationships = [
  {
    "id": 1,
    "teacherId": 1,
    "matterId": 1,
    "degrees": [
      {
        "degreeId": 1,
        "classes": [{ "classPosition": 1 }, { "classPosition": 2 }, { "classPosition": 3 }]
      },
      {
        "degreeId": 2,
        "classes": [{ "classPosition": 1 }]
      }
    ]
  },
  {
    "id": 2,
    "teacherId": 2,
    "matterId": 2,
    "degrees": [
      {
        "degreeId": 8,
        "classes": [{ "classPosition": 1 }, { "classPosition": 2 }]
      },
      {
        "degreeId": 9,
        "classes": [{ "classPosition": 1 }]
      }
    ]
  },
  {
    "id": 3,
    "teacherId": 3,
    "matterId": 3,
    "degrees": [
      { "degreeId": 12, "classes": [{ "classId": 1 }] },
      { "degreeId": 13, "classes": [{ "classId": 1 }] },
      { "degreeId": 5,  "classes": [{ "classId": 1 }] },
      { "degreeId": 6,  "classes": [{ "classId": 1 }] }
    ]
  },
  {
    "id": 4,
    "teacherId": 4,
    "matterId": 4,
    "degrees": [
      { "degreeId": 1, "classes": [{ "classId": 1 }] },
      { "degreeId": 2, "classes": [{ "classId": 1 }] },
      { "degreeId": 3, "classes": [{ "classId": 1 }] },
      { "degreeId": 4, "classes": [{ "classId": 1 }] },
      { "degreeId": 5, "classes": [{ "classId": 1 }] }
    ]
  }
];

const students = [
  { "id": 1, "ra": 12346, "name": "Nome do aluno 1", "degreeId": 1, "classId": 1 },
  { "id": 2, "ra": 456798, "name": "Nome do aluno 2", "degreeId": 2, "classId": 1 },
  { "id": 3, "ra": 752156, "name": "Nome do aluno 3", "degreeId": 3, "classId": 2 },
  { "id": 4, "ra": 852348, "name": "Nome do aluno 4", "degreeId": 4, "classId": 2 },
  { "id": 5, "ra": 454643, "name": "Nome do aluno 5", "degreeId": 6, "classId": 2 }
];

const filtroGraus = document.getElementById("degreeFilter");
const filtroClasses = document.getElementById("classFilter");
const searchInput = document.getElementById("pesquisa");
const corpoTabela = document.querySelector("#tabelaDeAlunos tbody");
const relationshipsTable = document.querySelector("#relationshipsTable tbody");
const teacherSelect = document.getElementById("teacherSelect");
const matterSelect = document.getElementById("matterSelect");
const degreeSelect = document.getElementById("degreeSelect");
const classSelect = document.getElementById("classSelect");
const addRelationshipForm = document.getElementById("addRelationshipForm");

// Função para exibir os options de Grau
// function optionsDeGrau(){
//     degrees.forEach(grau => {
//         // console.log(grau.name);
//         const options = document.createElement("option");
//         options.value = grau.id;
//         options.innerText = grau.name;
//         filtroGraus.append(options);
//     });
// }
// optionsDeGrau();
// Função para exibir as Classes
// function optionsClasse(){
//     var cont = 0;
//     classes.forEach(classe => {
//         cont++;
//     //    console.log(classe.name); 
//        const options = document.createElement("option");
//        options.value = cont;
//        options.innerText = classe.name;
//        filtroClasses.append(options);
//     });
// }
// optionsClasse();


// Buscar grau
function buscarGrau(id) {
    for (let i = 0; i < degrees.length; i++) {
        if (degrees[i].id === id) {
            return degrees[i].name;
        }
    }
    return 'Não encontrado';
}
// Buscar classe
function buscarNomeClasse(id) {
    if (classes[id - 1]) {
        return classes[id - 1].name;
    }
    return 'Classe inválida';
}
// Buscar professor
function buscarProfessor(id) {
    for (let i = 0; i < teachers.length; i++) {
        if (teachers[i].id === id) {
            return teachers[i].name;
        }
    }
    return 'Desconhecido';
}
// Buscar matéria
function buscarMateria(id) {
    for (let i = 0; i < matters.length; i++) {
        if (matters[i].id === id) {
            return matters[i].name;
        }
    }
    return 'Desconhecida';
}
// Mostra aluno
function mostrarAlunos(index) {
    const alunosDiv = document.getElementById("alunos-" + index);
    const degreesRelacionados = relationships[index].degrees.map(function(d) {
        return d.degreeId;
    });

    const alunosFiltrados = students.filter(function(s) {
        return degreesRelacionados.includes(s.degreeId);
    });

    if (alunosFiltrados.length > 0) {
        alunosDiv.innerHTML = alunosFiltrados.map(function(a) {
            return '👤 ' + a.name + ' (' + buscarGrau(a.degreeId) + ')';
        }).join('<br>');
    } else {
        alunosDiv.innerHTML = '<i>Nenhum aluno relacionado.</i>';
    }
}

// Tabela
function tabelaProfessores() {
    const df = degreeFilter.value;
    const cf = classFilter.value;
    corpoTabela.innerHTML = "";

    relationships
    .filter(rel => {
        return rel.degrees.some(d => {
            const grauOk = !df || d.degreeId == df;
            const classeOk = !cf || d.classes.some(c => (c.classId || c.classPosition) == cf);
            return grauOk && classeOk;
        });
    })
    .forEach((rel, index) => {
        const tr = document.createElement("tr");
        let grausHTML = '';
        let classesHTML = '';
        let alunosBtnHTML = '<button class="btn" onclick="mostrarAlunos(' + index + ')">Ver Alunos</button>';
        let alunosDiv = '<div id="alunos-' + index + '" class="alunos-lista" style="margin-top:5px; font-size:small;"></div>';

        for (let i = 0; i < rel.degrees.length; i++) {
            const grau = rel.degrees[i];
            grausHTML += '<div>' + buscarGrau(grau.degreeId) + '</div>';
            const nomesDasClasses = grau.classes.map(function(c) {
                return buscarNomeClasse(c.classId || c.classPosition);
            }).join(', ');
            classesHTML += '<div>' + nomesDasClasses + '</div>';
        }

        tr.innerHTML =
            '<td>' + buscarProfessor(rel.teacherId) + '</td>' +
            '<td>' + buscarMateria(rel.matterId) + '</td>' +
            '<td>' + grausHTML + '</td>' +
            '<td>' + classesHTML + '</td>' +
            '<td>' + alunosBtnHTML + alunosDiv + '</td>';

        corpoTabela.appendChild(tr);
    });
}
tabelaProfessores();
// Popular os filtros
function populateFilters() {
    // Populando os filtros de grau
    degrees.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = d.name;
    degreeFilter.appendChild(opt);
    degreeSelect.appendChild(opt.cloneNode(true));
    });
    // Populando os filtros de classes
    classes.forEach((c, i) => {
    const opt = document.createElement("option");
    opt.value = i + 1;
    opt.textContent = c.name;
    classFilter.appendChild(opt.cloneNode(true));
    classSelect.appendChild(opt);
    });
    // Populando o filtro de professores
    teachers.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.name;
    teacherSelect.appendChild(opt);
    });
    // Populando o filtro de matérias
    matters.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m.id;
      opt.textContent = m.name;
      matterSelect.appendChild(opt);
    });
}

// Ação de relacionar através do formulário
addRelationshipForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const teacherId = parseInt(teacherSelect.value);
    const matterId = parseInt(matterSelect.value);
    const degreeId = parseInt(degreeSelect.value);
    const selectedClasses = Array.from(classSelect.selectedOptions).map(opt => ({
      classId: parseInt(opt.value)
    }));

    const existing = relationships.find(r => r.teacherId === teacherId && r.matterId === matterId);
    if (existing) {
      existing.degrees.push({ degreeId, classes: selectedClasses });
    } else {
      relationships.push({
        id: relationships.length + 1,
        teacherId,
        matterId,
        degrees: [{ degreeId, classes: selectedClasses }]
      });
    }

    tabelaProfessores();
  });

populateFilters();
degreeFilter.addEventListener("change", tabelaProfessores);
classFilter.addEventListener("change", tabelaProfessores);
