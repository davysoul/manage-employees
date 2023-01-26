import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../../../services/contact.service";
import {IGroup} from "../../model/IGroup";
import {IContact} from "../../model/IContact";
import {UUID} from "angular2-uuid";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  formAddContact!:FormGroup;
  errorMessage!:string;
  groups:IGroup[]=[];
  contact!:IContact;
  constructor(private contactService:ContactService,
              private fb:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.formAddContact = this.fb.group({
      name:this.fb.control('',Validators.required),
      photoUrl:this.fb.control('',Validators.required),
      email:this.fb.control('',[Validators.email,Validators.required]),
      mobile:this.fb.control('',Validators.required),
      company:this.fb.control('',Validators.required),
      title:this.fb.control('',Validators.required),
      groupId:this.fb.control('',Validators.required)

    });
    this.contactService.getAllGroup().subscribe({
      next:(data)=>{
        this.groups=data;

      },
      error:(err)=>{
        this.errorMessage = err;
      }
    })
  }

  handleAddContact() {
    this.contact = this.formAddContact.value;
    this.contact.id = UUID.UUID();
    console.log(this.contact);
    this.contactService.createContact(this.contact).subscribe({
      next:(data)=>{
        alert("The contact was added successfully");
        this.formAddContact.reset();
        this.router.navigateByUrl("/");
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
