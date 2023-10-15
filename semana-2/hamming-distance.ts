/*
    Del desafío 461 de Leetcode. La tarea es simple: calcular la distancia de Hamming entre dos enteros no negativos (0 <= x, y <= 2^31 - 1).

    Concepto: La distancia de Hamming es el número de bits en el que difieren (si se los compara bit a bit, vis-a-vis) dos variables. 
    
    Método: Para ello, primero habrá que convertir la variable a binario, y, a fin de poder realizar una comparación entre strings binarias iguales, 
    cerciorarse que la longitud de ambas es idéntica, o bien darle padding (llenar de ceros a la izquierda) aquella que tenga menor longitud. Luego
    de esto, la tarea se resolverá fácilmente iterando por cada bit de ambas string de bits y realizando un XOR entre bits en la misma posición.
*/

function hammingDistance(x: number, y: number): number {
    let x_binary: string = x.toString(2);
    let y_binary: string = y.toString(2);
    let hamming_distance: number = 0;

    if(x_binary.length !== y_binary.length) {
        if(x_binary.length > y_binary.length) {
            y_binary = String(y_binary).padStart(x_binary.length, '0');
        }
        else {
            x_binary = String(x_binary).padStart(y_binary.length, '0');
        }
    }

    for(let i = 0; i <= x_binary.length; i++) {
        const check: number = Number(x_binary[i]) ^ Number(y_binary[i]);
        hamming_distance = hamming_distance + check;
    }

    return hamming_distance;
}
