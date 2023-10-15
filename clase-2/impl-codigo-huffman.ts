/*
    Una implementación muy básica para demostrar el algoritmo de Huffman y sus bondades. A partir de una string que se proporciona por consola, se la convierte
    a bits en crudo y a bits mediante el algoritmo de Hufffman, y se muestra las longitudes de las dos cadenas de bits, mostrando la optimización que realiza el
    algoritmo. Asimismo, se devuelve la string original desde los bits calculados por el algoritmo, para demostrar que no se pierde nada en el proceso.
*/

import { ArbolBinarioHuffman, BFSHuffman, CalcularCodigo, convertirEnArrayDeFreq, generarObjDeFrecuencias, CalcularSimbolo } from "./algoritmo-huffman";
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Ingrese una string: ', (answer) => {
    const array_freq = convertirEnArrayDeFreq(generarObjDeFrecuencias(answer));
    const arbol = new ArbolBinarioHuffman()
    let answer_bits = "";
    let answer_huffman = "";
    arbol.build_tree(array_freq);
    for(let i = 0; i < answer.length; i++) {
        answer_bits += answer[i].charCodeAt(0).toString(2) + ' ';
        answer_huffman += CalcularCodigo(BFSHuffman(answer[i], arbol)) + ' ';
    }

    console.log("El total de bits de la string en crudo es "+ answer_bits.length);
    console.log("El total de bits de la string pasada por el algoritmo es "+ answer_huffman.length);

    let string = answer_huffman.split(' ');
    let translated_string = ''

    for(let bits of string) {
        translated_string += CalcularSimbolo(bits, arbol);
    }

    console.log("La string original es: "+ translated_string);
    rl.close()
}   
)


