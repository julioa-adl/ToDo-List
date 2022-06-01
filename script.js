// Requisito 5 - botão Adicionar:
function btnAdicionar() {
  const textInput = document.getElementById('texto-tarefa');
  const listaTarefas = document.getElementById('lista-tarefas');
  const criarTarefa = document.createElement('li');
  listaTarefas.appendChild(criarTarefa);
  criarTarefa.innerText = textInput.value;
  criarTarefa.className = 'item';
  textInput.value = '';
  contarItens();
  contarConc()
}
document.getElementById('criar-tarefa').addEventListener('click', btnAdicionar);

// Requisito 7 e 8 - pintas itens com click.
function clickGray(event) {
  const itens = contarItens();
  for (let i = 0; i < itens.length; i += 1) {
    itens[i].classList.remove('cinza');
  }
  const itemClick = event.target;
  itemClick.classList.add('cinza');
}

// Requisito 9 - riscar concluídos.
function itemCompleted(event) {
  const itemDbClick = event.target;
  itemDbClick.classList.toggle('completed');
  contarItens();
  contarConc()
}

// Requisito 10 - apagar tudo
function apagarTudo() {
  const lista = document.querySelector('#lista-tarefas');
  lista.innerHTML = '';
}
document.getElementById('apaga-tudo').addEventListener('click', apagarTudo);

// Requisito 11 - apagar concluídos
function apagarConcluidos() {
  const concluidos = document.querySelectorAll('.completed');
  for (let i = 0; i < concluidos.length; i += 1) {
    concluidos[i].parentNode.removeChild(concluidos[i]);
  }
}
document.getElementById('remover-finalizados').addEventListener('click', apagarConcluidos);

// Requisito 12 - salvar conteúdo
function salvar() {
  const listaSalva = {};
  const lista = document.querySelectorAll('.item');
  for (let i = 0; i < lista.length; i += 1) {
    listaSalva[i] = lista[i].innerText;
  }
  sessionStorage.setItem('listaTarefas', JSON.stringify(listaSalva));

  const classList = {};
  for (let i = 0; i < lista.length; i += 1) {
    classList[i] = lista[i].classList.value;
  }
  sessionStorage.setItem('listaClasses', JSON.stringify(classList));
}
document.querySelector('#salvar-tarefas').addEventListener('click', salvar);
function carregarStorage() {
  const lista = document.querySelector('#lista-tarefas');
  const classStorage = JSON.parse(sessionStorage.getItem('listaClasses'));
  const listaStorage = JSON.parse(sessionStorage.getItem('listaTarefas'));
  for (let i in listaStorage) {
    const item = document.createElement('li');
    lista.appendChild(item);
    item.innerText = listaStorage[i];
    item.className = (classStorage[i]);
  }
  contarItens();
  contarConc()
}
window.onload = carregarStorage;

// Requisito 13 - Mover cima e baixo
// Mover pra cima
function moverCima() {
  const itens = document.querySelectorAll('.item');
  let index;
  for (let i = 0; i < itens.length; i += 1) {
    if (itens[i].classList.contains('cinza')) {
      index = i;
      break;
    }
  }
  let guardarTexto;
  let guardarClasses;
  if (index > 0) {
    guardarTexto = itens[index - 1].innerText;
    guardarClasses = itens[index - 1].classList.value;
    itens[index - 1].className = itens[index].classList.value;
    itens[index - 1].innerText = itens[index].innerText;
    itens[index].className = guardarClasses;
    itens[index].innerText = guardarTexto;
  }
}
document.querySelector('#mover-cima').addEventListener('click', moverCima);

// Mover pra baixo
function moverBaixo() {
  const itens = document.querySelectorAll('.item');
  let index;
  for (let i = 0; i < itens.length; i += 1) {
    if (itens[i].classList.contains('cinza')) {
      index = i;
      break;
    }
  }
  let guardarTexto;
  let guardarClasses;
  if (index < itens.length - 1) {
    guardarTexto = itens[index + 1].innerText;
    guardarClasses = itens[index + 1].classList.value;
    itens[index + 1].className = itens[index].classList.value;
    itens[index + 1].innerText = itens[index].innerText;
    itens[index].className = guardarClasses;
    itens[index].innerText = guardarTexto;
  }
}
document.querySelector('#mover-baixo').addEventListener('click', moverBaixo);

// Requisito 14 - excluir selecionado
function excluirSelected() {
  const itemSelected = document.querySelector('.cinza');
  itemSelected.parentNode.removeChild(itemSelected);
}
document.querySelector('#remover-selecionado').addEventListener('click', excluirSelected);

// Absolutos:
function contarItens() {
  const itens = document.querySelectorAll('.item');
  for (let i = 0; i < itens.length; i += 1) {
    itens[i].addEventListener('click', clickGray);
    itens[i].addEventListener('dblclick', itemCompleted);
  }
  return itens;
}

// Contar Concluídos
const contarConcluidos = document.createElement('spam');
  document.querySelector('#funcionamento').appendChild(contarConcluidos);
  contarConcluidos.className = 'concluidos'
function contarConc() {
  const concluidos = document.querySelectorAll('.completed');
  contarConcluidos.innerText = `Concluídos ${concluidos.length}`
}
