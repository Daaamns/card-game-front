import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environements/environment';
import { ClassType } from '../models/class.type';

@Injectable({
  providedIn: 'root',
})
export class ClassTypeService {
  constructor(private http: HttpClient) {}

  getClassType$(): Observable<ClassType[]> {
    return this.http.get<ClassType[]>(
      `${environment.database.path}/class/get/all`
    );
  }
}
