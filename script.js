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
        if(nota < 0 || nota > 10){
            todoEnOrden = false;
            alert(`La nota del siguiente campo no está entre 1 y 10: ${EL.getAttribute("placeholder")}`);
        }
    }

    return todoEnOrden; //usamos este bool para evitar que se realizen calculos en caso de que los inputs no sean validos. 
};

document.querySelector("#CalcularPromedio").onclick = e => {
    if(!verificarNotas()) return;
    document.querySelector("#ResultadoTxt").textContent = `La nota promedio es un ${CalcularNotaPromedio()}`;
};

document.querySelector("#CalcularMayorNota").onclick = e => {
    if(!verificarNotas()) return;
    document.querySelector("#ResultadoTxt").textContent = `La nota mas alta es de la materia ${CalcularMayorNota().substring(4)}`; //usamos substring para borrar los prefijos de los id ya que devuelve el nombre del id. 
};

const CalcularMayorNota = () => {
    let notas = {
        "notaMatematica": 0,
        "notaLengua": 0,
        "notaEFSI": 0
    };

    for(let nota of Object.keys(notas))
        notas[nota] = parseInt(document.getElementById(nota).value);

    let max = 0;
    let maxMateria;
    for(let nota of Object.keys(notas)){  //funcion clasica para obtener tanto el nombre de la materia y cuanto fue la mayor nota. 
        if(notas[nota] > max){
            max = notas[nota];
            maxMateria = nota;
        }
    }

    return maxMateria;
}

const CalcularNotaPromedio = () => {
    let notas = ["notaMatematica", "notaLengua", "notaEFSI"];
    notas = notas.map(nota => parseInt(document.querySelector(`#${nota}`).value)); //funcion que mapea cada elemento del array al valor de su input.
    console.log(notas);
    let suma = 0;
    for(let nota of notas){  //for que va sumando las notas de los inputs. 
        suma += nota;
    }
    
    return Math.round((suma / notas.length) * 100) / 100; //nos devuelve el promedio (redondeado a 2 caracteres) en funcion de la suma de notas y la cantidad de materias/inputs.
}