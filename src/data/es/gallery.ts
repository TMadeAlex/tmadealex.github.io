/*
 * Las fotos en español: las mismas, mostradas desde su propio sitio. Los títulos
 * y lugares quedan como él los escribe; las descripciones para quien no puede
 * verlas (alt) van en español.
 */

import { gallery as en } from "../gallery";
import type { GalleryItem } from "../gallery";

const alts: Record<string, string> = {
  "self-portrait":
    "Un cuarto de motel con luz cálida de la tarde: una colcha estampada, una silla y una mesa redonda, y en la pared la sombra del fotógrafo.",
  "cuban-sisters":
    "Dos mujeres junto a una ventana: una con vestido rojo y grandes aretes rojos, con la mano en el hombro de la otra, que viste de negro y lleva una flor en el pelo.",
  "untitled-upstate":
    "Un pino solitario azotado por el viento junto a una granja blanca, con una pila de leña cortada en primer plano bajo un cielo pálido.",
  "los-3-cubanos":
    "Tres hombres con camisas blancas sentados en un sofá floreado puesto sobre el césped, dos de ellos con abanicos abiertos, frente a un edificio naranja de dos pisos.",
  "dads-perris": "Un retrato en blanco y negro de un hombre con trenzas largas y un collar grueso, mirando directo a la cámara.",
  "florida-project": "Dos niños en una playa cubierta de algas, uno de pie y otro sentado, los dos mirando hacia el mar.",
  "cuban-apt": "La fachada naranja de un edificio de apartamentos con las palabras Geneva Apt 37, con autos estacionados abajo.",
  "dads-miami":
    "Un hombre con locs largos de pie contra una pared beige, con una niña pequeña en la cadera mientras un niño se apoya en su pierna.",
  "fatherless-boy": "Un retrato cercano de un niño con camiseta gris, mirando a la cámara, con banderines desenfocados detrás.",
};

export const gallery: GalleryItem[] = en.map((item) => ({
  ...item,
  alt: alts[item.id] ?? item.alt,
  credit: item.credit ? { ...item.credit, text: "Fotografía: Alexander Saladrigas" } : undefined,
}));
