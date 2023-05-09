/* 

Estamos probando una nueva CPU para el trineo de Papá Noel. Pero todavía tenemos que programar el software para que funcione.

La CPU tiene 8 registros disponibles, que se llaman V00..V07. Al comienzo del programa, todos los registros contienen 0. La CPU admite las siguientes instrucciones:

MOV Vxx,Vyy: copia el valor del registro Vxx al registro Vyy;
MOV n,Vxx: asigna la constante numérica n al registro Vxx (sobrescribe si ya tiene un valor);
ADD Vxx,Vyy: calcula (Vxx + Vyy) y almacena el resultado en Vxx;
DEC Vxx: decrementa el valor de Vxx en 1.
INC Vxx: incrementa el valor de Vxx en 1.
JMP i: salta a la instrucción número i si V00 es diferente de 0. i está garantizado que sea un número de instrucción válido y 0 sería la primera instrucción.
Como la CPU es de 8 bits, el número que podría representar va desde 0 hasta 255. Si incrementas el número 255 causa un desbordamiento y resulta en 0. Y si decrementas 0, resulta en 255. Ten en cuenta, entonces, que el número 280 sería 24 en la CPU.

Después de que se haya ejecutado la última instrucción, debes devolver una matriz con el resultado para cada registro. De V00 a V07. Ejemplos:

executeCommands([
  'MOV 5,V00',  // V00 es 5
  'MOV 10,V01', // V01 es 10
  'DEC V00',    // V00 ahora es 4
  'ADD V00,V01' // V00 = V00 + V01 = 14
])

// Output: [14, 10, 0, 0, 0, 0, 0]

executeCommands([
  'MOV 255,V00', // V00 es 255
  'INC V00',     // V00 es 256, desborda a 0
  'DEC V01',     // V01 es -1, desborda a 255
  'DEC V01'      // V01 es 254
])

// Output: [0, 254, 0, 0, 0, 0, 0]

executeCommands([
  'MOV 10,V00', // V00 es 10
  'DEC V00',    // decrementa V00 en 1  <---┐
  'INC V01',    // incrementa V01 en 1      |
  'JMP 1',      // bucle hasta que V00 sea 0 ----┘
  'INC V06'     // incrementa V06 en 1
])

// Output: [ 0, 10, 0, 0, 0, 0, 1, 0 ]
Todas las instrucciones proporcionadas ya están validadas y garantizadas de ser correctas.


Basado en la entrevista técnica de SpaceX de CodeSignal

*/

function executeCommands(commands) {
  const r = [0, 0, 0, 0, 0, 0, 0, 0];
  let p = 0;
  const MOV = (v, mpt) => {
    const mp = +mpt.replace(/V\d/, "");
    const mv = +v.replace(/V\d/, "");
    r[mp] = r[mv] || +v;
    p++;
  };
  const DEC = (mpt) => {
    const mpv = +mpt.replace(/V\d/, "");
    r[mpv] = (((r[mpv] - 1) % 256) + 256) % 256;
    p++;
  };
  const INC = (mp) => {
    const mpv = +mp.replace(/V\d/, "");
    r[mpv] = (r[mpv] + 1) % 256;
    p++;
  };
  const ADD = (b, a) => {
    const bv = +b.replace(/V\d/, "");
    const av = +a.replace(/V\d/, "");
    r[bv] = (r[bv] + r[av]) % 256;
    p++;
  };
  const JMP = (i) => {
    p = r[0] ? +i : p + 1;
  };

  const ac = { MOV, ADD, DEC, INC, JMP };
  while (p < commands.length) {
    let [co, ...args] = commands[p].split(" ");
    args = args[0].split(",");
    ac[co](...args);
  }
  return r;
}
