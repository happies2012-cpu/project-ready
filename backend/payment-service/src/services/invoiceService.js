const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateInvoice = async (payment) => {
    return new Promise((resolve, reject) => {
        try {
            // Create invoices directory if it doesn't exist
            const invoicesDir = path.join(__dirname, '../../invoices');
            if (!fs.existsSync(invoicesDir)) {
                fs.mkdirSync(invoicesDir, { recursive: true });
            }

            const filename = `invoice-${payment.invoiceNumber}.pdf`;
            const filepath = path.join(invoicesDir, filename);

            const doc = new PDFDocument({ margin: 50 });
            const stream = fs.createWriteStream(filepath);

            doc.pipe(stream);

            // Header
            doc.fontSize(20).text('INVOICE', 50, 50);
            doc.fontSize(10).text(`Invoice #: ${payment.invoiceNumber}`, 50, 80);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 50, 95);

            // Company Info
            doc.fontSize(12).text('Project Ready', 50, 130);
            doc.fontSize(10).text('Powered by GuideSoft', 50, 145);

            // Customer Info
            doc.fontSize(12).text('Bill To:', 50, 180);
            doc.fontSize(10).text(payment.userName, 50, 195);
            doc.fontSize(10).text(payment.userEmail, 50, 210);

            // Line
            doc.moveTo(50, 240).lineTo(550, 240).stroke();

            // Items
            doc.fontSize(12).text('Description', 50, 260);
            doc.text('Amount', 450, 260);

            doc.fontSize(10).text(payment.description || 'Project Ready Access', 50, 280);
            doc.text(`${payment.currency} ${payment.amount.toFixed(2)}`, 450, 280);

            // Total
            doc.moveTo(50, 310).lineTo(550, 310).stroke();
            doc.fontSize(12).text('Total:', 400, 330);
            doc.text(`${payment.currency} ${payment.amount.toFixed(2)}`, 450, 330);

            // Footer
            doc.fontSize(10).text('Thank you for your business!', 50, 400, { align: 'center' });

            doc.end();

            stream.on('finish', () => {
                resolve(`/invoices/${filename}`);
            });

            stream.on('error', reject);
        } catch (error) {
            reject(error);
        }
    });
};
