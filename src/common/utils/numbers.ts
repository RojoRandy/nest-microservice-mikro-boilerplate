export function redondear(numero: number, numDecimales: number = 0): number {
  return +(Math.round(numero * 100) / 100).toFixed(numDecimales);
}
