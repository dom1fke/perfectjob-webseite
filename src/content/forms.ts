import { jobs } from "./content";

/** Auswahllisten der Formulare */
export const contactTopics = ["Allgemeine Anfrage", "Personalanfrage (Einrichtung)", "Frage zur Bewerbung"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export const positions = [...jobs.map((j) => j.title), "Initiativbewerbung"];
export const workModels = ["Vollzeit", "Teilzeit", "Minijob", "Noch offen"] as const;

/**
 * Erlaubt Ziffern, Leerzeichen, + ( ) / - – als HTML-pattern für Telefonfelder.
 * Browser werten pattern im „v“-Modus aus: ( ) / - müssen in der Klasse maskiert sein.
 */
export const phonePattern = "[0-9 +\\(\\)\\/\\-]{6,40}";
