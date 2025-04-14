import { FinalTestResultsList200Item, useCourseRead, useUserList } from "@/shared/api/generated";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import fontkit from '@pdf-lib/fontkit';
import { useTranslations } from "next-intl";
import { PDFDocument, PDFFont, PDFPage, rgb } from 'pdf-lib';
const cert = {
    "user": 1,
    "course": 1,
    "issued_at": "2024-12-15T10:30:00Z"
}

const mockData = [
    {
        date: "2024-12-15T10:30:00Z",
        id: "user-001",
        percentage: "85",
        atempts: "2",
        course: "JavaScript Basics",
        name: "Alice Johnson",
        place: "New York",
        position: "Student",
        rightCount: "17",
        phone: "+1-555-1234"
    },
    {
        date: "2025-01-20T14:45:00Z",
        id: "user-002",
        percentage: "92",
        atempts: "1",
        course: "Advanced React",
        name: "Bob Smith",
        place: "San Francisco",
        position: "Developer",
        rightCount: "23",
        phone: "+1-555-5678"
    }
];
;
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
interface GetCertButtonProps {
    courseId: number
    results: FinalTestResultsList200Item[]
}
const fillPage = (page: PDFPage, font: PDFFont, data: any, lang: string) => {
    const { width, height } = page.getSize()
    const { date, id, percentage, atempts, courseRu, courseKz, name, place, position, rightCount, phone } = data

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

    //atempts
    page.drawText(atempts, {
        x: width / 2 + 105,
        y: height / 2 + 188,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
    })

    //course
    page.drawText(lang == 'ru' ? courseRu : courseKz, {
        x: width / 4 - 55,
        y: height / 2 + 148,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
    })

    //name
    page.drawText(name, {
        x: width / 4 + 10,
        y: height / 2 + 92,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
    })

    //place

    page.drawText(place, {
        x: width / 4 + 16,
        y: height / 2 + 64,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
    })

    //position

    page.drawText(position, {
        x: width / 4,
        y: height / 2 + 36,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
    })

    //percentage
    page.drawText(percentage, {
        x: width / 4,
        y: height / 2 + 8,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
    })

    //right count
    page.drawText(rightCount, {
        x: width / 2 + 90,
        y: height / 2 + 8,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
    })

    //phone
    page.drawText(phone, {
        x: width / 4 + 48,
        y: height / 2 - 132,
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

async function modifyPdf(data: any) {
    const url = '/cert.pdf'
    const fontUrl = '/DejaVuSans.ttf'
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer())
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    pdfDoc.registerFontkit(fontkit)
    const helveticaFont = await pdfDoc.embedFont(fontBytes)
    const pages = pdfDoc.getPages()
    fillPage(pages[0], helveticaFont, data, 'kz')
    fillPage(pages[1], helveticaFont, data, 'ru')
    const pdfBytes = await pdfDoc.save()
    save(pdfBytes)
}
export const GetCertButton = ({ courseId, results }: GetCertButtonProps) => {
    const t = useTranslations('cert')
    const bestResult = (results.sort((a, b) => {
        if (!a.score || !b.score) return 1
        return a.score - b.score
    }))[0]
    const userId = bestResult?.user

    if (!userId) return <div>no user id</div>;

    const { data: course, } = useCourseRead(courseId)
    const { data: user } = useUserList({ user_id: userId })
    if (!course || !user) return <Skeleton className="w-full h-10 rounded-lg" />
    const data = {
        // @ts-ignore
        date: cert.issued_at, id: '1', percentage: `${bestResult.score * 100 / Object.keys(bestResult.answer ?? {}).length}`, atempts: `${results.length}`, courseRu: course.title_ru, courseKz: course.title_kz, name: user.full_name, place: user.workplace, position: user.position, rightCount: `${bestResult.score}`, phone: '+77751231212'
    }
    return <Button onClick={() => modifyPdf(data)}>{t('getCert')}</Button>
}
