import { Component, OnInit } from '@angular/core';
import {IContact} from "../../model/IContact";
import {ContactService} from "../../../services/contact.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  loading:boolean=false;
  contacts:IContact[]=[];
  errorMessage!:string;
  constructor(private contactService:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.loading=true;
    this.contactService.getAllContacts().subscribe({
      next:(data)=>{
        console.log(JSON.stringify(data));
        this.contacts = data;
        this.loading=false;
      },
      error:err=>{
        this.errorMessage =err;
        this.loading=false;
      }
    })
  }

  handleDelete(c: IContact) {
    let conf= confirm("Are sure to delete this contact?");
    if(!conf) return;
    this.contactService.deleteContact(c.id).subscribe({
     next:(data)=>{
       alert("The contact was deleted successfully");
       this.router.navigateByUrl("/contacts/admin")
     }
    })
  }
}
