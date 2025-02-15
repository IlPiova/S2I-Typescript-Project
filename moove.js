var Mezzo = /** @class */ (function () {
    function Mezzo(tipo) {
        this.tipo = tipo;
        this.id = this.generaID();
        this.stato = "libero";
    }
    Mezzo.prototype.assegnaUtente = function (utente) {
        this.stato = "occupato";
        this.occupante = utente;
    };
    Mezzo.prototype.generaID = function () {
        var chars = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm";
        var maxLenght = 10;
        var newID = "";
        for (var i = 0; i <= maxLenght; i++) {
            newID += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return newID;
    };
    return Mezzo;
}());
var Utente = /** @class */ (function () {
    function Utente(nome, cognome, mail, metodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        this.mail = mail;
        this.metodoPagamento = metodoPagamento;
    }
    Utente.prototype.prenotaMezzo = function (mezzo) {
        // Controllo stato mezzo richiesto, se occupato comunica la non disponibilità del mezzo
        if (mezzo.stato !== "libero") {
            console.log("Il mezzo che hai richiesto (ID: ".concat(mezzo.id, ") \u00E8 gi\u00E0 occupato, cercane un altro!"));
        }
        else {
            mezzo.assegnaUtente(this);
            console.log("".concat(this.nome, " ").concat(this.cognome, " ha prenotato il mezzo con ID ").concat(mezzo.id));
        }
    };
    return Utente;
}());
var Citta = /** @class */ (function () {
    function Citta(nome) {
        this.city = nome;
        this.mezzi = [];
    }
    Citta.prototype.aggiungiMezzo = function (mezzo) {
        this.mezzi.push(mezzo);
        console.log("Il mezzo con ID ".concat(mezzo.id, " si trova a ").concat(this.city));
    };
    return Citta;
}());
// Istanze mezzi
var mezzo1 = new Mezzo("bici");
var mezzo2 = new Mezzo("monopattino");
var mezzo3 = new Mezzo("scooter");
var mezzo4 = new Mezzo("scooter");
// Istanze utenti
var user1 = new Utente("Marco", "Rossi", "ciaociao@gmail.com", "Carta");
var user2 = new Utente("Giulia", "Maccardini", "giulysium@gmail.com", "Contanti");
var user3 = new Utente("Teodoro", "Arnaldi", "arnaldoro@gmail.com", "Carta");
// Istanze città
var city1 = new Citta("Milano");
var city2 = new Citta("Bologna");
//L'utente1 prenota il mezzo1 che si trova nella city1
city1.aggiungiMezzo(mezzo1);
user1.prenotaMezzo(mezzo1);
//L'utente2 prenota il mezzo2 che si trova nella city2
city2.aggiungiMezzo(mezzo2);
user2.prenotaMezzo(mezzo2);
//L'utente2 prenota il mezzo2, ma è occupato
user3.prenotaMezzo(mezzo2);
