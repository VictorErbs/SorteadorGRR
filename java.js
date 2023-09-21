document.addEventListener('DOMContentLoaded', function() {
  let namesInput = document.getElementById('names');
  let idsInput = document.getElementById('ids');
  let sortearButton = document.getElementById('sortearButton');
  let resultado = document.getElementById('resultado');

  // Carregar dados salvos, se existirem
  namesInput.value = localStorage.getItem('nomes') || '';
  idsInput.value = localStorage.getItem('ids') || '';

  namesInput.addEventListener('input', salvarDados);
  idsInput.addEventListener('input', salvarDados);
  sortearButton.addEventListener('click', realizarSorteio);

  function salvarDados() {
    localStorage.setItem('nomes', namesInput.value);
    localStorage.setItem('ids', idsInput.value);
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

    if (names.length !== ids.length) {
      resultado.innerHTML = 'O número de nomes e IDs não corresponde.';
      return;
    }

    let totalParticipantes = names.length;
    let ganhadores = [];

    // Sorteio sem repetição
    while (ganhadores.length < 2 && totalParticipantes > 0) {
      let randomIndex = Math.floor(Math.random() * totalParticipantes);
      let ganhador = `${names[randomIndex]} (ID: ${ids[randomIndex]})`;

      if (!ganhadores.includes(ganhador)) {
        ganhadores.push(ganhador);
        [names[randomIndex], names[totalParticipantes - 1]] = [names[totalParticipantes - 1], names[randomIndex]];
        [ids[randomIndex], ids[totalParticipantes - 1]] = [ids[totalParticipantes - 1], ids[randomIndex]];
      }

      totalParticipantes--;
    }

    if (ganhadores.length < 2) {
      resultado.innerHTML = 'Não há participantes suficientes para realizar o sorteio sem repetição.';
    } else {
      resultado.innerHTML = `Os ganhadores são: ${ganhadores.join(' e ')}`;
    }

    if (totalParticipantes === 0) {
      resultado.innerHTML += '<br>Não há mais ganhadores para sortear.';
    }

    // Atualizar os campos de entrada com os nomes restantes
    namesInput.value = names.slice(0, totalParticipantes).join(',');
    idsInput.value = ids.slice(0, totalParticipantes).join(',');
  }
});