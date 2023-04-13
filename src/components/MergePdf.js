import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { data } from '../pdf/base64data'
// import pdfa from '../pdf/sample-a.pdf';
// import pdfb from '../pdf/sample-b.pdf';
// import fs from 'fs';


function MergePdf() {
    const [mergedPdf, setMergedPdf] = useState();
    const [pdfFileData, setPdfFileData] = useState();
    const renderPdf = (uint8array) => {
    const tempblob = new Blob([uint8array], {
        type: "application/pdf",
    });
    const docUrl = URL.createObjectURL(tempblob);
    setPdfFileData(docUrl);
    window.open(docUrl);
    }
    const mergePdf = async () => {

        const url1 = 'http://127.0.0.1:8007/upload/inspections/15/pdfs/report.pdf'
        const arrayBuffer1 = await fetch(url1).then(res => res.arrayBuffer())
        const pdfDoc1 = await PDFDocument.load(arrayBuffer1)

        // const url = 'http://127.0.0.1:8007/upload/inspections/15/pdfs/extracted.pdf'
        // const arrayBuffer2 = await fetch(url).then(res => res.arrayBuffer())
        const pdfDoc2 = await PDFDocument.load(data)

        const mergedPdf = await PDFDocument.create();

        // const pdfA = await PDFDocument.load(pdfa);
        // const pdfB = await PDFDocument.load(pdfb);
        const selectedPage=0;
        const copiedPagesA = await mergedPdf.copyPages(pdfDoc1, pdfDoc1.getPageIndices());
        copiedPagesA.forEach((page, pageIndex) => {
            if(pageIndex === selectedPage) {
                mergedPdf.addPage(page);
            }
        });

        const copiedPagesB = await mergedPdf.copyPages(pdfDoc2, pdfDoc2.getPageIndices());
        copiedPagesB.forEach((page) => mergedPdf.addPage(page));

        const mergedPdfFile = await mergedPdf.save();
        console.log(mergedPdfFile);
        if(mergedPdfFile) {
            setMergedPdf(mergedPdfFile);
        }
    }
    useEffect(()=>{
        if(mergedPdf) {
            renderPdf(mergedPdf)
        }
        
    }, [mergedPdf])

    return (
        <>
            <h1>Split and Merge Pdf</h1>
            <button onClick={mergePdf}>Merge Sample Pdf</button>
            {
                pdfFileData && mergedPdf &&
                <iframe
                    style={{ display: "block", width: "100vw", height: "90vh" }}
                    title="PdfFrame"
                    src={pdfFileData}
                    frameBorder="0"
                    type="application/pdf"
                    >
                </iframe>
            }
        </>
    )
}

export default MergePdf;