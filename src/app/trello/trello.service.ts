import { Board } from './board';
import { Injectable } from '@angular/core';
import { Card } from './card';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const apiKey = '20dd95f604b656a212c53fda8bbe5f04';

@Injectable({
  providedIn: 'root'
})
export class TrelloService {

  // private cardsUrl = '/api/cards';
  private apiTrelloUrl: string = 'https://api.trello.com/1/';
  private cardsUrl: string = this.apiTrelloUrl + 'boards/';

  private tokenUrl: string;
  private authToken: string;
  private memberId: string;
  private boardsUrl: string;
  sinceToday: Date;

  constructor(private http: Http) {
    this.tokenUrl = this.apiTrelloUrl + 'tokens/' + this.authToken + '/member?key=' + apiKey + '&fields=id';
  }

  setToken(authToken: string) {
    this.authToken = authToken;
    this.tokenUrl = this.apiTrelloUrl + 'tokens/' + this.authToken + '/member?key=' + apiKey + '&fields=id';
  }
  getToken() {
    return this.authToken;
  }

  getBoard() {
    return this.authToken;
  }

  setCarddURL(boardId: string) {
    let url: string = this.apiTrelloUrl + 'lists/' + boardId + '/cards/?limit=2&fields=name&members=true&member_fields=fullName&key=[yourKey]&token=[yourToken]'
    "&cards=all&fields=id%2Cname%2CdateLastActivity%2CshortUrl%2Cdue%2Clabels&members=true&member_fields=id%2CfullName%2Cusername&actions=all&limit=1000'"
  }

  setMemberId(memberId: string) {
    this.memberId = memberId;
    this.boardsUrl = this.apiTrelloUrl + 'members/' + this.memberId + '/boards?key=' + apiKey + '&token=' + this.authToken + '&fields=name&organization=true&organization_fields=displayName&lists=open';
  }

  validateToken(): Observable<string> {
    return this.http.get(this.tokenUrl).pipe(map((res => res.json().id)));
  }

  getBoards() {
    return this.http.get(this.boardsUrl).pipe(map((res => res.json() as Board[])));
  }

  getList(authToken: string, listId: string): Observable<Card[]> {
    // let url = this.apiTrelloUrl+"lists/"+listId+"/cards?key="+apiKey+"&token="+ authToken+"&cards=all&fields=id%2Cname%2CdateLastActivity%2CshortUrl%2Cdue%2Clabels&members=true&member_fields=id%2CfullName%2Cusername&actions=all&limit=1000',"
    //  let url = this.apiTrelloUrl+"cards/"+"5c6ab348969c550789dd3e13"+"/actions?limit=1000fields=%2Cname&actions=all&actions_limit=2fields=id%2Cname%2CdateLastActivity%2CshortUrl%2Cdue%2Clabels&members=true&member_fields=id%2CfullName%2Cusername&key="+apiKey+"&token="+ authToken

    let url = this.apiTrelloUrl + "lists/" + listId + "/?fields=id&actions=addAttachmentToCard&actions_limit=2&action_fields=idMemberCreator&action_memberCreator_fields=fullName&key=" + apiKey + "&token=" + authToken
    return this.http.get(url).pipe(map((response => response.json() as Card[])))


  }

  geCard(authToken: string, cardId: string): Observable<Card[]> {
    // let url = this.apiTrelloUrl+"lists/"+listId+"/cards?key="+apiKey+"&token="+ authToken+"&cards=all&fields=id%2Cname%2CdateLastActivity%2CshortUrl%2Cdue%2Clabels&members=true&member_fields=id%2CfullName%2Cusername&actions=all&limit=1000',"
    //  return this.http.get(url).pipe(map((response => response.json() as Card[])))
    let url = "https://api.trello.com/1/lists/5a219a0de8486a619204d122?fields=id&actions=all&actions_limit=2&action_fields=idMemberCreator&action_memberCreator_fields=fullName&key=20dd95f604b656a212c53fda8bbe5f04&token=c9afa88b728f34bdf3e2604fe8dfd104245397311fecd7babd02e463e5d3e3a7'"
    return this.http.get(url).pipe(map((response => response.json() as Card[])))

  }

  // get("/api/cards")
  // getCards(): Promise<void | Card[]> {
  //  let url: string = this.cardsUrl="d2EnEWSY/cards/?limit=2&fields=name&members=true&member_fields=fullName&key=[yourKey]&token=[yourToken]"
  //   return this.http.get(this.cardsUrl)
  //     .toPromise()
  //     .then(response => response.json() as Card[])
  //     .catch(this.handleError);
  // }

  // post("/api/cards")
  createCard(newCard: Card): Promise<void | Card> {
    return this.http.post(this.cardsUrl, newCard)
      .toPromise()
      .then(response => response.json() as Card)
      .catch(this.handleError);
  }

  // get("/api/cards/:id") endpoint not used by Angular app

  // delete("/api/cards/:id")
  deleteCard(delCardId: String): Promise<void | String> {
    return this.http.delete(this.cardsUrl + '/' + delCardId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

  formatJson(json: any, type: string) {
    console.log(json);
    console.log(type);
  }


}
