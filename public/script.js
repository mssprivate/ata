let personagensClient = [];
async function carregarPersonagensClient() {
  try {
    const res = await fetch("personagem.json");
    const data = await res.json();
    personagensClient = Array.isArray(data) ? data : [data];
    console.log("Personagens carregados (client):", personagensClient);
  } catch (err) {
    console.error("Erro ao carregar personagem.json:", err);
    personagensClient = [];
  }
}

carregarPersonagensClient();


let personagem_do_dia;  
async function carregarPersonagem() {
  if (!personagensClient || personagensClient.length === 0) {
    await carregarPersonagensClient();
  }
  personagem_do_dia = personagensClient.find(p => p && p.Nome && p.Nome.toLowerCase() === "bolsonaro");
}
carregarPersonagem();

const input = document.getElementById("palavraInput");
const kekw = document.getElementById("kekw");

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const nome = input.value;
    input.value = "";

    // Busca localmente no JSON carregado (case-insensitive)
    if (!personagensClient || personagensClient.length === 0) await carregarPersonagensClient();
    const personagem = personagensClient.find(p => p && p.Nome && p.Nome.toLowerCase() === nome.toLowerCase());
    
    
    if (!personagem) return;
  

    kekw.insertAdjacentHTML(
      "afterbegin",
        `<div class="background-cinza">
          <div class="palavrinhas">
            <div class="nome-frase">
              <h1>${personagem.Nome}</h1>
              <h2 class="frase">"${personagem.Frase}"</h2>
            </div>
            <div class="infos-basicas">
              <p class="estado-p informacao">Estado</p>
              <p class="estado">${personagem.Estado}</p>
              <p class="raça-p informacao">Raça</p>
              <p class="raça">${personagem.Raça}</p>
              <p class="nacionalidade-p informacao">Nacionalidade</p>
              <p class="nacionalidade">${personagem.Nacionalidade}</p>
            </div>
            <div class="infos-maior-status">
              <!-- Conteúdo dinâmico será inserido aqui -->
            </div>
            <div class="infos-ocupacao">
              <!-- Conteúdo dinâmico será inserido aqui -->
            </div>
            <div class="infos-associacoes">
            </div>
          </div>
          <div class="imagem">
            <img src="${personagem.Imagem}" alt="${personagem.Nome}">
          </div>
      </div>`
    );
 
    const estado = kekw.querySelector(".estado");
    const raça = kekw.querySelector(".raça");
    const nacionalidade = kekw.querySelector(".nacionalidade");
    
    const infos_maior_status = kekw.querySelector(".infos-maior-status");
    setColunasDinamicas(infos_maior_status, personagem.Maior_Status.length);
    const maior_status_array = personagem.Maior_Status; 
    infos_maior_status.innerHTML = `
      <p class="maior-status-p informacao">Maior Status</p>
      ${maior_status_array.map(status => `<p class="maior-status">${status}</p>`).join('')}
    `;
    
    const infos_ocupacao = kekw.querySelector(".infos-ocupacao");
    setColunasDinamicas(infos_ocupacao, personagem.Ocupação.length);
    const infos_ocupacao_array = personagem.Ocupação; 
    infos_ocupacao.innerHTML = `
      <p class="ocupacao-p informacao">Ocupação</p>
      ${infos_ocupacao_array.map(ocupacao => `<p class="ocupacao">${ocupacao}</p>`).join('')}
    `;

    const infos_associacoes = kekw.querySelector(".infos-associacoes");
    setColunasDinamicas(infos_associacoes, personagem.Associações.length);
    const infos_associacoes_array = personagem.Associações; 
    infos_associacoes.innerHTML = `
      <p class="associacoes-p informacao">Associações</p>
      ${infos_associacoes_array.map(associacao => `<p class="associacoes">${associacao}</p>`).join('')}
    `;
  

    if (!personagem_do_dia) await carregarPersonagem();

    compararValores(personagem.Estado, personagem_do_dia.Estado, estado);
    compararValores(personagem.Raça, personagem_do_dia.Raça, raça);
    compararValores(personagem.Nacionalidade, personagem_do_dia.Nacionalidade, nacionalidade);

    if (!Array.isArray(personagem.Maior_Status)){
      compararValores(personagem.Maior_Status, personagem_do_dia.Maior_Status, infos_maior_status);
    } else {
      const maiorStatusElems = infos_maior_status.querySelectorAll('.maior-status');
      maiorStatusElems.forEach(elem => {
        const texto = elem.textContent.trim();
        compararValoresArray([texto], personagem_do_dia.Maior_Status, elem);
      });
    }


    if (!Array.isArray(personagem.Ocupação)){
      compararValores(personagem.Ocupação, personagem_do_dia.Ocupação, infos_ocupacao);
    } else {
      const ocupacaoElems = infos_ocupacao.querySelectorAll('.ocupacao');
      ocupacaoElems.forEach(elem => {
        const texto = elem.textContent.trim();
        compararValoresArray([texto], personagem_do_dia.Ocupação, elem);
      });
    }

    if (!Array.isArray(personagem.Associações)){
     compararValores(personagem.Associações, personagem_do_dia.Associações, infos_associacoes);
  } else { 
      const associacoesElems = infos_associacoes.querySelectorAll('.associacoes');
      associacoesElems.forEach(elem => {
        const texto = elem.textContent.trim();
        compararValoresArray([texto], personagem_do_dia.Associações, elem);
    });
  }
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
  elemento.classList.remove("certo", "errado");

  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    elemento.classList.add("errado");
    return;
  }

  const encontrado = arr1.some(item => arr2.includes(item));
  if (encontrado) {
    elemento.classList.add("certo");
  } else {
    elemento.classList.add("errado");
  }
}

function setColunasDinamicas(elemento, qtd) {
  elemento.style.gridTemplateColumn = `repeat(${qtd}, auto)`;
}