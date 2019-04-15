import { Board } from './trello/board';
import { Component } from '@angular/core';
import { TrelloService } from './trello/trello.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TrelloService]

})
export class AppComponent {

  title = 'trelloM';
  authToken: string
  boardSelect: any;
  boards: any[];
  listas: any[];
  selectedItemsToDo = [];
  selectedItemsProgress = [];
  selectedItemsBlocked = [];
  selectedItemsDone = [];

  dropdownSettings = {};
  router: any;

  constructor(private trelloService: TrelloService) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  validateToken() {
    this.trelloService.setToken(this.authToken);
    this.trelloService.validateToken().subscribe((data) => {
      this.trelloService.setMemberId(data);
      this.trelloService.getBoards().subscribe((data) => {
        this.boards = data.map((contact) => {
          return contact;
        });
      });
    });
  }

  loadLists() {
    var encontrado = false;
    for (let board of this.boards) {
      if (board.id == this.boardSelect) {
        this.listas = board.lists;
        encontrado = true;
      }
    }
    if (!encontrado) {
      this.listas = [];
    }
  }

  generateUrl() {
    console.log(this.trelloService.getToken()+this.boardSelect+this.getUrlList(this.selectedItemsToDo)+this.getUrlList(this.selectedItemsBlocked)+this.getUrlList(this.selectedItemsDone))
    this.router.navigate(['/snapshot'], {
      queryParams: {
        token: this.trelloService.getToken(), board: this.boardSelect.id,
        todo: this.getUrlList(this.selectedItemsToDo),
        inprogress: this.getUrlList(this.selectedItemsProgress),
        blocked: this.getUrlList(this.selectedItemsBlocked),
        done: this.getUrlList(this.selectedItemsDone),
      }
    });
  }

  getUrlList(list: any[]) {
    var urlList: string = "";
    for (let board of list) {
      urlList += board.id + ',';
    }
    if (urlList.length > 0) {
      urlList = urlList.substring(0, urlList.length - 1);
    }
    return urlList;
  }
}
