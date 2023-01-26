import { Component, OnInit } from '@angular/core';
import {IContact} from "../../model/IContact";
import {ContactService} from "../../../services/contact.service";
import {ActivatedRoute} from "@angular/router";
import {IGroup} from "../../model/IGroup";

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
   contact!:IContact
   contactId!:string;
   errorMessage!:string;
   group!:IGroup;
  constructor(private contactService:ContactService,private route:ActivatedRoute) { }

  ngOnInit(): void {
     this.contactId = this.route.snapshot.params['contactId'];
     console.log("contact id:"+this.contactId);
     /*this.route.paramMap.subscribe({
       next:(param)=>{
         this.contactId = param.get('contactId');
       }
     })*/
     this.contactService.getContact(this.contactId).subscribe({
       next:(data)=>{
         this.contact = data;
         this.contactService.getGroup(this.contact).subscribe({
           next:(item)=>{
             this.group =item;
             console.log("group: "+this.group.name);
           }
         })
       },
       error:(err)=>{
         this.errorMessage = err;
       }
     })
  }

}
