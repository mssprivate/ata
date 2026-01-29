fetch("http://localhost:3000/personagens")
  .then(res => res.json())
  .then(dados => console.log(dados));


const input = document.getElementById("palavraInput");
const kekw = document.getElementById("kekw");

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const nome = input.value;
    input.value = "";

    const res = await fetch(`http://localhost:3000/personagem/${nome}`);
    const personagem = await res.json();
    
    console.log(personagem);
    if (!personagem) return;

    kekw.insertAdjacentHTML(
      "afterbegin",
      `<div class="background-cinza">
        <div class="palavrinhas">
          <h1>${personagem.Nome}</h1>
          <h2>${personagem.Frase}</h2>
        </div>
        <div class="imagem">
          <img src="${personagem.Imagem}" alt="${personagem.Nome}">
        </div>
      </div>`
    );
  }
});

