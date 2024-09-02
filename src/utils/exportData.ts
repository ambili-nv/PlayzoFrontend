import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportInterface } from '../types/ReportInterface';

const PDF_MARGIN_LEFT = 40;
const PDF_FONT_SIZE = 15;

export function ownerBookingPdfGenerator(
  data: ReportInterface[],
  startDate: string,
  endDate: string,
  heading: string
) {
  try {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(PDF_FONT_SIZE);

    const title = `${startDate}-${endDate} ${heading}`;
    const headers = [
      ['SL', 'Booking ID', 'User Name', 'Venue Name', 'Sports Item', 'Date', 'Slot Time', 'Booking Status', 'Payment Status', 'Price']
    ];

    const tableData = data?.map((d, i) => [
      i + 1,
      d._id, // Booking ID
      d.userId?.name, // User Name
      d.venueId?.name, // Venue Name
      d.venueId.sportsitem,
      d.date, // Date
      `${d.startTime} - ${d.endTime}`, // Slot Time
      d.bookingStatus, // Booking Status
      d.paymentStatus, // Payment Status
      d.fees, // Price
    ]);

    const totalSum = data.reduce(
      (sum, item) => sum + item.fees,
      0
    );

    tableData.push(['Total', '', '', '', '', '', '', '', totalSum]);

    autoTable(doc, {
      startY: 50,
      head: headers,
      body: tableData,
    });

    doc.text(title, PDF_MARGIN_LEFT, 40);
    doc.save(`${startDate}-${endDate}_owner_booking_report.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}


