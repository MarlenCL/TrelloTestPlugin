import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrelloService } from '../trello/trello.service';
import { Observable } from 'rxjs';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  recuentoTarjeta = {
    NUM_IN_PROGRESS: -1,
    NUM_DONE: -1,
    NUM_BLOCKED: -1,
    NUM_TODO: -1,
    SUMTOTAL: -1
  };

  listType: Array<string> = ["todo", "inprogress", "blocked", "done"];
  listCards: void;

  constructor(private trelloService: TrelloService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      this.listType.forEach(type => {
        var lists: Array<string> = params[type].split(',');
        lists.forEach(idList => {
          this.trelloService.getList(token, idList).subscribe((data) => {
            this.listCards = this.trelloService.formatJson(data, type);
          });
        });
      });
      // this.trelloService.getList(token, "").subscribe((data) => {
      //   this.listCards = this.trelloService.formatJson(data, "type");
      // });
    });
  }

  generateUrl() {

  }
  setRecuentoTarjetas() {
    //fallo hay que agruparlo por tarea
    let cards = this.getServiceInform();
    let cardsInProgress = 0;
    let cardsBlocked = 0;
    let cardsDone = 0;
    let cardsTodo = 0;
    let sumTotal = 0;

    cards.forEach(function (cardActual) {

      switch (cardActual.list) {
        case "IN_PROGRESS": cardsInProgress++;
          break;
        case "DONE": cardsDone++;
          break;
        case "BLOCKED": cardsBlocked++;
          break;
        case "TODO": cardsTodo++;
        default: "";
      }
      sumTotal++;
    });

    this.recuentoTarjeta.NUM_IN_PROGRESS = cardsInProgress;
    this.recuentoTarjeta.NUM_BLOCKED = cardsBlocked;
    this.recuentoTarjeta.NUM_DONE = cardsDone;
    this.recuentoTarjeta.NUM_TODO = cardsTodo;
    this.recuentoTarjeta.SUMTOTAL = sumTotal;

  }

  getCabeceraTablaInforme() {
    const head: string[] = ["Fecha", "Tarjeta", "Estado", "Usuario", "S today", "S", "E (1st)", "R", "Nota"];
    return head;
  }

  getFooterInforme() {
    let cards = this.getServiceInform();

    let sTodaySum = 0;
    let sSum = 0;
    let e = 0;
    let r = 0;

    let total = [];

    cards.forEach(function (cardActual) {
      sTodaySum = cardActual.spentToday != undefined ? sTodaySum + cardActual.spentToday : sTodaySum;
      sSum = cardActual.spent != undefined ? sSum + cardActual.spent : sSum;
      e = cardActual.estimate != undefined ? e + cardActual.estimate : e;
      r = cardActual.remaining != undefined ? r + cardActual.remaining : r;

    });

    total = [sTodaySum, sSum, e, r];

    return total;
  }

  getColorEstado(estado) {
    let clase = "";
    switch (estado) {
      case "IN_PROGRESS": clase = "in_progress_class";
        break;
      case "DONE": clase = "done_class";
        break;
      case "TODO": clase = "todo_class";
        break;
      case "BLOCKED": clase = "blocked_class";
        break;
      default: clase = "no_asignable";
    }
    return clase;
  }

  getServiceInform() {
    const informeHarcodeado =

      [{
        id: '5a1bde6d828866a6b4a84a63',
        fullName: 'Josue Yanes',
        username: 'jyanesr',
        lastNote: 'Dan el OK a los contenedores. Empezamos las pruebas de software',
        firstEstimate: '200',
        estimate: 200,
        spent: 15,
        spentToday: 6.5,
        remaining: 185,
        cardId: '5c73d38b8d98230e3578769d',
        cardName: 'ADMCONTRAT-3969',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551364679507,
        shortUrl: 'https://trello.com/c/cSXuVJ9s'
      },
      {
        id: '5a1bde6d828866a6b4a84a63',
        fullName: 'Josue Yanes',
        username: 'jyanesr',
        lastNote: 'Enrique Tellez hizo las modificaciones',
        firstEstimate: '48',
        estimate: 48,
        spent: 2,
        spentToday: 2,
        remaining: 46,
        cardId: '5c6d8594499c376aba8910fc',
        cardName: 'ADMCONTRAT-3984',
        list: 'DONE',
        dateLastActivity: 1551364629370,
        shortUrl: 'https://trello.com/c/hSqfPt1N'
      },
      {
        id: '5a1bde6d828866a6b4a84a63',
        fullName: 'Josue Yanes',
        username: 'jyanesr',
        lastNote: 'Perseo Resuelto! Dan el OK a las pruebas',
        firstEstimate: '32',
        estimate: 72,
        spent: 35,
        spentToday: 0,
        remaining: 37,
        cardId: '5c6c1ce6ea2fd08d111c3b5b',
        cardName: 'CATPRODUCT-473',
        list: 'DONE',
        dateLastActivity: 1551364590303,
        shortUrl: 'https://trello.com/c/ALBBFYUf'
      },
      {
        id: '59a7d0ff50b147b782e0634e',
        fullName: 'Riccardo Monaco',
        username: 'riccardomonaco2',
        lastNote: undefined,
        firstEstimate: '2',
        estimate: 2,
        spent: 2,
        spentToday: 2,
        remaining: 0,
        cardId: '5c6ed71b2721c36dae61d681',
        cardName: 'PLANPENSIO-6633',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551358044702,
        shortUrl: 'https://trello.com/c/slTSwkQd'
      },
      {
        id: '58a17da9d11a469e1518d607',
        fullName: 'Fernando',
        username: 'fernandojfdez',
        lastNote: 'Modificación más complicada que la planificada en un principio, muchas diferencias con programa de referencia',
        firstEstimate: '16',
        estimate: 16,
        spent: 7.5,
        spentToday: 6,
        remaining: 8.5,
        cardId: '5c6ed71b2721c36dae61d681',
        cardName: 'PLANPENSIO-6633',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551358044702,
        shortUrl: 'https://trello.com/c/slTSwkQd'
      },
      {
        id: '59a7d0ff50b147b782e0634e',
        fullName: 'Riccardo Monaco',
        username: 'riccardomonaco2',
        lastNote: 'Modificación y pruebas Pacbase PGM: PHDPD077 y PHDPD07R',
        firstEstimate: '6',
        estimate: 17.5,
        spent: 17.5,
        spentToday: 0,
        remaining: 0,
        cardId: '5c6bfbf64b8ea44fe708a48f',
        cardName: 'DATPATRIMO-1558',
        list: 'DONE',
        dateLastActivity: 1551357933778,
        shortUrl: 'https://trello.com/c/aLtRsyBg'
      },
      {
        id: '58a17da9d11a469e1518d607',
        fullName: 'Fernando',
        username: 'fernandojfdez',
        lastNote: undefined,
        firstEstimate: '20',
        estimate: 20,
        spent: 4.5,
        spentToday: 0,
        remaining: 15.5,
        cardId: '5c6bfbf64b8ea44fe708a48f',
        cardName: 'DATPATRIMO-1558',
        list: 'DONE',
        dateLastActivity: 1551357933778,
        shortUrl: 'https://trello.com/c/aLtRsyBg'
      },
      {
        id: '5075e7176edd6f0b1f5a19c7',
        fullName: 'Moisés',
        username: 'hrmoises',
        lastNote: 'Programa PHDPCM05 modificado.',
        firstEstimate: '0',
        estimate: 0,
        spent: 0,
        spentToday: 0,
        remaining: 0,
        cardId: '5c6bfbf64b8ea44fe708a48f',
        cardName: 'DATPATRIMO-1558',
        list: 'DONE',
        dateLastActivity: 1551357933778,
        shortUrl: 'https://trello.com/c/aLtRsyBg'
      },
      {
        id: '5763b18c8981e9d4c9d8e7f4',
        fullName: 'Rosa Marrero',
        username: 'rosamarrero',
        lastNote: undefined,
        firstEstimate: '20',
        estimate: 20,
        spent: 12,
        spentToday: 0,
        remaining: 8,
        cardId: '5c6bfbf64b8ea44fe708a48f',
        cardName: 'DATPATRIMO-1558',
        list: 'DONE',
        dateLastActivity: 1551357933778,
        shortUrl: 'https://trello.com/c/aLtRsyBg'
      },
      {
        id: '5763b18c8981e9d4c9d8e7f4',
        fullName: 'Rosa Marrero',
        username: 'rosamarrero',
        lastNote: undefined,
        firstEstimate: '1',
        estimate: 2,
        spent: 2,
        spentToday: 0,
        remaining: 0,
        cardId: '5c6bfb0b6cdcbe76d03ebcec',
        cardName: 'CATPRODUCT-471',
        list: 'DONE',
        dateLastActivity: 1551356990576,
        shortUrl: 'https://trello.com/c/VKo3AqI3'
      },
      {
        id: '5754a58bdd7e753ddb344dce',
        fullName: 'JM Banchero',
        username: 'jmbchr',
        lastNote: 'Creacion de documento y Pruebas de servicio de modificación y baja.',
        firstEstimate: '30',
        estimate: 46,
        spent: 42,
        spentToday: 0,
        remaining: 4,
        cardId: '5c6bfb0b6cdcbe76d03ebcec',
        cardName: 'CATPRODUCT-471',
        list: 'DONE',
        dateLastActivity: 1551356990576,
        shortUrl: 'https://trello.com/c/VKo3AqI3'
      },
      {
        id: '58a17da9d11a469e1518d607',
        fullName: 'Fernando',
        username: 'fernandojfdez',
        cardId: '5c76be21a7303f10e444e35d',
        cardName: 'FONDINVERS-6214',
        list: 'TODO',
        dateLastActivity: 1551285859327,
        shortUrl: 'https://trello.com/c/oNeLXsjJ'
      },
      {
        id: '5763b18c8981e9d4c9d8e7f4',
        fullName: 'Rosa Marrero',
        username: 'rosamarrero',
        cardId: '5c76be21a7303f10e444e35d',
        cardName: 'FONDINVERS-6214',
        list: 'TODO',
        dateLastActivity: 1551285859327,
        shortUrl: 'https://trello.com/c/oNeLXsjJ'
      },
      {
        id: '59a7d0ff50b147b782e0634e',
        fullName: 'Riccardo Monaco',
        username: 'riccardomonaco2',
        cardId: '5c76be21a7303f10e444e35d',
        cardName: 'FONDINVERS-6214',
        list: 'TODO',
        dateLastActivity: 1551285859327,
        shortUrl: 'https://trello.com/c/oNeLXsjJ'
      },
      {
        id: '5763b18c8981e9d4c9d8e7f4',
        fullName: 'Rosa Marrero',
        username: 'rosamarrero',
        lastNote: undefined,
        firstEstimate: '1',
        estimate: 1,
        spent: 1,
        spentToday: 0,
        remaining: 0,
        cardId: '5c6d19c2bf80cb546845f717',
        cardName: 'FONDINVERS-6150',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551285239986,
        shortUrl: 'https://trello.com/c/moD8B33W'
      },
      {
        id: '5075e7176edd6f0b1f5a19c7',
        fullName: 'Moisés',
        username: 'hrmoises',
        lastNote: undefined,
        firstEstimate: '2',
        estimate: 2,
        spent: 2,
        spentToday: 0,
        remaining: 0,
        cardId: '5c6d19c2bf80cb546845f717',
        cardName: 'FONDINVERS-6150',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551285239986,
        shortUrl: 'https://trello.com/c/moD8B33W'
      },
      {
        id: '59c3ce21f08a8b7dcf522dcc',
        fullName: 'Isidro Soria',
        username: 'isidrosoria1',
        lastNote: undefined,
        firstEstimate: '40',
        estimate: 40,
        spent: 22.5,
        spentToday: 0,
        remaining: 17.5,
        cardId: '5c6d19c2bf80cb546845f717',
        cardName: 'FONDINVERS-6150',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551285239986,
        shortUrl: 'https://trello.com/c/moD8B33W'
      },
      {
        id: '59a7d0ff50b147b782e0634e',
        fullName: 'Riccardo Monaco',
        username: 'riccardomonaco2',
        lastNote: undefined,
        firstEstimate: '3',
        estimate: 7.5,
        spent: 7.5,
        spentToday: 0,
        remaining: 0,
        cardId: '5c6c16f89afa710fa65b6b70',
        cardName: 'TAREAS DE SUPERVISIÓN Y GESTIÓN',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551284777537,
        shortUrl: 'https://trello.com/c/48Hz7N61'
      },
      {
        id: '5763b18c8981e9d4c9d8e7f4',
        fullName: 'Rosa Marrero',
        username: 'rosamarrero',
        lastNote: undefined,
        firstEstimate: '6',
        estimate: 32.5,
        spent: 32.5,
        spentToday: 0,
        remaining: 0,
        cardId: '5c6c16f89afa710fa65b6b70',
        cardName: 'TAREAS DE SUPERVISIÓN Y GESTIÓN',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551284777537,
        shortUrl: 'https://trello.com/c/48Hz7N61'
      },
      {
        id: '5763b18c8981e9d4c9d8e7f4',
        fullName: 'Rosa Marrero',
        username: 'rosamarrero',
        lastNote: undefined,
        firstEstimate: '4',
        estimate: 6,
        spent: 6,
        spentToday: 0,
        remaining: 0,
        cardId: '5c6fd80d62b7573eb4520039',
        cardName: 'DATPATRIMO-1607',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551284734680,
        shortUrl: 'https://trello.com/c/MnPEpnsA'
      },
      {
        id: '5a2199ff993abb291ad0aba3',
        fullName: 'Marlen Corona',
        username: 'marlencorona',
        lastNote: undefined,
        firstEstimate: '24',
        estimate: 24,
        spent: 23.5,
        spentToday: 0,
        remaining: 0.5,
        cardId: '5c6c2099faff341d19240afd',
        cardName: 'ADMCONTRAT-3654',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551283869410,
        shortUrl: 'https://trello.com/c/9CeVplgn'
      },
      {
        id: '5075e7176edd6f0b1f5a19c7',
        fullName: 'Moisés',
        username: 'hrmoises',
        lastNote: undefined,
        firstEstimate: '237',
        estimate: 237,
        spent: 41,
        spentToday: 0,
        remaining: 196,
        cardId: '5c6c2fe00f74c0208acb51bc',
        cardName: 'ADMCONTRAT-3682',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551282226389,
        shortUrl: 'https://trello.com/c/YL64HB6h'
      },
      {
        id: '5754a58bdd7e753ddb344dce',
        fullName: 'JM Banchero',
        username: 'jmbchr',
        lastNote: 'Análisis del PGM PHACC970',
        firstEstimate: '100',
        estimate: 103,
        spent: 14.5,
        spentToday: 0,
        remaining: 88.5,
        cardId: '5c6d80a552567156bc395075',
        cardName: 'ADMCONTRAT-3983',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551280438826,
        shortUrl: 'https://trello.com/c/B1v6zWmh'
      },
      {
        id: '59c3ce21f08a8b7dcf522dcc',
        fullName: 'Isidro Soria',
        username: 'isidrosoria1',
        cardId: '5c6d80a552567156bc395075',
        cardName: 'ADMCONTRAT-3983',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551280438826,
        shortUrl: 'https://trello.com/c/B1v6zWmh'
      },
      {
        id: '58a17da9d11a469e1518d607',
        fullName: 'Fernando',
        username: 'fernandojfdez',
        lastNote: undefined,
        firstEstimate: '200',
        estimate: 200,
        spent: 1,
        spentToday: 0,
        remaining: 199,
        cardId: '5c755a1fe15f87894030637a',
        cardName: 'GARANCORP-852',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551199556919,
        shortUrl: 'https://trello.com/c/9h8ePzgZ'
      },
      {
        id: '5763b18c8981e9d4c9d8e7f4',
        fullName: 'Rosa Marrero',
        username: 'rosamarrero',
        lastNote: undefined,
        firstEstimate: '1',
        estimate: 1,
        spent: 1,
        spentToday: 0,
        remaining: 0,
        cardId: '5c755a1fe15f87894030637a',
        cardName: 'GARANCORP-852',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551199556919,
        shortUrl: 'https://trello.com/c/9h8ePzgZ'
      },
      {
        id: '5763b18c8981e9d4c9d8e7f4',
        fullName: 'Rosa Marrero',
        username: 'rosamarrero',
        lastNote: undefined,
        firstEstimate: '1',
        estimate: 1,
        spent: 1,
        spentToday: 0,
        remaining: 0,
        cardId: '5c6fd49bba91d1875778117a',
        cardName: 'ADMCONTRAT-3983',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551199529492,
        shortUrl: 'https://trello.com/c/KI2pavgj'
      },
      {
        id: '59c3ce21f08a8b7dcf522dcc',
        fullName: 'Isidro Soria',
        username: 'isidrosoria1',
        lastNote: undefined,
        firstEstimate: '160',
        estimate: 160,
        spent: 9,
        spentToday: 0,
        remaining: 151,
        cardId: '5c6fd49bba91d1875778117a',
        cardName: 'ADMCONTRAT-3983',
        list: 'IN_PROGRESS',
        dateLastActivity: 1551199529492,
        shortUrl: 'https://trello.com/c/KI2pavgj'
      },
      {
        id: '58a17da9d11a469e1518d607',
        fullName: 'Fernando',
        username: 'fernandojfdez',
        lastNote: 'Pendiente de contestar desde Madrid si los últimos cambios son correctos y si se necesita añadir más cambios o campos al listado.',
        firstEstimate: '16',
        estimate: 16,
        spent: 0,
        spentToday: 0,
        remaining: 16,
        cardId: '5c6c2d11d411ec622f9f6b5e',
        cardName: 'PLANPENSIO-6323',
        list: 'BLOCKED',
        dateLastActivity: 1551198220962,
        shortUrl: 'https://trello.com/c/9hdsXdxG'
      },
      {
        id: '5075e7176edd6f0b1f5a19c7',
        fullName: 'Moisés',
        username: 'hrmoises',
        lastNote: '(26/02) Se finalizan las pruebas, se envían las pruebas a la analista. Pdte de respuesta.',
        firstEstimate: '40',
        estimate: 40,
        spent: 10,
        spentToday: 0,
        remaining: 30,
        cardId: '5c6bfb7e5631ba32df42d448',
        cardName: 'DATPATRIMO-1476',
        list: 'BLOCKED',
        dateLastActivity: 1551177327387,
        shortUrl: 'https://trello.com/c/6m6E2QkV'
      },
      {
        id: '5763b18c8981e9d4c9d8e7f4',
        fullName: 'Rosa Marrero',
        username: 'rosamarrero',
        lastNote: 'Pendiente de que el analista realice las pruebas',
        firstEstimate: '8',
        estimate: 8,
        spent: 0,
        spentToday: 0,
        remaining: 8,
        cardId: '5c6c2abc0cee10039e61634c',
        cardName: 'DATPATRIMO-1546',
        list: 'BLOCKED',
        dateLastActivity: 1550592736915,
        shortUrl: 'https://trello.com/c/4CskiQL8'
      }]

    return informeHarcodeado;
  }

}
