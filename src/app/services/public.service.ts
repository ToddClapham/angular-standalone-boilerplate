import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class PublicService {

  constructor(private httpClient: HttpClient) {}

  getVersion() {
    return this.httpClient.get<{version: string}>(`${environment.apiHost}version`);
  }
}
