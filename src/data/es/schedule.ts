/* Su horario en español. Las sesiones conservan los nombres de sus streams; las horas siguen siendo las suyas. */

import { schedule as en } from "../schedule";

export const schedule: typeof en = {
  ...en,
  posted: { ...en.posted, translation: "Trading en vivo de lunes a viernes: NY AM de 9:30 a 11:30 a. m. + Asia de 8 a 10 p. m. EST" },
  words: {
    heading: "Cuándo opera en vivo",
    weekdays: "De lunes a viernes",
    yourTime: "Tu hora",
    eastern: "Hora del Este, como él la publica",
    nextStart: "Próximo inicio programado",
    in: "en",
    hours: "h",
    minutes: "min",
    now: "Tu hora ahora",
    check: "Los planes cambian: su canal de YouTube muestra lo que hay hoy.",
  },
};
