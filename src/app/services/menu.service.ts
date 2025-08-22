import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../model/menu';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu> {

  private menuChange = new Subject<Menu[]>();

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/menus`
    );
   }

   getMenusByUser(){
    return this.http.post<Menu[]>(`${environment.HOST}/menus/user`, {});
   }

   getMenuChanges(){
    return this.menuChange.asObservable();
   }

   setMenuChangue(menus: Menu[]){
    this.menuChange.next(menus);
   }
}
