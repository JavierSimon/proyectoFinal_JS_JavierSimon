const btnPiedra = document.getElementById("piedra");
const btnPapel = document.getElementById("papel");
const btnTijera = document.getElementById("tijera");
const btnLagarto = document.getElementById("lagarto");
const btnSpock = document.getElementById("spock");
const agregar = document.querySelector(".boton_agregar");
const botones = document.querySelectorAll("button");
const btnReset = document.createElement("button");
const btnOtroJugador = document.createElement("button");
const texto = document.getElementById("texto");
const titulo = document.querySelector("h1");
const parrafoNombre = document.createElement("p");
const input = document.querySelector(".input");
const contenedor = document.querySelector(".container");
const fondoResultado = document.querySelector(".resultadoFinal");
const contenedorJuego = document.querySelector(".contenedor");
let datosJuego = contenedorJuego.innerHTML;
let h1 = document.querySelector("h1");
let numero;
let contadorGanadas;
let contadorPerdidas;
let inputItem = document.createElement("input");
let nuevoDiv = document.createElement("div");
let jugadores = [];

class Nombre {
  constructor(nombreUsuario) {
    this.crearDiv(nombreUsuario);
  }

  crearDiv(nombreUsuario) {
    inputItem.setAttribute("type", "text");
    inputItem.disabled = true;
    inputItem.classList.add("item-input");
    inputItem.value = `Bienvenido ${nombreUsuario}`;
    nuevoDiv.classList.add("item");
    contenedor.appendChild(nuevoDiv);
    nuevoDiv.appendChild(inputItem);
  }
}

let fnChequearInput = () => {
  if (input.value != "") {
    new Nombre(input.value);
    input.hidden = true;
    agregar.hidden = true;
  }
};

agregar.addEventListener("click", fnChequearInput);
input.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    fnChequearInput();
  }
});

