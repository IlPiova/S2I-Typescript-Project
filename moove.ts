interface IMezzo {
  tipo: "bici" | "scooter" | "monopattino";
  id: string;
  stato: "libero" | "occupato";

  assegnaUtente(utente: IUtente): void;
  generaID(): string;
}

interface IUtente {
  nome: string;
  cognome: string;
  mail: string;
  metodoPagamento: "Carta" | "Contanti";

  prenotaMezzo(mezzo: IMezzo): void;
}

interface ICitta {
  city: string;
  mezzi: IMezzo[];

  aggiungiMezzo(mezzo: IMezzo): void;
}

class Mezzo implements IMezzo {
  occupante: IUtente;
  tipo: "bici" | "scooter" | "monopattino";
  id: string;
  stato: "libero" | "occupato";
  constructor(tipo: "bici" | "scooter" | "monopattino") {
    this.tipo = tipo;
    this.id = this.generaID();
    this.stato = "libero";
  }

  assegnaUtente(utente: IUtente): void {
    this.stato = "occupato";
    this.occupante = utente;
  }
  generaID(): string {
    let chars =
      "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm";
    let maxLenght = 10;
    let newID = "";
    for (let i = 0; i <= maxLenght; i++) {
      newID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newID;
  }
}

class Utente implements IUtente {
  nome: string;
  cognome: string;
  mail: string;
  metodoPagamento: "Carta" | "Contanti";
  constructor(
    nome: string,
    cognome: string,
    mail: string,
    metodoPagamento: "Carta" | "Contanti"
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.mail = mail;
    this.metodoPagamento = metodoPagamento;
  }
  prenotaMezzo(mezzo: IMezzo): void {
    // Controllo stato mezzo richiesto, se occupato comunica la non disponibilità del mezzo
    if (mezzo.stato !== "libero") {
      console.log(
        `Il mezzo che hai richiesto (ID: ${mezzo.id}) è già occupato, cercane un altro!`
      );
    } else {
      mezzo.assegnaUtente(this);
      console.log(
        `${this.nome} ${this.cognome} ha prenotato il mezzo con ID ${mezzo.id}`
      );
    }
  }
}

class Citta implements ICitta {
  city: string;
  mezzi: IMezzo[];
  constructor(nome: string) {
    this.city = nome;
    this.mezzi = [];
  }
  aggiungiMezzo(mezzo: IMezzo): void {
    this.mezzi.push(mezzo);
    console.log(`Il mezzo con ID ${mezzo.id} si trova a ${this.city}`);
  }
}

// Istanze mezzi
let mezzo1 = new Mezzo("bici");
let mezzo2 = new Mezzo("monopattino");
let mezzo3 = new Mezzo("scooter");
let mezzo4 = new Mezzo("scooter");

// Istanze utenti
let user1 = new Utente("Marco", "Rossi", "ciaociao@gmail.com", "Carta");
let user2 = new Utente(
  "Giulia",
  "Maccardini",
  "giulysium@gmail.com",
  "Contanti"
);
let user3 = new Utente("Teodoro", "Arnaldi", "arnaldoro@gmail.com", "Carta");

// Istanze città
let city1 = new Citta("Milano");
let city2 = new Citta("Bologna");

//L'utente1 prenota il mezzo1 che si trova nella city1
city1.aggiungiMezzo(mezzo1);
user1.prenotaMezzo(mezzo1);

//L'utente2 prenota il mezzo2 che si trova nella city2
city2.aggiungiMezzo(mezzo2);
user2.prenotaMezzo(mezzo2);

//L'utente2 prenota il mezzo2, ma è occupato
user3.prenotaMezzo(mezzo2);
