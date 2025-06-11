import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SecretGridResponse } from '../../../secret-management/models/secret-grid-response';

export interface SecretNotification {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class SecretsSignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private connectionState = new BehaviorSubject<signalR.HubConnectionState>(signalR.HubConnectionState.Disconnected);
  
  // Subjects for different secret events
  private secretCreated = new Subject<SecretNotification>();
  private secretUpdated = new Subject<SecretNotification>();
  private secretDeleted = new Subject<SecretNotification>();
  private secretsListReceived = new Subject<SecretGridResponse[]>();
  private errors = new Subject<string>();

  constructor() {}

  public startConnection(apiUrl: string): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/hubs/secrets`, { // TODO: take from environment variable
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    // Listen for connection state changes
    this.hubConnection.onclose(() => {
      this.connectionState.next(signalR.HubConnectionState.Disconnected);
    });

    this.hubConnection.onreconnecting(() => {
      this.connectionState.next(signalR.HubConnectionState.Reconnecting);
    });

    this.hubConnection.onreconnected(() => {
      this.connectionState.next(signalR.HubConnectionState.Connected);
    });

    // Listen for secret events from the hub
    this.hubConnection.on('SecretCreated', (secretData: SecretNotification) => { // TODO: constants...
      console.log('Secret created:', secretData);
      this.secretCreated.next(secretData);
    });

    this.hubConnection.on('SecretUpdated', (secretData: SecretNotification) => { // TODO: constants...
      console.log('Secret updated:', secretData);
      this.secretUpdated.next(secretData);
    });

    this.hubConnection.on('SecretDeleted', (secretData: SecretNotification) => { // TODO: constants...
      console.log('Secret deleted:', secretData);
      this.secretDeleted.next(secretData);
    });

    this.hubConnection.on('SecretsListReceived', (secrets: SecretGridResponse[]) => { // TODO: constants...
      console.log('Secrets list received:', secrets);
      this.secretsListReceived.next(secrets);
    });

    this.hubConnection.on('Error', (error: string) => {
      console.error('SignalR error:', error);
      this.errors.next(error);
    });

    return this.hubConnection.start().then(() => {
      this.connectionState.next(signalR.HubConnectionState.Connected);
      console.log('SignalR Connected to SecretsHub');
      // Auto-join the secrets group
      return this.joinSecretsGroup();
    }).catch(err => {
      console.error('Error while starting SignalR connection: ', err);
      throw err;
    });
  }

  public stopConnection(): Promise<void> {
    if (this.hubConnection) {
      return this.leaveSecretsGroup().then(() => {
        return this.hubConnection!.stop();
      }).then(() => {
        this.connectionState.next(signalR.HubConnectionState.Disconnected);
        console.log('SignalR Disconnected from SecretsHub');
      });
    }
    return Promise.resolve();
  }

  // SignalR Hub Methods
  public joinSecretsGroup(): Promise<void> {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      return this.hubConnection.invoke('JoinSecretsGroup');
    }
    return Promise.reject('No connection to server yet.');
  }

  public leaveSecretsGroup(): Promise<void> {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      return this.hubConnection.invoke('LeaveSecretsGroup');
    }
    return Promise.resolve();
  }

  public requestSecretsList(): Promise<void> {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      return this.hubConnection.invoke('RequestSecretsList');
    }
    return Promise.reject('No connection to server yet.');
  }

  // Event Observables
  public onSecretCreated(): Observable<SecretNotification> {
    return this.secretCreated.asObservable();
  }

  public onSecretUpdated(): Observable<SecretNotification> {
    return this.secretUpdated.asObservable();
  }

  public onSecretDeleted(): Observable<SecretNotification> {
    return this.secretDeleted.asObservable();
  }

  public onSecretsListReceived(): Observable<SecretGridResponse[]> {
    return this.secretsListReceived.asObservable();
  }

  public onError(): Observable<string> {
    return this.errors.asObservable();
  }

  public getConnectionState(): Observable<signalR.HubConnectionState> {
    return this.connectionState.asObservable();
  }

  public isConnected(): boolean {
    return this.hubConnection?.state === signalR.HubConnectionState.Connected;
  }
}
