import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  controllers: [
  ],
  providers: [
      ChatService,
      ChatGateway
  ],
})
export class AppModule {}
