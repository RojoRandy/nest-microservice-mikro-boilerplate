export const normalizeString = (value: string): string => {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const includesStringInArrayNormalized = (
  texts: string[],
  value: string,
): boolean => {
  const textsNormalized = texts.map((text) => normalizeString(text));
  const valueNormalized = normalizeString(value);

  console.log(textsNormalized);
  console.log(valueNormalized);
  return textsNormalized.some((text) => text.includes(valueNormalized));
};

export function formatearNumero(
  numero: number,
  numDecimales: number = 2,
): string {
  return numero.toLocaleString('es-MX', {
    minimumFractionDigits: numDecimales,
    maximumFractionDigits: numDecimales,
  });
}

export function numeroALetras(num: number): string {
  const unidades = [
    '',
    'un',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve',
  ];
  const decenas = [
    'diez',
    'once',
    'doce',
    'trece',
    'catorce',
    'quince',
    'dieciséis',
    'diecisiete',
    'dieciocho',
    'diecinueve',
  ];
  const decenas2 = [
    '',
    '',
    'veinti',
    'treinta',
    'cuarenta',
    'cincuenta',
    'sesenta',
    'setenta',
    'ochenta',
    'noventa',
  ];
  const centenas = [
    '',
    'ciento',
    'doscientos',
    'trescientos',
    'cuatrocientos',
    'quinientos',
    'seiscientos',
    'setecientos',
    'ochocientos',
    'novecientos',
  ];

  function convertirMenor1000(n: number, isMil: boolean = false): string {
    if (n === 0) return '';
    if (n < 10) return unidades[n % 10]
    if (n < 20) return decenas[n - 10];
    if (n === 20) return 'veinte'
    if (n < 30) {
      return (
        decenas2[Math.floor(n / 10)] +
        (n % 10 !== 0 ? (unidades[n % 10] === 'tres' ? 'trés' : unidades[n % 10]) : '')
      );
    }
    if (n < 100)
      return (
        decenas2[Math.floor(n / 10)] +
        (n % 10 !== 0 ? ' y ' + unidades[n % 10] : '')
      );
    if (n === 100) return 'cien';
    return (
      centenas[Math.floor(n / 100)] +
      (n % 100 !== 0 ? ' ' + convertirMenor1000(n % 100, isMil) : '')
    );
  }

  function convertirMiles(n: number): string {
    if (n < 1000) return convertirMenor1000(n);
    if (n < 1000000) {
      const miles = Math.floor(n / 1000);
      const resto = n % 1000;
      return (
        (miles === 1 ? 'mil' : convertirMenor1000(miles, true) + ' mil') +
        (resto !== 0 ? ' ' + convertirMenor1000(resto) : '')
      );
    }
    return 'Número fuera de rango';
  }

  function convertirMillones(n: number): string {
    if (n < 1000000) return convertirMiles(n);
    if (n < 1000000000) {
        const millones = Math.floor(n / 1000000);
        const resto = n % 1000000;
        return (millones === 1 ? 'un millón' : convertirMenor1000(millones, true) + ' millones') + (resto !== 0 ? ' ' + convertirMiles(resto) : '');
    }
    return convertirBillones(n);
}

  function convertirBillones(n: number): string {
    if (n < 1000000000) return convertirMillones(n);
    if (n < 1000000000000) {
      const billones = Math.floor(n / 1000000000);
      const resto = n % 1000000000;
      return (billones === 1 ? 'un billón' : convertirMenor1000(billones, true) + ' billones') + (resto !== 0 ? ' ' + convertirMillones(resto) : '');
    }
    return 'Número fuera de rango';
}

  const entero = Math.floor(num);
  const centavos = Math.round((num - entero) * 100);
  const result = convertirBillones(entero);
  if(result === 'un') return `${convertirBillones(entero)} peso ${centavos.toString().padStart(2, '0')}/100 M.N.`;
  return `${convertirBillones(entero)} pesos ${centavos.toString().padStart(2, '0')}/100 M.N.`;

  // const entero = Math.floor(num);
  // const centavos = Math.round((num - entero) * 100);
  // return `${convertirMiles(entero)} pesos ${centavos.toString().padStart(2, '0')}/100 M.N.`;
}


export function base64ToArrayBuffer(base64: string) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}