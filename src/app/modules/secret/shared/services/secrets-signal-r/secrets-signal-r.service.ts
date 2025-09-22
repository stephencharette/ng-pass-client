import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SecretGridResponse } from '../../../secret-management/models/secret-grid-response';
import { environment } from '../../../../../../environments/environment';

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

    // Event Observables
    secretCreated$: Observable<SecretNotification> = this.secretCreated.asObservable();
    secretUpdated$: Observable<SecretNotification> = this.secretUpdated.asObservable();
    secretDeleted$: Observable<SecretNotification> = this.secretDeleted.asObservable();
    secretsListReceived$: Observable<SecretGridResponse[]> = this.secretsListReceived.asObservable();
    connectionState$: Observable<signalR.HubConnectionState> = this.connectionState.asObservable();
    $errors: Observable<string> = this.errors.asObservable();

    constructor() { }

    startConnection(): Promise<void> {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apiUri}/hubs/secrets`, {
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
            this.secretCreated.next(secretData);
        });

        this.hubConnection.on('SecretUpdated', (secretData: SecretNotification) => { // TODO: constants...
            this.secretUpdated.next(secretData);
        });

        this.hubConnection.on('SecretDeleted', (secretData: SecretNotification) => { // TODO: constants...
            this.secretDeleted.next(secretData);
        });

        this.hubConnection.on('SecretsListReceived', (secrets: SecretGridResponse[]) => { // TODO: constants...
            this.secretsListReceived.next(secrets);
        });

        this.hubConnection.on('Error', (error: string) => {
            this.errors.next(error);
        });

        return this.hubConnection.start().then(() => {
            this.connectionState.next(signalR.HubConnectionState.Connected);

            // Auto-join the secrets group
            return this.joinSecretsGroup();
        }).catch(err => {
            console.error('Error while starting SignalR connection: ', err);
            throw err;
        });
    }

    stopConnection(): Promise<void> {
        if (this.hubConnection) {
            return this.leaveSecretsGroup().then(() => {
                return this.hubConnection!.stop();
            }).then(() => {
                this.connectionState.next(signalR.HubConnectionState.Disconnected);
            });
        }
        return Promise.resolve();
    }

    // SignalR Hub Methods
    joinSecretsGroup(): Promise<void> {
        if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
            return this.hubConnection.invoke('JoinSecretsGroup');
        }

        return Promise.reject('No connection to server yet.');
    }

    leaveSecretsGroup(): Promise<void> {
        if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
            return this.hubConnection.invoke('LeaveSecretsGroup');
        }

        return Promise.resolve();
    }

    requestSecretsList(): Promise<void> {
        if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
            return this.hubConnection.invoke('RequestSecretsList');
        }

        return Promise.reject('No connection to server yet.');
    }

    isConnected(): boolean {
        return this.hubConnection?.state === signalR.HubConnectionState.Connected;
    }
}
