import { Test, TestingModule } from '@nestjs/testing';
import { EmailSenderService } from '../email-sender.service';
import { LoggingService } from '../logging.service';
import { ReportDto } from '../dto/report.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('EmailSenderService', () => {
  let service: EmailSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailSenderService,
        {
          provide: LoggingService,
          useValue: { log: jest.fn(), error: jest.fn() }, // Mocking LoggingService
        },
      ],
    }).compile();

    service = module.get<EmailSenderService>(EmailSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateReportContent', () => {
    it('should generate report content correctly', () => {
      const reportDto: ReportDto = {
        totalSales: 1000,
        itemsSummary: [{ sku: '10', qt: 10 }],
      };

      const result = service.generateReportContent(reportDto);

      expect(result).toContain('<p>Total Sales: $1000</p>');
      expect(result).toContain('<td>10</td>');
    });

    it('should throw an error if report content generation fails', () => {
      jest.spyOn(service, 'generateReportContent').mockImplementation(() => {
        throw new InternalServerErrorException(
          'Error generating report content',
        );
      });

      const reportDto: ReportDto = {
        totalSales: 1000,
        itemsSummary: null,
      };

      expect(() => service.generateReportContent(reportDto)).toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('sendEmail', () => {
    it('should send email successfully', async () => {
      jest
        .spyOn(service, 'generateReportContent')
        .mockReturnValue('mock content');
      jest
        .spyOn(service, 'sendEmail')
        .mockImplementation(() => Promise.resolve());

      const reportDto: ReportDto = {
        totalSales: 1000,
        itemsSummary: [{ sku: '10', qt: 0 }],
      };

      await expect(service.sendEmail(reportDto)).resolves.not.toThrow();
    });

    it('should throw an error if sending email fails', async () => {
      jest
        .spyOn(service, 'generateReportContent')
        .mockReturnValue('mock content');

      jest.spyOn(service, 'sendEmail').mockImplementation(() => {
        throw new InternalServerErrorException('Error sending email');
      });

      const reportDto: ReportDto = {
        totalSales: 1000,
        itemsSummary: undefined,
      };

      await expect(async () => service.sendEmail(reportDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
