import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Editeur } from './editeur';
import { GameService } from '../game-list/game.service';
import { Game } from '../game-list/game';
import { Contact } from '../contacts/contact';
import { API_URL } from 'src/environments/environment';

const CREATE_EDITEURS_URL = `${API_URL}/company`;
const GET_EDITEURS_URL = `${API_URL}/company`;
const UPDATE_EDITEURS_URL = (companyId: number) => `${API_URL}/company/${companyId}`;
const GET_EDITEUR_URL = (companyId: number) => `${API_URL}/company/${companyId}`;
const GET_GAMES_EDITEUR_URL = (companyId: number) => `${API_URL}/game/company/${companyId}`;
const GET_CONCTACT_EDITEUR_URL = (companyId: number) => `${API_URL}/contact/company/${companyId}`;

@Injectable({
  providedIn: 'root'
})
export class EditeursService {

  constructor(private http: HttpClient) { }

  getEditeurs(
    isPublisher?: boolean,
    isExhibitor?: boolean,
    isActive?: boolean
  ): Observable<Editeur[]> {
    const params = new HttpParams()

    if (isPublisher !== undefined) {
      params.set("isPublisher", isPublisher ? "true" : "false")
    }
    if (isExhibitor !== undefined) {
      params.set("isExhibitor", isExhibitor ? "true" : "false")
    }
    if (isActive !== undefined) {
      params.set("isActive", isActive ? "true" : "false")
    }

    return this.http.get<Editeur[]>(GET_EDITEURS_URL, { params: params });
  }

  getGamesForEditeur(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(GET_GAMES_EDITEUR_URL(id));
  }

  addEditeur(name: string,
    address: string,
    isActive: boolean,
    isExhibitor: boolean,
    isPublisher: boolean
  ) {
    return this.http.post(CREATE_EDITEURS_URL, {
      name,
      address,
      isExhibitor,
      isPublisher,
      isActive
    });
  }

  editEditeur(id: number,
    name: string,
    address: string,
    isActive: boolean,
    isExhibitor: boolean,
    isPublisher: boolean
  ) {
    return this.http.patch(UPDATE_EDITEURS_URL(id), {
      name,
      address,
      isExhibitor,
      isPublisher,
      isActive
    });
  }

  getContactForCompany(id: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(GET_CONCTACT_EDITEUR_URL(id));
  }

  getEditeur(id: number): Observable<Editeur> {
    return this.http.get<Editeur>(GET_EDITEUR_URL(id));
  }

}
