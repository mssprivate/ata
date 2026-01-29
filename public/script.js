fetch("http://localhost:3000/personagens")
  .then(res => res.json())
  .then(dados => console.log(dados));


let personagem_do_dia;  
async function carregarPersonagem() {
  const persona = await fetch("http://localhost:3000/personagem/Bolsonaro");
  personagem_do_dia = await persona.json();
}
carregarPersonagem();

const input = document.getElementById("palavraInput");
const kekw = document.getElementById("kekw");

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const nome = input.value;
    input.value = "";

    const res = await fetch(`http://localhost:3000/personagem/${nome}`);
    const personagem = await res.json();
    
    
    if (!personagem) return;
    const maior_status_formatado = personagem.Maior_Status.join(", ");
    const ocupacao_formatada = personagem.Ocupação.join(", ");
    const associacoes_formatada = personagem.Associações.join(", ");

    const row_maior_status = maior_status_formatado.split(", ");
    const qtd_row_maior_status = row_maior_status.length;

    kekw.insertAdjacentHTML(
      "afterbegin",
        `<div class="background-cinza">
          <div class="palavrinhas">
            <div class="nome-frase">
              <h1>${personagem.Nome}</h1>
              <h2 class="frase">"${personagem.Frase}"</h2>
            </div>
            <div class="infos-basicas">
              <p class="estado-p">Estado</p>
              <p class="estado">${personagem.Estado}</p>
              <p class="raça-p">Raça</p>
              <p class="raça">${personagem.Raça}</p>
              <p class="nacionalidade-p">Nacionalidade</p>
              <p class="nacionalidade">${personagem.Nacionalidade}</p>
            </div>
            <div class="infos-maior-status">
              <!-- Conteúdo dinâmico será inserido aqui -->
            </div>
            <div class="infos-ocupacao">
              <!-- Conteúdo dinâmico será inserido aqui -->
            </div>
            <div class="infos-associacoes">
              <p class="associacoes">Associações: ${associacoes_formatada}</p>
            </div>
          </div>
          <div class="imagem">
            <img src="${personagem.Imagem}" alt="${personagem.Nome}">
          </div>
      </div>`
    );
 /* 
    const associacoes = kekw.querySelector(".associacoes");
    const estado = kekw.querySelector(".estado");
    const raça = kekw.querySelector(".raça");
    const nacionalidade = kekw.querySelector(".nacionalidade");
    const maior_status = kekw.querySelector(".maior-status");
    const ocupacao = kekw.querySelector(".ocupacao");
*/
    const infos_maior_status = kekw.querySelector(".infos-maior-status");
    setColunasDinamicas(infos_maior_status, qtd_row_maior_status);
    const maior_status_array = personagem.Maior_Status; // array original

    const maiorStatusDiv = kekw.querySelector('.infos-maior-status');
    maiorStatusDiv.innerHTML = `
      <p class="maior-status-p">Maior Status</p>
      ${maior_status_array.map(status => `<p class="maior-status">${status}</p>`).join('')}
    `;
    setMeioDinamico(kekw.querySelector('.maior-status-p'), qtd_row_maior_status);    

    const infos_ocupacao = kekw.querySelector(".infos-ocupacao");
    setColunasDinamicas(infos_ocupacao, personagem.Ocupação.length);
    const infos_ocupacao_array = personagem.Ocupação; // array original

    const ocupacaoDiv = kekw.querySelector('.infos-ocupacao');
    ocupacaoDiv.innerHTML = `
      <p class="ocupacao-p">Ocupação</p>
      ${personagem.Ocupação.map(ocupacao => `<p class="ocupacao">${ocupacao}</p>`).join('')}
    `;
    setMeioDinamico(kekw.querySelector('.ocupacao-p'), personagem.Ocupação.length);
/*    
    compararValores(personagem.Estado, personagem_do_dia.Estado, estado);
    compararValores(personagem.Raça, personagem_do_dia.Raça, raça);
    compararValores(personagem.Nacionalidade, personagem_do_dia.Nacionalidade, nacionalidade);
    compararValores(personagem.Maior_Status, personagem_do_dia.Maior_Status, maior_status);
    compararValores(personagem.Ocupação, personagem_do_dia.Ocupação, ocupacao); 
    compararValores(personagem.Associações, personagem_do_dia.Associações, associacoes);
*/
  }
});

function compararValores(valor1, valor2, elemento) {
  if (valor1 === valor2) {
    elemento.classList.add("certo");
  } else {
    elemento.classList.add("errado");
  }
}

function compararValoresArray(arr1, arr2, elemento) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        elemento.classList.add("certo");
        return;
      }
    }
  }
}

function setMeioDinamico(elemento, qtd) {
  if (qtd % 2 !== 0)  {
    qtd += 1;
    const meio = qtd / 2;
    elemento.style.gridColumn = `${meio}`;
  } else{
    // Terei que criar um abaguho imaginario se pá
  }
}

function setColunasDinamicas(elemento, qtd) {
  elemento.style.gridTemplateColumn = `repeat(${qtd}, auto)`;
}