import { Component, OnInit } from '@angular/core';
import {IContact} from "../../model/IContact";
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../../../services/contact.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IGroup} from "../../model/IGroup";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  formEditContact!:FormGroup;
  contact!:IContact;
  contactId!:string;
  errorMessage!:string;
  group!:IGroup;
  constructor(private route:ActivatedRoute,
              private contactService:ContactService,
              private fb:FormBuilder) {
    this.contactId=this.route.snapshot.params['contactId'];

  }

  ngOnInit(): void {

     this.contactService.getContact(this.contactId).subscribe({
       next:(data)=>{
         this.contact = data;
         this.formEditContact = this.fb.group({
           name:this.fb.control(this.contact.name),
           photoUrl:this.fb.control(this.contact.photo),
           email:this.fb.control(this.contact.email),
           mobile:this.fb.control(this.contact.mobile),
           company:this.fb.control(this.contact.company),
           title:this.fb.control(this.contact.title),
           groupId:this.fb.control(this.contact.groupId)
         });
         console.log("Edition:"+this.formEditContact.value);
         this.contactService.getGroup(this.contact).subscribe({
           next:(item)=>{
             this.group = item;


           },
           error:(err)=>{
             this.errorMessage =err;
           }
         });


       },
       error:(err)=>{
         this.errorMessage = err;
       }
     });

  }

  handleUpdate() {
    let c=this.formEditContact.value;
    c.id = this.contact.id;
   this.contactService.updateContact(c).subscribe({
     next:(data)=>{
       alert("The contact was updated successfully");
       this.formEditContact.reset();
     }
   })
  }
}
