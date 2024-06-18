import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environements/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PLayerService {
  constructor(private http: HttpClient) {}

  createPlayer(
    name: string | null | undefined,
    classId: number
  ): Observable<any> {
    return this.http.post<any>(`${environment.database.path}/player/create`, {
      name,
      classId,
    });
  }
}
