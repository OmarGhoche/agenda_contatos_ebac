document.getElementById("ano").innerHTML = new Date().getFullYear();

const form = document.getElementById('form-agenda');

const nomes = [];
const telefones = [];
let linhas = '';

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputNome = document.getElementById('nome');
  const inputTelefone = document.getElementById('telefone');

  if (nomes.includes(inputNome.value)) {
    alert(`O contato ${inputNome.value} já foi inserido`);
  } else if (!validarTelefone(inputTelefone.value)) {
    alert('Formato de TELEFONE inválido!');
  } else {
    nomes.push(inputNome.value);
    telefones.push(inputTelefone.value);

    let linha = '<tr>';
    linha += `<td>${inputNome.value}</td>`;
    linha += `<td>${inputTelefone.value}</td>`;
    linha += `<td>${dddEstado(inputTelefone.value)}</td>`;
    linha += '</tr>';

    linhas += linha;

    atualizaTabela();

    document.querySelector('h3').innerHTML = `Número de contatos: ${telefones.length}`;

  }

  inputNome.value = '';
  inputTelefone.value = '';

});

function atualizaTabela() {
  const corpoTabela = document.querySelector('tbody');
  corpoTabela.innerHTML = linhas;
}

function dddEstado(telefone) {
  const dddsPorEstado = {
    "Acre": ["68"], "Alagoas": ["82"], "Amazonas": ["92", "97"], "Amapá": ["96"], "Bahia": ["71", "73", "74", "75", "77"],
    "Ceará": ["85", "88"], "Distrito Federal": ["61"], "Espírito Santo": ["27", "28"], "Goías": ["62", "64"],
    "Maranhão": ["98", "99"], "Minas Gerais": ["31", "32", "33", "34", "35", "37", "38"], "Mato Grosso do Sul": ["67"],
    "Mato Grosso": ["65", "66"], "Pará": ["91", "93", "94"], "Paraíba": ["83"], "Pernambuco": ["81", "87"], "PI": ["86", "89"],
    "Paraná": ["41", "42", "43", "44", "45", "46"], "Rio de Janeiro": ["21", "22", "24"], "Rio Grande do Norte": ["84"],
    "Rondônia": ["69"], "Roraíma": ["95"], "Rio Grande do Sul": ["51", "53", "54", "55"], "Santa Catarina": ["47", "48", "49"],
    "Sergipe": ["79"], "São Paulo": ["11", "12", "13", "14", "15", "16", "17", "18", "19"], "Tocantins": ["63"]
  };

  formatedPhone = telefone.replace(/\D/g, '');

  const DDD = formatedPhone.replace(/^0/, "").substring(0, 2);

  for (const estado in dddsPorEstado) {
    if (dddsPorEstado[estado].includes(DDD)) {
      return estado;
    }
  }

  return "";
}

function validarTelefone(telefone) {

  formatedPhone = telefone.replace(/\D/g, '');

  const regexTelefone = /^(0?\d{2})\s?(?:9\d{8}|\d{8})$/;

  return regexTelefone.test(formatedPhone);
}
