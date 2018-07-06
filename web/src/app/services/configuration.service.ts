import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx"

@Injectable()
export class ConfigurationService {
    constructor() { }

    //LOCAL
    //public baseUrl="http://localhost:3001/api/v1/";

    //CONTAINER
    public protocol = "http";
    public apiVersion = "v1";

    //DEV
    //public hostName = "localhost";
    //DOCKER
    public hostName = "192.168.1.6";

    public apiPort = "3001";
}