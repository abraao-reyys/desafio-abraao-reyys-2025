class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pessoa1 = brinquedosPessoa1.split(",").map((b) => b.trim());
    const pessoa2 = brinquedosPessoa2.split(",").map((b) => b.trim());
    const ordem = ordemAnimais.split(",").map((a) => a.trim());

    for (let nome of ordem) {
      if (!this.animais[nome]) {
        return { erro: "Animal inválido" };
      }
    }

    const brinquedosValidos = new Set(
      Object.values(this.animais).flatMap((a) => a.brinquedos)
    );
    if (
      new Set(pessoa1).size !== pessoa1.length ||
      new Set(pessoa2).size !== pessoa2.length
    ) {
      return { erro: "Brinquedo inválido" };
    }
    if (
      pessoa1.some((b) => !brinquedosValidos.has(b)) ||
      pessoa2.some((b) => !brinquedosValidos.has(b))
    ) {
      return { erro: "Brinquedo inválido" };
    }

    const resultado = [];

    let adotadosPessoa1 = 0;
    let adotadosPessoa2 = 0;

    for (let animalNome of ordem) {
      const animal = this.animais[animalNome];
      let adotante = "abrigo";

      const atende = (brinquedosPessoa, brinquedosDesejados) => {
        if (animalNome === "Loco") return true;
        let i = 0;
        for (let b of brinquedosPessoa) {
          if (b === brinquedosDesejados[i]) {
            i++;
          }
          if (i === brinquedosDesejados.length) return true;
        }
        return false;
      };

      const p1Atende = atende(pessoa1, animal.brinquedos);
      const p2Atende = atende(pessoa2, animal.brinquedos);

      if (p1Atende && p2Atende) {
        adotante = "abrigo";
      } else if (p1Atende && adotadosPessoa1 < 3) {
        adotante = "pessoa 1";
        adotadosPessoa1++;
      } else if (p2Atende && adotadosPessoa2 < 3) {
        adotante = "pessoa 2";
        adotadosPessoa2++;
      }

      resultado.push(`${animalNome} - ${adotante}`);
    }

    return {
      lista: resultado.sort((a, b) => a.localeCompare(b)),
    };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
