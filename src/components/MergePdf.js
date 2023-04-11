import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import pdfa from '../pdf/sample-a.pdf';
import pdfb from '../pdf/sample-b.pdf';


function MergePdf() {

    const mergePdf = async () => {
        const mergedPdf = await PDFDocument.create();

        const pdfA = await PDFDocument.load(pdfa);
        const pdfB = await PDFDocument.load(pdfb);

        const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
        copiedPagesA.forEach((page) => mergedPdf.addPage(page));

        const copiedPagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());
        copiedPagesB.forEach((page) => mergedPdf.addPage(page));

        const mergedPdfFile = await mergedPdf.save();
    }

    // For example, `pdfBytes` can be:
    //   • Written to a file in Node
    //   • Downloaded from the browser
    //   • Rendered in an <iframe>

    return (
        <>
            <h1>Split and Merge Pdf</h1>
            <button onClick={mergePdf}>Merge Sample Pdf</button>
        </>
    )
}

export default MergePdf;