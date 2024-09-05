import { Controller, InternalServerErrorException } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailSenderService } from './email-sender.service';
import { ReportDto } from './dto/report.dto';
import { LoggingService } from './logging.service';

@Controller('email-sender')
export class EmailSenderController {
  constructor(
    private readonly emailSenderService: EmailSenderService,
    private readonly loggingService: LoggingService,
  ) {}

  @EventPattern('report.generated')
  async emailSender(reportData: ReportDto) {
    try {
      this.emailSenderService.sendEmail(reportData);
      this.loggingService.log('Email sent successfully');
    } catch (error) {
      this.loggingService.error('Failed to send email', error.stack);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
