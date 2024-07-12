/*
  --------------------------------------------------------------------------------------
  Função para obter o nome das cartas via API Externa
  --------------------------------------------------------------------------------------
*/
function buscarCartas() {
  const cardNameInput = document.getElementById('nome_carta');
  const cardListUl = document.getElementById('cardList');

  cardNameInput.addEventListener('input', function() {
      const inputValue = cardNameInput.value.trim();

      // Limpar a lista ul
      cardListUl.innerHTML = '';

      // Verificar se há um valor válido no campo de entrada
      if (inputValue.length > 0) {
          // Fazer requisição para a API do Magic: The Gathering
          fetch(`https://api.magicthegathering.io/v1/cards?name=${inputValue}`)
              .then(response => response.json())
              .then(data => {
                  const cards = data.cards;

                  // Preencher a lista ul com os nomes das cartas
                  cards.forEach(card => {
                      const li = document.createElement('li');
                      li.textContent = card.name;
                      cardListUl.appendChild(li);
                      li.addEventListener('click', function() {
                          // Ao clicar em uma carta da lista, preencher o campo de entrada com o nome da carta
                          cardNameInput.value = card.name;
                          // Limpar a lista ul após selecionar uma carta
                          cardListUl.style.display = "none";
                      });
                      
                  });
              })
              .catch(error => console.error('Erro ao buscar cartas:', error));
      }
  });
}

// Chamar a função ao carregar a página
window.onload = buscarCartas;





