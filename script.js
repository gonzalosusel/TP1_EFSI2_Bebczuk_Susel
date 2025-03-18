const verificarNotas = () => {
    let notas = ["notaMatematica", "notaLengua", "notaEFSI"], EL, todoEnOrden = true;

    for(let id of notas){
        EL = document.getElementById(id); //agarramos el elemento para verificar que tenga un valor.
        if(!EL.value){
            alert(`Por favor rellenar el siguiente campo: ${EL.getAttribute("placeholder")}`);
            todoEnOrden = false;
            continue; //en caso de que no tenga nada, nos salteamos si la verificacion del valor cumple. 
        }
    
        const nota = parseInt(EL.value); //convertimos el id en numero y verificamos que este entre 1 y 10.
        if(nota < 1 || nota > 10){
            todoEnOrden = false;
            alert(`La nota del siguiente campo no está entre 1 y 10: ${EL.getAttribute("placeholder")}`);
        }
    }

    return todoEnOrden; //usamos este bool para evitar que se realizen calculos en caso de que los inputs no sean validos. 
};

const verificarNota = (id) => {
    EL = document.getElementById(id); //agarramos el elemento para verificar que tenga un valor.
    if(!EL.value || parseInt(EL.value) < 1 || parseInt(EL.value) > 10){
        EL.classList.add("campofalse");
        EL.classList.remove("campotrue");
    } else {
        EL.classList.remove("campofalse");
        EL.classList.add("campotrue");
    }
};

document.querySelector("#CalcularPromedio").onclick = e => {
    if(!verificarNotas()) return;
    let promedio = CalcularNotaPromedio();
    document.querySelector("#ResultadoTxt").textContent = `La nota promedio es un ${promedio}`;
    if(promedio < 6){
        document.querySelector("#ResultadoTxt").classList.add("text-danger");
        document.querySelector("#ResultadoTxt").classList.remove("text-success");
    } else {
        document.querySelector("#ResultadoTxt").classList.add("text-success");
        document.querySelector("#ResultadoTxt").classList.remove("text-danger");
    }
};

document.querySelector("#CalcularMayorNota").onclick = e => {
    if(!verificarNotas()) return;
    let materias = CalcularMayorNota();
    let materiasmaximas = materias.map(el => el.substring(4)).join(" y "); //usamos substring para borrar los prefijos de los id ya que devuelve el nombre del id. 
    
    document.querySelector("#ResultadoTxt").classList.remove("text-danger");
    document.querySelector("#ResultadoTxt").classList.remove("text-success");
    document.querySelector("#ResultadoTxt").textContent = `La nota mas alta es de la/s materia/s ${materiasmaximas}`;
    
    document.querySelector("#notaMatematica").classList.remove("campomayor")
    document.querySelector("#notaLengua").classList.remove("campomayor")
    document.querySelector("#notaEFSI").classList.remove("campomayor")

    for(let materia of materias){
        document.querySelector(`#${materia}`).classList.add("campomayor") // Al apretar la opcion de mayor nota se pondrá en azul el o los numeros de mayor denominacion. 
    }
};

const CalcularMayorNota = () => {
    let notas = {
        "notaMatematica": 0,
        "notaLengua": 0,
        "notaEFSI": 0
    };

    for(let nota of Object.keys(notas)) //Agarra las claves del objeto notas de arriba que el usuario va a cargar previamente (en caso de que este ok lo hará). 
        notas[nota] = parseInt(document.getElementById(nota).value); //Carga los valores en el objeto notas. 

    let max = 0;
    let maxMateria = [];
    for(let nota of Object.keys(notas)){  //funcion clasica para obtener tanto el nombre de la materia y cuanto fue la mayor nota. 
        if(notas[nota] > max){
            max = notas[nota];
            maxMateria.splice(0, maxMateria.length); // Vaciamos la lista antes de añadir la nueva materia
            maxMateria.push(nota); // al hacer push se añade el elemento a la lista. 
        } else if(notas[nota] == max){
            maxMateria.push(nota);
        }
    }

    return maxMateria;
}

const CalcularNotaPromedio = () => {
    let notas = ["notaMatematica", "notaLengua", "notaEFSI"];
    notas = notas.map(nota => parseInt(document.querySelector(`#${nota}`).value)); //funcion que mapea cada elemento del array al valor de su input.
    let suma = 0;
    for(let nota of notas){  //for que va sumando las notas de los inputs. 
        suma += nota;
    }
    
    return Math.round((suma / notas.length) * 100) / 100; //nos devuelve el promedio (redondeado a 2 caracteres) en funcion de la suma de notas y la cantidad de materias/inputs.
}