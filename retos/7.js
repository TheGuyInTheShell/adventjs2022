/* 

En los almacenes de Papá Noel están haciendo inventario. Hay tres almacenes (que se representa cada uno como un Array). En cada almacén hay regalos.

Nos han pedido que escribamos un programa que nos diga qué regalos hay que comprar para reponer en nuestros almacenes ahora que se acerca la Navidad. 

Un regalo se tiene que reponer cuando sólo hay stock en uno de los tres almacenes.

Por ejemplo, si tenemos los siguientes almacenes:

const a1 = ['bici', 'coche', 'bici', 'bici']
const a2 = ['coche', 'bici', 'muñeca', 'coche']
const a3 = ['bici', 'pc', 'pc']

El almacén a1 tiene "bici" y "coche".

El almacén a2 tiene "coche", "bici" y "muñeca".

El almacén a3 tiene "bici" y "pc".

El regalo "muñeca" y "pc" sólo están en los almacenes a2 y a3 respectivamente.


const gifts = getGiftsToRefill(a1, a2, a3) // ['muñeca', 'pc']

Como ves, los almacenes pueden tener el mismo regalo repetido varias veces. Pero, por más existencias que haya en un almacén, si no tenemos en los otros dos, debemos reponerlo para tener mejor distribución.

*/

getGiftsToRefill = (a1, a2, a3) => {
  return [...new Set([...a1, ...a2, ...a3])].filter(
    (e) => a1.includes(e) + a2.includes(e) + a3.includes(e) === 1
  );
};
