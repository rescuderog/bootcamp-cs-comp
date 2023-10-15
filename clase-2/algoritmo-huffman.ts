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


export enum NodoId {
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

export class ArbolBinarioHuffman {
    private _head: Nodo;
    private _lowest_node: Nodo;

    sort_by_freq(array_freq: Array<Nodo>): Array<Nodo> {
        array_freq.sort(function (a, b) {
            return a.frecuencia - b.frecuencia;
        })
        return array_freq;
    }

    build_tree(frecuencias: Array<any>) {
        let auxQueue: Array<Nodo> = [];
        for(let i = 0; i < frecuencias.length; i++) {
            const nuevo_nodo: Nodo = {
                simbolo: frecuencias[i][0],
                frecuencia: frecuencias[i][1],
                nodo_madre: null,
                etiqueta: null
            }
        
            auxQueue.push(nuevo_nodo);
        }

        while(auxQueue.length > 0) {
            const elem1 = auxQueue.shift()
            const elem2 = auxQueue.shift()

            if(elem1 && elem2) {
                const newElem = {
                    frecuencia: elem1.frecuencia + elem2.frecuencia,
                    nodo_madre: null,
                    etiqueta: null,
                    nodo_izq: elem1,
                    nodo_der: elem2
                }
                elem1.nodo_madre = newElem;
                elem2.nodo_madre = newElem;
                elem1.etiqueta = NodoId.NodoL;
                elem2.etiqueta = NodoId.NodoR;
                auxQueue.push(newElem);
                auxQueue = this.sort_by_freq(auxQueue);
            } else {
                this._head = elem1!;
            }
        } 
    }

    public get head() {
        return this._head;
    }
}

export function BFSHuffman(simbolo: string, arbol: ArbolBinarioHuffman): Nodo | null {
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

export function CalcularCodigo(nodo: Nodo | null): string {
    let codigo: string = "";
    if(nodo === null) return "";

    let currentNode: Nodo = nodo;

    while(currentNode.nodo_madre !== null) {
        codigo = codigo + String(currentNode.etiqueta);
        currentNode = currentNode.nodo_madre;
    }

    return codigo.split('').reverse().join('');
}

export function CalcularSimbolo(codigo: string, arbol: ArbolBinarioHuffman): string {
    let codigo_array = codigo.split('');
    let currentNode = arbol.head;
    for(let cod of codigo_array) {
        const cod_nro = Number(cod);
        if(cod_nro === NodoId.NodoL) {
            currentNode = currentNode.nodo_izq!;
        } else {
            currentNode = currentNode.nodo_der!;
        }
    }

    return currentNode.simbolo!;
}

//esta función es solamente a fines demostrativos, puede tomar un texto y generar el array de frecuencias
export function generarObjDeFrecuencias(a_parsear: string): Object {
    const letras: string[] = a_parsear.split('');
    const frecuencias = {}
    
    for(let i = 0; i < letras.length; i++) {
        if(letras[i] in frecuencias) {
            frecuencias[letras[i]] = frecuencias[letras[i]] + 1;
        } else {
            frecuencias[letras[i]] = 1
        }
    }

    return frecuencias
}

export function convertirEnArrayDeFreq(objeto: Object): Array<any>[] {
    const array_freq: Array<any>[] = []
    for(let key of Object.keys(objeto)) {
        array_freq.push([key, objeto[key]]);
    }

    array_freq.sort(function (a, b) {
        return a[1] - b[1];
    })

    return array_freq;
}