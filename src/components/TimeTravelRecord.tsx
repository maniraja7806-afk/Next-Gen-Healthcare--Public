import React, { useState } from 'react';
import { motion } from 'motion/react';
import { History, FileText, CircleUser, ArrowLeftRight, Clock, Download } from 'lucide-react';
import { RecordTimelineNode } from '../types';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

const MOCK_TIMELINE: RecordTimelineNode[] = [
  {
    id: 'v3',
    version: 3,
    date: '2026-06-23T09:14:00Z',
    provider: 'Dr. A. Chen',
    notes: 'Patient reports mild headache has subsided. Blood pressure stabilized at 120/80. Prescribed rest.',
    diagnoses: ['Hypertension - Stable'],
    changeReason: 'Updated after morning rounds. Corrected BP reading.',
  },
  {
    id: 'v2',
    version: 2,
    date: '2026-06-22T18:30:00Z',
    provider: 'Nurse M. Roberts',
    notes: 'Patient admitted for observation overnight. Complaining of mild headache. BP 135/85.',
    diagnoses: ['Hypertension - Elevated', 'Cephalgia'],
    changeReason: 'Added admission details and symptoms.',
  },
  {
    id: 'v1',
    version: 1,
    date: '2026-06-22T15:00:00Z',
    provider: 'Dr. A. Chen',
    notes: 'Initial consultation. Patient reported feeling dizzy. BP 140/90.',
    diagnoses: ['Hypertension', 'Dizziness'],
  }
];

export const TimeTravelRecord: React.FC = () => {
  const [activeVersion, setActiveVersion] = useState<string>('v3');

  const selectedRecord = MOCK_TIMELINE.find(r => r.id === activeVersion)!;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Medical History - Meenakshi', 14, 22);
    
    doc.setFontSize(14);
    doc.text(`Version ${selectedRecord.version}`, 14, 32);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Date: ${format(new Date(selectedRecord.date), 'MMMM do yyyy, h:mm:ss a')}`, 14, 38);
    doc.text(`Provider: ${selectedRecord.provider}`, 14, 44);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Diagnoses:', 14, 56);
    
    doc.setFontSize(10);
    let yPos = 62;
    selectedRecord.diagnoses.forEach(d => {
      doc.text(`• ${d}`, 20, yPos);
      yPos += 6;
    });
    
    yPos += 4;
    doc.setFontSize(12);
    doc.text('Provider Notes:', 14, yPos);
    
    doc.setFontSize(10);
    yPos += 6;
    
    const splitNotes = doc.splitTextToSize(selectedRecord.notes, 180);
    doc.text(splitNotes, 14, yPos);
    
    if (selectedRecord.changeReason) {
      yPos += (splitNotes.length * 5) + 6;
      doc.setFontSize(12);
      doc.text('Change Reason:', 14, yPos);
      doc.setFontSize(10);
      yPos += 6;
      const splitReason = doc.splitTextToSize(selectedRecord.changeReason, 180);
      doc.text(splitReason, 14, yPos);
    }
    
    doc.save(`patient-record-v${selectedRecord.version}.pdf`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-6xl mx-auto h-[calc(100vh-2rem)] flex flex-col"
    >
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 flex items-center">
            Patient Medical History
            <span className="ml-3 px-3 py-1 bg-[#e0f2fe] text-[#0369a1] text-xs font-semibold rounded border border-[#0284c7]/20">
              Time-Travel Mode
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Displaying full immutable audit trail for Meenakshi (DOB: 1985-04-12)
          </p>
        </div>
      </div>

      <div className="flex flex-1 gap-8 min-h-0">
        {/* Timeline Sidebar */}
        <div className="w-80 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm overflow-y-auto">
          <h3 className="font-medium text-slate-800 mb-6 flex items-center text-sm">
            <History size={16} className="mr-2 text-[#0284c7]" /> Version History
          </h3>
          
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
            {MOCK_TIMELINE.map((node, i) => (
              <div key={node.id} className="relative pl-6">
                <button
                  onClick={() => setActiveVersion(node.id)}
                  className={`absolute -left-2.5 top-1 h-5 w-5 rounded-full border-4 border-white transition-colors ${
                    activeVersion === node.id ? 'bg-[#0284c7]' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
                
                <div 
                  className={`cursor-pointer transition-all ${
                    activeVersion === node.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setActiveVersion(node.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
                      Version {node.version}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {format(new Date(node.date), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  
                  <div className="mt-1.5 flex items-center text-sm font-medium text-slate-700">
                    <CircleUser size={14} className="mr-1.5 text-slate-400" />
                    {node.provider}
                  </div>

                  {node.changeReason && (
                    <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 flex items-start">
                      <ArrowLeftRight size={12} className="mr-1.5 mt-0.5 flex-shrink-0 text-slate-400" />
                      {node.changeReason}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Record Display Pane */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-0">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 rounded-t-2xl flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Clinical Notes - Version {selectedRecord.version}</h2>
              <p className="text-sm text-slate-500 flex items-center mt-1 font-mono">
                <Clock size={13} className="mr-1.5" />
                Saved: {format(new Date(selectedRecord.date), 'MMMM do yyyy, h:mm:ss a')}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={downloadPDF}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded bg-white hover:bg-slate-50 flex items-center"
              >
                <Download size={14} className="mr-1.5" />
                Download PDF
              </button>
              {selectedRecord.version !== MOCK_TIMELINE[0].version && (
                <button className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded bg-white hover:bg-slate-50">
                  Restore Version
                </button>
              )}
            </div>
          </div>

          <motion.div 
            key={selectedRecord.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 overflow-y-auto"
          >
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
                <FileText size={14} className="mr-2" />
                Diagnoses
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedRecord.diagnoses.map(d => (
                  <span key={d} className="px-3 py-1.5 bg-rose-50 text-rose-700 text-sm font-medium rounded-md border border-rose-100">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
                <FileText size={14} className="mr-2" />
                Provider Notes
              </h4>
              <div className="prose prose-slate prose-p:leading-relaxed max-w-none text-slate-700 bg-[#f0f9ff] p-6 rounded-xl border border-[#bae6fd]">
                <p>{selectedRecord.notes}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
