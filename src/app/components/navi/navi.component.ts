import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../sign-components/login/login.component';
import { RegisterComponent } from '../sign-components/register/register.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userLogged:boolean;
  userName:string;
  isAdminPage:boolean;
  adminPageRole: "admin";
  userItems: MenuItem[];
  constructor(
    private dialogService:DialogService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getUserName()
    this.setUserLogged()
    this.createUserItems()
  }

  async createUserItems(){
    if(this.userLogged){
      await this.setIsAdminPage()
      this.userItems = []
      if(this.isAdminPage){
        this.userItems.push(
          { label: 'ADMİN', icon: 'fa fa-briefcase', routerLink: 'admin'},
          { separator: true },
        )
      }
      this.userItems.push({ label: 'PROFİL', icon: 'fa fa-user', routerLink: ['profile'] },
      { label: 'ÇIKIŞ', icon: 'fa fa-sign-out', command: ()=>{
        this.authService.logOut()
      }}); 
    }else{
      this.userItems = [
        { label: 'Kayıt ol', icon: 'fa fa-sign-in', command: () => {
          this.register()
        } },
        { label: 'GİRİŞ YAP', icon: 'fa fa-sign-in', command: () => {
          this.login()
        } }
      ];
    }
  }

  login(){
      const ref = this.dialogService.open(LoginComponent, {
          header: '',
          width: '30%',
          styleClass:'dlgCSS'
      });
  }

  register(){
    const ref = this.dialogService.open(RegisterComponent, {
        header: '',
        width: '30%',
        styleClass:'dlgCSS'
    });
  }

  setUserLogged(){
    this.userLogged = this.authService.loggedIn()
  }

  getUserName(){
    this.userName = this.authService.getUserName()
  }

  async setIsAdminPage(){
    this.isAdminPage = await this.authService.haveRole("admin")
  }



}