fetch("js/data.json")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    const [pi, pa, ti, la, sp] = data;

    const piedra = pi.nombre;
    const papel = pa.nombre;
    const tijera = ti.nombre;
    const lagarto = la.nombre;
    const spock = sp.nombre;

    data.forEach((e) => {
      if (e.nombre == piedra) {
        btnPiedra.style.backgroundColor = "red";
      } else if (e.nombre == papel) {
        btnPapel.style.backgroundColor = "blue";
      } else if (e.nombre == tijera) {
        btnTijera.style.backgroundColor = "green";
      } else if (e.nombre == lagarto) {
        btnLagarto.style.backgroundColor = "purple";
      } else if (e.nombre == spock) {
        btnSpock.style.backgroundColor = "orange";
      }
    });

    btnPiedra.insertAdjacentHTML(
      "afterbegin",
      `<img src="${pi.imagen}" alt="${piedra}">`
    );

    btnPapel.insertAdjacentHTML(
      "afterbegin",
      `<img src="${pa.imagen}" alt="${papel}">`
    );

    btnTijera.insertAdjacentHTML(
      "afterbegin",
      `<img src="${ti.imagen}" alt="${tijera}">`
    );

    btnLagarto.insertAdjacentHTML(
      "afterbegin",
      `<img src="${la.imagen}" alt="${lagarto}">`
    );

    btnSpock.insertAdjacentHTML(
      "afterbegin",
      `<img src="${sp.imagen}" alt="${spock}">`
    );

    let fnRivalCpu = (valorCpu) => {
      let imagenMaquina = document.getElementById("imgMaquina");
      cpu = valorCpu;

      if (cpu === 0) {
        imagenMaquina.src = `${pi.imagen}`;
        return (cpu = piedra);
      } else if (cpu === 1) {
        imagenMaquina.src = `${pa.imagen}`;
        return (cpu = papel);
      } else if (cpu === 2) {
        imagenMaquina.src = `${ti.imagen}`;
        return (cpu = tijera);
      } else if (cpu === 3) {
        imagenMaquina.src = `${la.imagen}`;
        return (cpu = lagarto);
      } else if (cpu === 4) {
        imagenMaquina.src = `${sp.imagen}`;
        return (cpu = spock);
      }
    };

    let fnUsuario = (valorUsuario) => {
      let imagenUsuario = document.getElementById("imgUsuario");
      eleccion = valorUsuario;

      switch (eleccion) {
        case "piedra":
          eleccion = piedra;
          imagenUsuario.src = `${pi.imagen}`;
          break;
        case "papel":
          eleccion = papel;
          imagenUsuario.src = `${pa.imagen}`;
          break;
        case "tijera":
          eleccion = tijera;
          imagenUsuario.src = `${ti.imagen}`;
          break;
        case "lagarto":
          eleccion = lagarto;
          imagenUsuario.src = `${la.imagen}`;
          break;
        case "spock":
          eleccion = spock;
          imagenUsuario.src = `${sp.imagen}`;
          break;
      }
    };

    let ganar = () => {
      let ganador = document.getElementById("marcadorUsuario");
      numero = Number(ganador.innerHTML) + 1;
      ganador.innerHTML = numero;
      return;
    };

    let perder = () => {
      let perder = document.getElementById("marcadorMaquina");
      numero = Number(perder.innerHTML) + 1;
      perder.innerHTML = numero;
      return;
    };

    let fnVersus = () => {
      if (cpu === eleccion) {
        texto.innerHTML = `¡EMPATASTE! ambos eligieron ${eleccion}`;
        texto.style.backgroundColor = "orange";
        texto.style.color = "white";
      } else if (
        (cpu === "piedra" && eleccion === "papel") ||
        (cpu === "piedra" && eleccion === "spock") ||
        (cpu === "papel" && eleccion === "tijera") ||
        (cpu === "papel" && eleccion === "lagarto") ||
        (cpu === "tijera" && eleccion === "piedra") ||
        (cpu === "tijera" && eleccion === "spock") ||
        (cpu === "lagarto" && eleccion === "piedra") ||
        (cpu === "lagarto" && eleccion === "tijera") ||
        (cpu === "spock" && eleccion === "papel") ||
        (cpu === "spock" && eleccion === "lagarto")
      ) {
        texto.innerHTML = `¡GANASTE!, la cpu eligio ${cpu}`;
        texto.style.backgroundColor = "green";
        texto.style.color = "white";
        ganar();
      } else if (
        (eleccion === "piedra" && cpu === "papel") ||
        (eleccion === "piedra" && cpu === "spock") ||
        (eleccion === "papel" && cpu === "tijera") ||
        (eleccion === "papel" && cpu === "lagarto") ||
        (eleccion === "tijera" && cpu === "piedra") ||
        (eleccion === "tijera" && cpu === "spock") ||
        (eleccion === "lagarto" && cpu === "piedra") ||
        (eleccion === "lagarto" && cpu === "tijera") ||
        (eleccion === "spock" && cpu === "papel") ||
        (eleccion === "spock" && cpu === "lagarto")
      ) {
        texto.innerHTML = `¡PERDISTE!, la cpu eligio ${cpu}`;
        texto.style.backgroundColor = "red";
        texto.style.color = "white";
        perder();
      }
    };

    let resultadoFinal = () => {
      contadorGanadas = document.getElementById("marcadorUsuario");
      let ganaste = Number(contadorGanadas.innerHTML);

      contadorPerdidas = document.getElementById("marcadorMaquina");
      let perdiste = Number(contadorPerdidas.innerHTML);

      let win = {
        nombre: `${input.value}`,
        victoria: `Gano ${ganaste} a ${perdiste}`,
      };

      let lose = {
        nombre: `${input.value}`,
        derrota: `Perdio ${perdiste} a ${ganaste}`,
      };

      if (ganaste === 5) {
        sessionStorage.setItem("ganaste", `${input.value} ganaste`);
        let fraseWin = sessionStorage.getItem("ganaste");
        fondoResultado.innerHTML = `FELICITACIONES ${fraseWin}`;
        fondoResultado.classList.add("fondoGanador");
        contenedorJuego.style.display = "none";
        btnReset.innerHTML = "Volver a jugar";
        btnReset.classList.add("btnReset");
        fondoResultado.appendChild(btnReset);
        btnReset.hidden = false;

        btnOtroJugador.innerHTML = "Cambiar Jugador";
        btnOtroJugador.classList.add("btnOtroJugador");
        fondoResultado.appendChild(btnOtroJugador);
        btnOtroJugador.hidden = false;
        jugadores.push(win);
        localStorage.setItem("Jugadores", JSON.stringify(jugadores));
        contadorGanadas.innerHTML = 0;
        contadorPerdidas.innerHTML = 0;
      }

      if (perdiste === 5) {
        sessionStorage.setItem("perdiste", `${input.value} perdiste`);
        let fraseLose = sessionStorage.getItem("perdiste");

        fondoResultado.innerHTML = `SIGUE INTENTANDO, ${fraseLose}`;
        fondoResultado.classList.add("fondoPerdedor");
        contenedorJuego.style.display = "none";

        btnReset.innerHTML = "Volver a jugar";
        btnReset.classList.add("btnReset");
        fondoResultado.appendChild(btnReset);
        btnReset.hidden = false;

        btnOtroJugador.innerHTML = "Cambiar Jugador";
        btnOtroJugador.classList.add("btnOtroJugador");
        fondoResultado.appendChild(btnOtroJugador);
        btnOtroJugador.hidden = false;
        jugadores.push(lose);
        localStorage.setItem("Jugadores", JSON.stringify(jugadores));
        contadorGanadas.innerHTML = 0;
        contadorPerdidas.innerHTML = 0;
      }
    };

    let playGame = (opcionUsuario) => {
      if (input.value !== "") {
        h1.innerHTML = "Piedra, Papel, Tijera, Lagarto, Spock";
        h1.style.color = "black";
        let largoArray = data.length;
        let cpu = Math.round(Math.random() * (largoArray - 1));
        let eleccion = opcionUsuario;

        fnRivalCpu(cpu);
        fnUsuario(eleccion);
        fnVersus();
        resultadoFinal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Te has olvidado del nombre",
        });
      }
    };

    btnPiedra.addEventListener("click", () => {
      playGame(piedra);
    });

    btnPapel.addEventListener("click", () => {
      playGame(papel);
    });

    btnTijera.addEventListener("click", () => {
      playGame(tijera);
    });

    btnLagarto.addEventListener("click", () => {
      playGame(lagarto);
    });

    btnSpock.addEventListener("click", () => {
      playGame(spock);
    });

    btnReset.addEventListener("click", () => {
      fondoResultado.innerHTML = "";
      fondoResultado.classList.remove("fondoGanador");
      fondoResultado.classList.remove("fondoPerdedor");
      contenedorJuego.style.display = "flex";
      btnReset.hidden = true;

      texto.innerHTML = "Elija una opcion";
      texto.style.backgroundColor = "rgba(255, 183, 77, 0.1)";
      texto.style.color = "black";
    });

    btnOtroJugador.addEventListener("click", () => {
      fondoResultado.innerHTML = "";
      fondoResultado.classList.remove("fondoGanador");
      fondoResultado.classList.remove("fondoPerdedor");
      contenedorJuego.style.display = "flex";
      btnReset.hidden = true;

      texto.innerHTML = "Elija una opcion";
      texto.style.backgroundColor = "rgba(255, 183, 77, 0.1)";
      texto.style.color = "black";

      input.hidden = false;
      agregar.hidden = false;
      input.value = "";
      contenedor.removeChild(nuevoDiv);
      fnChequearInput();
    });
  })
  .catch((error) => {
    Swal.fire({
      icon: "warning",
      title: "Se produjo un error",
      text: "A la brevedad sera solucionado",
    })
  }).finally(info => {
    Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "¡Gana el que llega primero a 5! Recuerde de Ingresar su Nombre",
      })
  })
  ;
