document.addEventListener('DOMContentLoaded', function() {
  let namesInput = document.getElementById('names');
  let idsInput = document.getElementById('ids');
  let sortearButton = document.getElementById('sortearButton');
  let resultado = document.getElementById('resultado');

  namesInput.addEventListener('input', salvarDados);
  idsInput.addEventListener('input', salvarDados);
  sortearButton.addEventListener('click', realizarSorteio);

  function salvarDados() {
    let names = namesInput.value;
    let ids = idsInput.value;

    localStorage.setItem('nomes', names);
    localStorage.setItem('ids', ids);
  }

  function realizarSorteio() {
    let namesInput = localStorage.getItem('nomes');
    let idsInput = localStorage.getItem('ids');

    if (!namesInput || !idsInput) {
      resultado.innerHTML = 'Por favor, preencha todos os campos.';
      return;
    }

    let names = namesInput.split(',');
    let ids = idsInput.split(',');

    if (names.length < 2 || ids.length < 2) {
      resultado.innerHTML = 'É necessário pelo menos 2 nomes e 2 IDs para realizar o sorteio.';
      return;
    }

    let ganhadores = [];

    while (ganhadores.length < 2) {
      let randomIndex = Math.floor(Math.random() * names.length);
      let ganhador = `${names[randomIndex]} (ID: ${ids[randomIndex]})`;
      ganhadores.push(ganhador);
      names.splice(randomIndex, 1);
      ids.splice(randomIndex, 1);
    }

    resultado.innerHTML = `Os ganhadores são: ${ganhadores.join(' e ')}`;
  }
});