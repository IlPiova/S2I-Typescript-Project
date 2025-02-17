const enum TIPO {
  SCOOTER = "scooter",
  BICI = "bici",
  MONOPATTINO = "monopattino",
}

const enum STATOMEZZO {
  OCCUPATO = "occupato",
  LIBERO = "libero",
}

const enum PAGAMENTO {
  CARTA = "carta",
  CONTANTI = "contanti",
}

interface IMezzo {
  tipo: TIPO;
  id: string;
  stato: STATOMEZZO;

  assegnaUtente(utente: IUtente): void;
  generaID(): string;
}

interface IUtente {
  nome: string;
  cognome: string;
  mail: string;
  metodoPagamento: PAGAMENTO;

  prenotaMezzo(mezzo: IMezzo): void;
}

interface ICitta {
  city: string;
  mezzi: IMezzo[];

  aggiungiMezzo(mezzo: IMezzo): void;
}

class Mezzo implements IMezzo {
  occupante: IUtente;
  tipo: TIPO;
  id: string;
  stato: STATOMEZZO;

  constructor(tipo: string) {
    this.id = this.generaID();
    this.stato = STATOMEZZO.LIBERO;
    //Controllo validità tipo mezzo
    switch (tipo.toLowerCase()) {
      case TIPO.BICI:
        this.tipo = TIPO.BICI;
        break;
      case TIPO.MONOPATTINO:
        this.tipo = TIPO.MONOPATTINO;
        break;
      case TIPO.SCOOTER:
        this.tipo = TIPO.SCOOTER;
        break;

      default:
        throw new Error("Il mezzo che stai cercando non è valido");
    }
  }

  assegnaUtente(utente: IUtente): void {
    this.stato = STATOMEZZO.OCCUPATO;
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
  metodoPagamento: PAGAMENTO;
  constructor(
    nome: string,
    cognome: string,
    mail: string,
    metodoPagamento: string
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.mail = mail;

    //Controllo validità metodo pagamento
    switch (metodoPagamento.toLowerCase()) {
      case PAGAMENTO.CARTA:
        this.metodoPagamento = PAGAMENTO.CARTA;
        break;
      case PAGAMENTO.CONTANTI:
        this.metodoPagamento = PAGAMENTO.CONTANTI;
        break;

      default:
        throw new Error("Questo tipo di pagamento non è disponibile");
    }
  }
  prenotaMezzo(mezzo: IMezzo): void {
    // Controllo stato mezzo richiesto, se occupato comunica la non disponibilità del mezzo
    if (mezzo.stato !== STATOMEZZO.LIBERO) {
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
let mezzo2 = new Mezzo("MONOPATTINO");
let mezzo3 = new Mezzo("Scooter");
let mezzo4 = new Mezzo("scooter");

// Istanze utenti
let user1 = new Utente("Marco", "Rossi", "ciaociao@gmail.com", "CONTANTI");
let user2 = new Utente(
  "Giulia",
  "Maccardini",
  "giulysium@gmail.com",
  "Contanti"
);
let user3 = new Utente("Teodoro", "Arnaldi", "arnaldoro@gmail.com", "CONTANTI");

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
