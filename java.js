document.getElementById('sortearButton').addEventListener('click', function () {
  // Obter os nomes e IDs inseridos
  const namesInput = document.getElementById('names').value;
  const idsInput = document.getElementById('ids').value;

  // Dividir os nomes e IDs em arrays
  const namesArray = namesInput.split(',');
  const idsArray = idsInput.split(',');

  // Verificar se há pelo menos 2 nomes e IDs
  if (namesArray.length < 2 || idsArray.length < 2) {
    document.getElementById('resultado').innerText = 'Insira pelo menos 2 nomes e 2 IDs para sortear.';
    return;
  }

  // Sortear dois índices aleatórios
  const randomIndex1 = Math.floor(Math.random() * namesArray.length);
  let randomIndex2 = Math.floor(Math.random() * namesArray.length);

  // Certificar-se de que o segundo índice não seja igual ao primeiro
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * namesArray.length);
  }

  // Obter os ganhadores com base nos índices sorteados
  const winner1Name = namesArray[randomIndex1];
  const winner1ID = idsArray[randomIndex1];
  const winner2Name = namesArray[randomIndex2];
  const winner2ID = idsArray[randomIndex2];

  // Exibir os ganhadores
  const resultado = `Ganhador 1: ${winner1Name} (ID: ${winner1ID})<br>Ganhador 2: ${winner2Name} (ID: ${winner2ID})`;
  document.getElementById('resultado').innerHTML = resultado;
});
