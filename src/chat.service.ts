import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { IChatClient } from '../commons/chat-client.interface';

@Injectable()
export class ChatService {

  clients$ = new BehaviorSubject<IChatClient[]>([]);

  addClient(id: string): void {
    this.clients$.next([...this.clients$.value, { id }]);
  }

  removeClient(id: string): void {
    this.clients$.next(this.clients$.value.filter(client => client.id !== id));
  }
}
