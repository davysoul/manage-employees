import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {IContact} from "../app/model/IContact";
import {environment} from "../environments/environment";
import {IGroup} from "../app/model/IGroup";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 private  baseUrl:string =environment.serverUrl;
  constructor(private http:HttpClient) { }
  public getAllContacts():Observable<IContact[]>{
    

   return this.http.get<IContact[]>(`${this.baseUrl}/contacts`);
  }
  public handleError(error:HttpErrorResponse){
    let errorMessage:string="";
    if(error.error instanceof ErrorEvent){
      //client error
      errorMessage =`Error:${error.error.message}`;
    }else{
      //server error
      errorMessage=`Status:${error.status} \n Message:${error.message}`;
    }
    return throwError(errorMessage);
  }
  public getContact(id:string):Observable<IContact>{
    return this.http.get<IContact>(`${this.baseUrl}/contacts/${id}`).pipe(catchError(this.handleError));
  }
  public createContact(contact:IContact):Observable<IContact>{
    return this.http.post<IContact>(`${this.baseUrl}/contacts`,contact).pipe(catchError(this.handleError));
  }
  public updateContact(contact:IContact):Observable<IContact>{
    return this.http.put<IContact>(`${this.baseUrl}/contacts/${contact.id}`,contact).pipe(catchError(this.handleError));
  }
  public deleteContact(id:string):Observable<{}>{
   return this.http.delete(`${this.baseUrl}/contacts/${id}`).pipe(catchError(this.handleError));
  }
  // Get all groups
  public getAllGroup():Observable<IGroup[]>{
    return this.http.get<IContact[]>(`${this.baseUrl}/group`);
  }
  //Get single group
  public getGroup(contact:IContact):Observable<IGroup>{
    return this.http.get<IGroup>(`${this.baseUrl}/group/${contact.groupId}`).pipe(catchError(this.handleError));
  }

}
