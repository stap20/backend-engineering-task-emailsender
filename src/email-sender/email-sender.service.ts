import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReportDto } from './dto/report.dto';
import { LoggingService } from './logging.service';

@Injectable()
export class EmailSenderService {
  constructor(private readonly loggingService: LoggingService) {}

  generateReportContent(reportDto: ReportDto): string {
    try {
      let reportContent = `
            <html>
            <body>
              <h2>Daily Invoices Sales Report</h2>
              <p>Total Sales: $${reportDto.totalSales}</p>
              <h3>Items Summary:</h3>
              <table border="1" style="border-collapse: collapse; width: 100%;">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Quantity Sold</th>
                  </tr>
                </thead>
                <tbody>
          `;

      for (const item of reportDto.itemsSummary) {
        reportContent += `
                  <tr>
                    <td>${item.sku}</td>
                    <td>${item.qt}</td>
                  </tr>
                `;
      }
      // Close the table and HTML body
      reportContent += `
                </tbody>
              </table>
            </body>
            </html>
          `;

      return reportContent;
    } catch (error) {
      this.loggingService.error('Error generating report content', error.stack);
      throw new InternalServerErrorException('Error generating report content');
    }
  }

  sendEmail(reportDto: ReportDto): void {
    try {
      // Mock email sending logic

      this.loggingService.log('Mock email sent with the following content:');
      const report = this.generateReportContent(reportDto);
      this.loggingService.log(report);
      this.loggingService.log('Email sent successfully');
    } catch (error) {
      this.loggingService.error('Error sending email', error.stack);
      throw new InternalServerErrorException('Error sending email');
    }
  }
}
