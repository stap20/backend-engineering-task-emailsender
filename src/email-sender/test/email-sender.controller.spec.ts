import { Test, TestingModule } from '@nestjs/testing';
import { EmailSenderController } from '../email-sender.controller';
import { EmailSenderService } from '../email-sender.service';
import { LoggingService } from '../logging.service';
import { ReportDto } from '../dto/report.dto';

describe('EmailSenderController', () => {
  let controller: EmailSenderController;
  let emailSenderService: EmailSenderService;
  let loggingService: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailSenderService,
        LoggingService,
        {
          provide: EmailSenderService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
        {
          provide: LoggingService,
          useValue: { log: jest.fn(), error: jest.fn() }, // Mocking LoggingService
        },
      ],
      controllers: [EmailSenderController],
    }).compile();

    controller = module.get<EmailSenderController>(EmailSenderController);
    emailSenderService = module.get<EmailSenderService>(EmailSenderService);
    loggingService = module.get<LoggingService>(LoggingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('emailSender', () => {
    it('should call sendEmail and log success', async () => {
      const reportDto: ReportDto = {
        totalSales: 1000,
        itemsSummary: [{ sku: '10', qt: 10 }],
      };

      jest.spyOn(emailSenderService, 'sendEmail').mockImplementation(() => {});

      await controller.emailSender(reportDto);

      expect(emailSenderService.sendEmail).toHaveBeenCalledWith(reportDto);
      expect(loggingService.log).toHaveBeenCalledWith(
        'Email sent successfully',
      );
    });
  });

  it('should call sendEmail and handle errors', async () => {
    const reportDto: ReportDto = { totalSales: 100, itemsSummary: [] };
    const sendEmailSpy = jest.spyOn(emailSenderService, 'sendEmail');
    sendEmailSpy.mockImplementation(() => {
      throw new Error('Send email failed');
    });

    try {
      await controller.emailSender(reportDto);
    } catch {
      expect(sendEmailSpy).toHaveBeenCalledWith(reportDto);
      expect(loggingService.error).toHaveBeenCalledWith(
        'Failed to send email',
        expect.any(String),
      );
    }
  });
});