/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/buscacartas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.Cartas.forEach(item => insertList(item.nome_carta, item.nome_edicao, item.quantidade_copia, item.qualidade, item.idioma, item.extra, item.rotacao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (nome_carta, nome_edicao, quantidade_copia, qualidade, idioma, extra, rotacao) => {
  const formData = new FormData();
  formData.append('nome_carta', nome_carta);
  formData.append('nome_edicao', nome_edicao);
  formData.append('quantidade_copia', quantidade_copia);
  formData.append('qualidade', qualidade);
  formData.append('idioma', idioma);
  formData.append('extra', extra);
  formData.append('rotacao', rotacao);

  let url = 'http://127.0.0.1:5000/adicionacarta';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem, div)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item, nomeItem) => {
  console.log(nomeItem)
  delnomecarta = nomeItem.getElementsByTagName('td')[0].innerHTML
  delnomeedicao = nomeItem.getElementsByTagName('td')[1].innerHTML
  delqualidade = nomeItem.getElementsByTagName('td')[3].innerHTML 
  delidioma = nomeItem.getElementsByTagName('td')[4].innerHTML
  delextra = nomeItem.getElementsByTagName('td')[5].innerHTML
  

  let url = 'http://127.0.0.1:5000/deletacarta?nome_carta=' + delnomecarta + '&nome_edicao=' + delnomeedicao + '&qualidade=' + delqualidade + '&idioma=' + delidioma + '&extra=' + delextra;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome da carta, quantidade, idioma, edição, qualidade, extra e rotação
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputCarta = document.getElementById("nome_carta").value;
  let inputQuantidade = document.getElementById("quantidade_copia").value;
  let inputIdioma = document.getElementById("idioma").value;
  let inputEdicao = document.getElementById("nome_edicao").value;
  let inputQualidade = document.getElementById("qualidade").value;
  let inputExtra = document.getElementById("extra").value;
  let inputRotacao = document.getElementById("rotacao").value;

  if (inputCarta === '') {
    alert("Escreva o nome de uma carta!");
  } else if (inputEdicao === '') {
    alert("Escolha uma Edição!");
  } else if (inputQuantidade === '') {
    alert("Quantidade precisa ser fornecida!");
  } else if (isNaN(inputQuantidade)) {
    alert("Quantidade precisa ser numeral!");
  } else if (inputQualidade === '') {
    alert("Escolha uma Qualidade!");
  } else if (inputIdioma === '') {
    alert("Escolha um idioma!");
  } else if (inputExtra === '') {
    alert("Escolha um Extra!");
  } else if (inputRotacao === '') {
    alert("Identifique com sim ou não se a carta pode ser usada na rotação!");
  } else {
    insertList(inputCarta,  inputEdicao, inputQuantidade, inputQualidade, inputIdioma, inputExtra, inputRotacao)
    postItem(inputCarta,  inputEdicao, inputQuantidade, inputQualidade, inputIdioma, inputExtra, inputRotacao)
    alert("Carta adicionada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nome_carta, nome_edicao, quantidade_copia, qualidade, idioma, extra, rotacao) => {
  var item = [nome_carta, nome_edicao, quantidade_copia, qualidade, idioma, extra, rotacao]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  /*for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }*/

  var celNome = row.insertCell(0);
  celNome.textContent = nome_carta;

  var celEdicao = row.insertCell(1);
  celEdicao.textContent = nome_edicao;

  insertInputField(row.insertCell(2),quantidade_copia);

  var celQualidade = row.insertCell(3);
  celQualidade.textContent = qualidade;

  var celIdioma = row.insertCell(4);
  celIdioma.textContent = idioma;

  var celExtra = row.insertCell(5);
  celExtra.textContent = extra;

  var celRotacao = row.insertCell(6);
  celRotacao.textContent = rotacao;

  insertButton(row.insertCell(7));
  document.getElementById("nome_carta").value = "";
  document.getElementById("nome_edicao").value = "";
  document.getElementById("quantidade_copia").value = "";
  document.getElementById("qualidade").value = "";
  document.getElementById("idioma").value = ""; 
  document.getElementById("extra").value = "";
  document.getElementById("rotacao").value = "";

  atualizaQuantidade();
  removeElement()
}




/*
  --------------------------------------------------------------------------------------
  Função para criar um campo editável de texto para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertInputField = (parent, quantidade_copia) => {
  let input = document.createElement("input");
  input.type = "text";
  input.className = "editable-input";
  //input.setAttribute('value', formattedDate);
  input.value = quantidade_copia;
  parent.appendChild(input);
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar o item "Quantidade" de acordo com a alteração no campo
  --------------------------------------------------------------------------------------
*/
const atualizaQuantidade = () => {
  let input = document.getElementsByClassName("editable-input");
  let i;
  for (i = 0; i < input.length; i++) {
    input[i].onchange = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      const edicaoItem = div.getElementsByTagName('td')[1].innerHTML
      const qualidadeItem = div.getElementsByTagName('td')[3].innerHTML
      const idiomaItem = div.getElementsByTagName('td')[4].innerHTML
      const extraItem = div.getElementsByTagName('td')[5].innerHTML
      const quantidade_copia = div.getElementsByTagName('td')[2]
      console.log(quantidade_copia.firstChild.value)
      atualizaQuantidadeCopia(nomeItem, quantidade_copia.firstChild.value,edicaoItem,qualidadeItem,idiomaItem,extraItem)
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar o campo Quantidade via requisição PUT
  --------------------------------------------------------------------------------------
*/
const atualizaQuantidadeCopia = (nomeItem, quantidade_copia,edicaoItem,qualidadeItem,idiomaItem,extraItem) => {
  
  console.log(edicaoItem)
  console.log(nomeItem)
  console.log(quantidade_copia)
  console.log(qualidadeItem)
  console.log(idiomaItem)
  console.log(extraItem)

  let url = 'http://127.0.0.1:5000/alteracarta?nome_carta=' + nomeItem + '&nome_edicao=' + edicaoItem + '&qualidade=' + qualidadeItem + '&idioma=' + idiomaItem + '&extra=' + extraItem + '&quantidade_copia=' + quantidade_copia;
  fetch(url, {
    method: 'put'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


const RemoverLinhas = () =>{

  // Obtém a referência para a tabela pelo ID
  let table = document.getElementById('myTable');

  // Obtém todas as linhas da tabela, exceto o cabeçalho
  let rows = table.getElementsByTagName('tr');
  
  // Remove todas as linhas da tabela, começando do fim para o início
  // Isso evita problemas com a mudança de índices durante a remoção
  for (let i = rows.length - 1; i > 1; i--) {
    table.deleteRow(i);
  }

FiltroList()

}


const FiltroList = async () => {
  
  let inputCarta = document.getElementById("BuscaCarta").value;
  let inputEdicao = document.getElementById("Buscaedicao").value;
  let inputQualidade = document.getElementById("Buscaqualidade").value;
  let inputIdioma = document.getElementById("Buscaidioma").value;
  let inputExtra = document.getElementById("Buscaextra").value;

  if (inputCarta === '') {
    alert("Escreva o nome de uma carta!");
  } else if (inputEdicao === '') {
    alert("Escolha uma Edição!");
  } else if (inputQualidade === '') {
    alert("Escolha uma Qualidade!");
  } else if (inputIdioma === '') {
    alert("Escolha um idioma!");
  } else if (inputExtra === '') {
    alert("Escolha um Extra!");
  } else {
  
  let url = 'http://127.0.0.1:5000/buscacarta?nome_carta=' + inputCarta + '&nome_edicao=' + inputEdicao + '&qualidade=' + inputQualidade + '&idioma=' + inputIdioma + '&extra=' + inputExtra;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      insertList(data.nome_carta, data.nome_edicao, data.quantidade_copia, data.qualidade, data.idioma, data.extra, data.rotacao)
      /*console.log(data);
      data.Cartas.forEach(item => insertList(item.nome_carta, item.nome_edicao, item.quantidade_copia, item.qualidade, item.idioma, item.extra, item.rotacao));*/
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}