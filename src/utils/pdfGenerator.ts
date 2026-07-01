import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportMedicalRecordPDF = (patient: any, history: any[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Medical Record', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`Patient Name: ${patient.name || 'Unknown'}`, 20, 40);
  doc.text(`Patient ID: ${patient.id || 'N/A'}`, 20, 50);
  doc.text(`Date of Birth: ${patient.dob || 'N/A'}`, 120, 40);
  doc.text(`Blood Group: ${patient.bloodGroup || 'N/A'}`, 120, 50);
  
  // Table
  const isStringArray = history.length > 0 && typeof history[0] === 'string';
  
  const tableData = isStringArray 
    ? history.map(h => [h])
    : history.map(record => [
        record.date || '',
        record.diagnosis || '',
        record.doctor || '',
        record.notes || ''
      ]);

  autoTable(doc, {
    startY: 65,
    head: isStringArray ? [['Medical History']] : [['Date', 'Diagnosis', 'Doctor', 'Notes']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [15, 108, 189] },
    styles: { fontSize: 10 }
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, doc.internal.pageSize.height - 10);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: 'right' });
  }

  doc.save(`medical_record_${patient.id || 'export'}.pdf`);
};

export const exportPrescriptionPDF = (prescription: any, patient: any = {}) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(15, 108, 189);
  doc.text('Rx Prescription', 105, 20, { align: 'center' });
  
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 25, 190, 25);
  
  // Patient Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Patient: ${patient.name || '______________________'}`, 20, 35);
  doc.text(`Date: ${prescription.date || new Date().toLocaleDateString()}`, 150, 35);
  
  // Rx Details
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Rx', 20, 50);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`${prescription.medication} ${prescription.dosage}`, 30, 60);
  
  doc.setFontSize(12);
  doc.text(`Sig: ${prescription.instructions}`, 30, 70);
  
  doc.text(`Dispense: ${prescription.refills} refills`, 30, 85);
  
  // Signature
  doc.line(130, 120, 190, 120);
  doc.setFontSize(10);
  doc.text(`Dr. ${prescription.prescribedBy || '_________________'}`, 130, 125);
  
  doc.save(`prescription_${prescription.id || 'export'}.pdf`);
};

export const exportLabReportPDF = (report: any, patient: any = {}) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Laboratory Report', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`Patient: ${patient.name || 'Unknown'}`, 20, 40);
  doc.text(`Test: ${report.testName || 'General Lab Test'}`, 20, 50);
  doc.text(`Date: ${report.date || new Date().toLocaleDateString()}`, 130, 40);
  
  const results = report.results || [];
  const tableData = results.map((res: any) => [
    res.parameter,
    res.value,
    res.referenceRange,
    res.status
  ]);
  
  autoTable(doc, {
    startY: 65,
    head: [['Parameter', 'Result', 'Reference Range', 'Status']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [15, 108, 189] },
    willDrawCell: (data: any) => {
      // Highlight abnormal results
      if (data.section === 'body' && data.column.index === 3) {
        if (data.cell.raw !== 'Normal') {
          doc.setTextColor(220, 38, 38); // Red
        } else {
          doc.setTextColor(22, 163, 74); // Green
        }
      }
    }
  });
  
  doc.save(`lab_report_${report.id || 'export'}.pdf`);
};
