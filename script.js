//Função principal que irá imprimir os valores codificados/decodificados.
function print() {
  //Primeiro pegamos o elemento que contem o texto e validamos se ele possui algum valor
  var texto = document.getElementById('texto')
  if (texto.value != '') {
    //Caso realmente possuímos texto para codificar, criamos então as variaveis necessárias
    var select = document.getElementById('list')
    var codificar = document.getElementById('codificar')
    var decodificar = document.getElementById('decodificar')

    var mensagem
    if (codificar.checked) {
      mensagem = codificarMensagem(texto, select)
    } else if (decodificar.checked) {
      mensagem = decodificarMensagem(texto, select)
    }

    var resultado = document.getElementById('resultado')
    resultado.value = mensagem
  }
  console.log('Mensagem original: ' + texto.value)
}

//Esta função serve para mostrar/esconder o input numérico referente a chave da nossa cifra cesar.
function showInput() {
  var select = document.getElementById('list')
  var cesarNumberInput = document.getElementById('cesarInput')
  if (select.value == 'cesar') {
    cesarNumberInput.style.display = 'block' //se o input está escondido, iremos mostrar
  } else {
    cesarNumberInput.style.display = 'none' //se o input está visível, iremos esconder.
  }
}

//Caso o "radio button" seja o de Base64, realizamos as funções btoa (Binary to ASCII) e atob (ASCII to Binary) para codificar/decodificar a mensagem.
//Esta função serve para codificar nossas mensagens em Base64 ou Cesar
function codificarMensagem(texto, select) {
  var mensagemCodificada = ''
  if (select.value == 'base64') {
    //Caso o valor do seletor esteja "base64", realizamos a função btoa (Binary to ASCII) para codificar a mensagem.
    mensagemCodificada = btoa(texto.value)
    console.log('Mensagem codificada em Base64: ' + mensagemCodificada)
  } else {
    var chaveCesar = document.getElementById('cesarNumber').value
    //Para cada letra
    for (var i = 0; i < texto.value.length; i++) {
      //Checamos se ela é maiúscula
      if (texto.value[i] === texto.value[i].toUpperCase())
        //Na tabela ASCII, as letras maiúsculas começam a partir do Decimal 65, então pegamos o código da letra atual com charCodeAt() (exemplo: A = 65), somamos o numero referente a chave cesar (exemplo: 65 + 13 = N), subtraimos 65 para obter o numero exato da nova letra na nossa tabela alfabetica (exemplo: N = 78 em ASCII vai virar N = 13), utilizamos modulo de 26 para garantir que teremos alguma letra entre 0 a 25, pois nosso alfabeto possui apenas 26 letras e, no final, adicionamos 65 novamente.
        //Estamos usando String,fromCharCode() pois o resultado da operação matemática nos retornará um numero referente a posição da letra na tabela ASCII e, com esta função, o numero se converterá nesta letra.
        mensagemCodificada += String.fromCharCode(
          ((texto.value.charCodeAt(i) + chaveCesar - 65) % 26) + 65
        )
      //Caso a letra seja minúscula, utilizaremos toda a lógica acima, apenas substituindo 65 por 97, pois todos as letras minúsculas na tabela ASCII começam na posição Decimal 97.
      else
        mensagemCodificada += String.fromCharCode(
          ((texto.value.charCodeAt(i) + chaveCesar - 97) % 26) + 97
        )
    }
    console.log('Chave Cesar: ' + chaveCesar)
    console.log('Mensagem codificada em Cesar: ' + mensagemCodificada)
  }
  return mensagemCodificada
}

function decodificarMensagem(texto, select) {
  var mensagemDecodificada = ''
  if (select.value == 'base64') {
    mensagemDecodificada = atob(texto)
    console.log('Mensagem decodificada em Base64: ' + mensagemDecodificada)
  } else {
    var chaveCesar = document.getElementById('cesarNumber').value
    //Para cada letra
    for (var i = 0; i < texto.value.length; i++) {
      //Checamos se ela é maiúscula
      if (texto.value[i] === texto.value[i].toUpperCase())
        //Na tabela ASCII, as letras maiúsculas começam a partir do Decimal 65, então pegamos o código da letra atual com charCodeAt() (exemplo: A = 65), somamos o numero referente a chave cesar (exemplo: 65 + 13 = N), subtraimos 65 para obter o numero exato da nova letra na nossa tabela alfabetica (exemplo: N = 78 em ASCII vai virar N = 13), utilizamos modulo de 26 para garantir que teremos alguma letra entre 0 a 25, pois nosso alfabeto possui apenas 26 letras e, no final, adicionamos 65 novamente.
        //Estamos usando String,fromCharCode() pois o resultado da operação matemática nos retornará um numero referente a posição da letra na tabela ASCII e, com esta função, o numero se converterá nesta letra.
        mensagemDecodificada += String.fromCharCode(
          (texto.value.charCodeAt(i) - chaveCesar) % 26
        )
      //Caso a letra seja minúscula, utilizaremos toda a lógica acima, apenas substituindo 65 por 97, pois todos as letras minúsculas na tabela ASCII começam na posição Decimal 97.
      else {
        mensagemDecodificada += String.fromCharCode(
          (texto.value.charCodeAt(i) - chaveCesar) % 26
        )

        console.log(texto.value.charCodeAt(i))
        console.log(texto.value.charCodeAt(i) - chaveCesar)
        console.log((texto.value.charCodeAt(i) - chaveCesar) % 26)
      }
    }
    console.log('Chave Cesar: ' + chaveCesar)
    console.log('Mensagem codificada em Cesar: ' + mensagemDecodificada)
  }

  return mensagemDecodificada
}
