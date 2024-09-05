import { Module } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { EmailSenderController } from './email-sender.controller';
import { LoggingService } from './logging.service';

@Module({
  providers: [EmailSenderService, LoggingService],
  controllers: [EmailSenderController],
})
export class EmailSenderModule {}
