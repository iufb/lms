
import { splitTextByWords } from "@/shared/lib/utils";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, PDFFont, PDFImage, PDFPage, rgb } from "pdf-lib";
import QrCode from "qrcode";

export const useCert = ({ mode }: { mode: 'save' | 'render' }) => {
    function formatDateWithAddedYear(dateStr: string, add?: boolean) {
        // Create a Date object from the given string
        const date = new Date(dateStr);
        // Add one year
        if (add)
            date.setFullYear(date.getFullYear() + 1);

        // Extract the components
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed, so add 1
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Format the date as dd-mm-yyyy hh:mm
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }
    const fillPage = async (page: PDFPage, font: PDFFont, data: any, lang: string, qr: PDFImage) => {
        const { width, height } = page.getSize()

        const { date, id, percentage, atempts, courseRu, courseKz, name, place, position, rightCount, phone } = data
        //qr
        page.drawImage(qr, {
            x: 50,
            y: width / 2 + 310,
            width: 120,
            height: 120
        })

        //get date
        page.drawText(formatDateWithAddedYear(date), {
            x: width / 2 + 52,
            y: height / 2 + 300,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //cert id
        page.drawText(id, {
            x: width / 2 + 45,
            y: height / 2 + 272,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //end date
        page.drawText(formatDateWithAddedYear(date, true), {
            x: width / 2 + 38,
            y: height / 2 + 245,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //mark
        page.drawText(percentage, {
            x: width / 2 + 42,
            y: height / 2 + 215,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //attempts
        page.drawText(atempts, {
            x: lang == 'kz' ? width / 2 + 105 : width / 2 + 90,
            y: height / 2 + 188,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //course
        const titleArray = lang == 'ru' ? splitTextByWords(courseRu) : splitTextByWords(courseKz)
        titleArray.forEach((line, i) => {
            page.drawText(line, {
                x: width / 4 - 55,
                y: (height / 2 + 148) - i * 14,
                size: 10,
                font: font,
                color: rgb(0, 0, 0),
            })

        })
        //name
        page.drawText(name, {
            x: width / 4 + 10,
            y: height / 2 + 50,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //place

        page.drawText(place, {
            x: width / 4 + 16,
            y: height / 2 + 24,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //position

        page.drawText(position, {
            x: width / 4,
            y: height / 2 - 5,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //percentage
        page.drawText(percentage, {
            x: width / 4,
            y: height / 2 - 32,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //right count
        page.drawText(rightCount, {
            x: lang == 'kz' ? width / 2 + 90 : width / 2 + 105,
            y: height / 2 - 32,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

        //phone
        page.drawText(phone, {
            x: width / 4 + 48,
            y: height / 2 - 172,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
        })

    }
    const save = (data: Uint8Array<ArrayBufferLike>
    ) => {
        // Create a Blob from the Uint8Array (pdfBytes)
        const blob = new Blob([data], { type: 'application/pdf' });

        // Create a download link and trigger a click to download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'modified-cert.pdf'; // Specify the name of the file
        link.click();

        // Clean up the URL object after the download
        URL.revokeObjectURL(link.href);

    }
    const render = (data: Uint8Array<ArrayBufferLike>) => {
        const blob = new Blob([data], { type: "application/pdf" });
        const docUrl = URL.createObjectURL(blob);
        return docUrl
    }

    async function getCert(data: any): Promise<string> {
        const url = '/cert.pdf'
        const fontUrl = '/DejaVuSans.ttf'
        const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer())
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        pdfDoc.registerFontkit(fontkit)
        const helveticaFont = await pdfDoc.embedFont(fontBytes)
        const pages = pdfDoc.getPages()
        let qrImage = '';
        QrCode.toDataURL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}cert/${data.id}`, function (err, url) {
            if (err) {
                console.error("Error generating QR code:", err);
                return;
            }
            qrImage = url;
        });
        const imageBytes = await fetch(qrImage).then((r) => r.arrayBuffer())
        const qrEmbed = await pdfDoc.embedPng(imageBytes)

        fillPage(pages[0], helveticaFont, data, 'kz', qrEmbed)
        fillPage(pages[1], helveticaFont, data, 'ru', qrEmbed)
        const pdfBytes = await pdfDoc.save()
        if (mode == 'save') {
            save(pdfBytes)
            return ''
        } else {
            const url = render(pdfBytes)
            return url
        }
    }
    return { getCert }
}
