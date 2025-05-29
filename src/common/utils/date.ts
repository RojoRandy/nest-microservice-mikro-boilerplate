import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/es-mx'; // import locale

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale('es-mx');

export const now = (): Dayjs => {
  return dayjs();
};

export const toDayjs = (date: Date, format: string = 'DD MMMM YYYY hh:mm') => {
  return dayjs(date, format);
};

export const toDate = (date: Date | Dayjs | string) => {
  return dayjs(date).toDate();
};

export const toStartDate = (date: Date | Dayjs | string) => {
  return dayjs(date).set('hour', 0).set('minute', 0).set('second', 0).toDate();
};

export const toEndDate = (date: Date | Dayjs | string) => {
  return dayjs(date)
    .set('hour', 23)
    .set('minute', 59)
    .set('second', 59)
    .toDate();
};

export const setFormat = (
  date: Date | Dayjs | string,
  format: string = 'DD MMMM YYYY hh:mm',
) => {
  return dayjs(date).format(format);
};

export const isAfterDate = (
  baseDate: Dayjs | Date | string,
  date: Dayjs | Date | string,
) => {
  return dayjs(baseDate).isAfter(date);
};

export const isSameOrAfterDate = (
  baseDate: Dayjs | Date | string,
  date: Dayjs | Date | string,
) => {
  return dayjs(baseDate).isSameOrAfter(date);
};

export const isBeforeDate = (
  baseDate: Dayjs | Date | string,
  date: Dayjs | Date | string,
) => {
  return dayjs(baseDate).isBefore(date);
};

export const isSameOrBeforeDate = (
  baseDate: Dayjs | Date | string,
  date: Dayjs | Date | string,
) => {
  return dayjs(baseDate).isSameOrBefore(date);
};

// Días de la semana: 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
// Obtiene N dia del mes (Primer lunes, segundo martes, tercer jueves... etc)
export function getNthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number): dayjs.Dayjs {
  // Iniciar el primer día del mes
  let date = dayjs(new Date(year, month, 1));

  // Contador de ocurrencias del día
  let count = 0;

  // Iterar hasta encontrar la enésima ocurrencia
  while (date.month() === month) {
    if (date.day() === weekday) {
      count++;
      if (count === nth) {
        return date;
      }
    }
    date = date.add(1, 'day');
  }

  throw new Error('La fecha solicitada no existe');
}


export function totalDiasHabiles(fechaInicio: string, fechaFin: string, fechaInhabiles: string[]) {
  let fecha = dayjs(fechaInicio)
  const fin = dayjs(fechaFin)

  let totalDiasHabiles = 0;
  while (fecha.isSameOrBefore(fin, 'day')) {
    const dia = fecha.day() // 0 = domingo, 1 = lunes, ..., 6 = sábado

    if(fechaInhabiles.includes(setFormat(fecha, 'YYYY-MM-DD'))) continue;

    switch (dia) {
      case 1: totalDiasHabiles++; break
      case 2: totalDiasHabiles++; break
      case 3: totalDiasHabiles++; break
      case 4: totalDiasHabiles++; break
      case 5: totalDiasHabiles++; break
      case 6: totalDiasHabiles++; break
    }

    fecha = fecha.add(1, 'day')
  }

  return totalDiasHabiles
}


export default dayjs;
