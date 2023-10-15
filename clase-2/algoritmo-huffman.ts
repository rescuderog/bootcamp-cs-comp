/*
    Tarea nro. 2 de la Clase 2: Recrear el algoritmo de Huffman. 
    
    Este algoritmo es usado para crear Códigos de Huffman, que a partir de la creación de un árbol binario, en el que son etiquetados los nodos 
    con los caracteres junto con sus frecuencias, permite crear un árbol ordenado por frecuencia de uso de los símbolos, haciendo más eficiente 
    la transmisión de información en aquellos casos donde la entropía del sistema de símbolos resulte baja o moderada.

    Se asumir

    Una descripción breve del mismo (disponible en https://joselu.webs.uvigo.es/material/Algoritmo%20de%20Huffman.pdf), marca que:

    1. Se crean varios árboles, uno por cada uno de los símbolos del alfabeto,
    consistiendo cada uno de los árboles en un nodo sin hijos, y etiquetado cada uno
    con su símbolo asociado y su frecuencia de aparición.

    2. Se toman los dos árboles de menor frecuencia, y se unen creando un nuevo
    árbol. La etiqueta de la raíz será la suma de las frecuencias de las raíces de los
    dos árboles que se unen, y cada uno de estos árboles será un hijo del nuevo
    árbol. También se etiquetan las dos ramas del nuevo árbol: con un 0 la de la
    izquierda, y con un 1 la de la derecha.

    3. Se repite el paso 2 hasta que sólo quede un árbol.
*/

enum NodoId {
    NodoL,
    NodoR
}

//interface de un Nodo, elemento basico para construir un arbol.
interface Nodo {
    simbolo?: string;
    frecuencia: number;
    nodo_izq?: Nodo;
    nodo_der?: Nodo;
    nodo_madre: Nodo | null;
    etiqueta: NodoId | null;
};

class ArbolBinarioHuffman {
    private _head: Nodo;

    constructor(first_elem: Nodo, second_elem: Nodo) {
        this._head = {
            frecuencia: first_elem.frecuencia + second_elem.frecuencia,
            nodo_izq: first_elem,
            nodo_der: second_elem,
            nodo_madre: null,
            etiqueta: null
        }
        first_elem.nodo_madre = this._head;
        second_elem.nodo_madre = this._head;
    }

    agregar_nodo(node_to_add: Nodo) {
        const nodo_hijo = this._head;
        this._head = {
            frecuencia: node_to_add.frecuencia + nodo_hijo.frecuencia,
            nodo_izq: node_to_add,
            nodo_der: nodo_hijo,
            nodo_madre: null,
            etiqueta: null
        }
        node_to_add.nodo_madre = this._head;
        node_to_add.etiqueta = NodoId.NodoL;
        nodo_hijo.nodo_madre = this._head;
        nodo_hijo.etiqueta = NodoId.NodoR
    }

    public get head() {
        return this._head;
    }
}

function BFSHuffman(simbolo: string, arbol: ArbolBinarioHuffman): Nodo | null {
    const head: Nodo = arbol.head;
    const queue: Nodo[] = [];

    queue.push(head);

    while(queue.length > 0) {
        const currentNode = queue.shift();

        if(currentNode?.simbolo == simbolo) {
            return currentNode
        }
        if(currentNode?.nodo_izq) {
            queue.push(currentNode.nodo_izq);
        }
        if(currentNode?.nodo_der) {
            queue.push(currentNode.nodo_der);
        }
    }
    return null;
}

function CalcularCodigo(nodo: Nodo | null): string {
    let codigo: string = "";
    if(nodo === null) return "";

    let currentNode: Nodo = nodo;

    while(currentNode.nodo_madre !== null) {
        codigo = codigo + String(currentNode.etiqueta);
        currentNode = currentNode.nodo_madre;
    }

    return codigo.split('').reverse().join('');
}

//frecuencias de aparicion en el alfabeto segun Wikipedia, ordenado de menor a mayor
const frecuencias: Object = {
    "w": 0.01,
    "k": 0.02,
    "x": 0.22,
    "ñ": 0.31,
    "j": 0.44,
    "z": 0.52,
    "f": 0.69,
    "h": 0.70,
    "q": 0.88,
    "y": 0.90,
    "v": 0.90,
    "g": 1.01,
    "b": 1.42,
    "p": 2.51,
    "m": 3.15,
    "u": 3.93,
    "t": 4.63,
    "c": 4.68,
    "l": 4.97,
    "d": 5.86,
    "i": 6.25,
    "n": 6.71,
    "r": 6.87,
    "s": 7.98,
    "o": 8.68,
    "a": 12.53,
    "e": 13.68
}

const arrayDeFrecuencias: Array<any>[] = [];

for(let key of Object.keys(frecuencias)) {
    arrayDeFrecuencias.push([key, frecuencias[key]]);
}

const primer_nodo: Nodo = {
    simbolo: arrayDeFrecuencias[0][0],
    frecuencia: arrayDeFrecuencias[0][1],
    nodo_madre: null,
    etiqueta: NodoId.NodoL
}

const segundo_nodo: Nodo = {
    simbolo: arrayDeFrecuencias[1][0],
    frecuencia: arrayDeFrecuencias[1][1],
    nodo_madre: null,
    etiqueta: NodoId.NodoR
}

const arbol = new ArbolBinarioHuffman(primer_nodo, segundo_nodo);

for(let i = 2; i < arrayDeFrecuencias.length; i++) {
    const nuevo_nodo: Nodo = {
        simbolo: arrayDeFrecuencias[i][0],
        frecuencia: arrayDeFrecuencias[i][1],
        nodo_madre: null,
        etiqueta: null
    }

    arbol.agregar_nodo(nuevo_nodo);
}

for(let i = 0; i < arrayDeFrecuencias.length; i++) {
    console.log("Codigo de Huffman para la letra "+ arrayDeFrecuencias[i][0]);
    console.log(CalcularCodigo(BFSHuffman(arrayDeFrecuencias[i][0], arbol)));
}