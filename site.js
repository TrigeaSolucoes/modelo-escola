(() => {
  const form = document.querySelector("#quiz-nivel");
  const grupos = [...form.querySelectorAll(".pergunta-quiz")];
  const resultado = document.querySelector("#resultado-quiz");
  const nivelTitulo = document.querySelector("#nivel-titulo");
  const nivelTexto = document.querySelector("#nivel-texto");
  const agendar = document.querySelector("#agendar-nivel");
  const erro = document.querySelector("#erro-quiz");
  const avancar = document.querySelector("#avancar-quiz");
  const progresso = document.querySelector("#barra-progresso");
  const textoProgresso = document.querySelector("#progresso-texto");
  let atual = 0;
  let acertos = 0;

  const exibirPergunta = () => {
    grupos.forEach((grupo, indice) => {
      grupo.classList.toggle("ativa", indice === atual);
      grupo.hidden = indice !== atual;
    });
    progresso.value = atual + 1;
    textoProgresso.textContent = `Pergunta ${atual + 1} de ${grupos.length}`;
    avancar.textContent = atual === grupos.length - 1 ? "Ver meu nível" : "Próxima pergunta";
  };

  avancar.addEventListener("click", () => {
    const selecionada = grupos[atual].querySelector('input[type="radio"]:checked');
    if (!selecionada) {
      erro.hidden = false;
      grupos[atual].querySelector("input").focus();
      return;
    }

    erro.hidden = true;
    if (selecionada.dataset.correta === "true") acertos += 1;

    if (atual < grupos.length - 1) {
      atual += 1;
      exibirPergunta();
      grupos[atual].querySelector("input").focus();
      return;
    }

    const resultadoNivel = acertos <= 1
      ? { nivel: "A1", descricao: "Pode ser um bom ponto de partida para praticar o básico." }
      : acertos === 2
        ? { nivel: "A2", descricao: "Talvez você já reconheça situações e frases do cotidiano." }
        : acertos === 3
          ? { nivel: "B1", descricao: "Você pode estar pronto para conversas sobre assuntos familiares." }
          : acertos === 4
            ? { nivel: "B2", descricao: "Você demonstra familiaridade com temas variados e situações de estudo ou trabalho." }
            : { nivel: "C1", descricao: "Você pode conversar sobre um ponto de partida avançado com a equipe pedagógica." };
    nivelTitulo.textContent = `Sua referência inicial: ${resultadoNivel.nivel}`;
    nivelTexto.textContent = `${resultadoNivel.descricao} A equipe confirma o nível junto com você.`;
    const mensagem = `Olá, fiz o teste rápido da Ponte e gostaria de conversar sobre uma turma de inglês. O nível sugerido foi ${resultadoNivel.nivel}.`;
    agendar.href = `${form.dataset.base.split("?")[0]}?text=${encodeURIComponent(mensagem)}`;
    form.hidden = true;
    resultado.hidden = false;
    resultado.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
    });
  });

  exibirPergunta();
})();
