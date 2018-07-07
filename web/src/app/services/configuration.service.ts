import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
    constructor() { }

    public protocol = "http";
    public apiVersion = "v1";
    public hostName = window.location.hostname;
    public apiPort = "3001";
}