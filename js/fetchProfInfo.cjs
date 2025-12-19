const fs = require('fs');
const path = require('path');
const { PDFExtract } = require('pdf.js-extract');

const pdfExtract = new PDFExtract();
const PDF_FILE = path.join(__dirname, '../Profile.pdf');
const DATA_DIR = path.join(__dirname, '../json');

async function parseCV() {
    try {
        if (!fs.existsSync(PDF_FILE)) return console.error("PDF not found");

        const data = await pdfExtract.extract(PDF_FILE, {});
        
        const allText = data.pages
            .map(page => page.content.map(item => item.str).join('\n'))
            .join('\n')
            .replace(/Page \d+ of \d+/g, '');

        const experienceSection = allText.match(/Experience\n([\s\S]*?)(?=Education|$)/i)?.[1] || "";
        const jobs = parseJobs(experienceSection);

        const educationSection = allText.match(/Education\n([\s\S]*?)(?=Page|$)/i)?.[1] || "";
        const education = parseEducation(educationSection);

        const certSection = allText.match(/Certifications\n([\s\S]*?)(?=Cecilia Belon|$)/i)?.[1] || "";
        const certifications = certSection.split('\n').map(c => c.trim()).filter(c => c.length > 5);

        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
        fs.writeFileSync(path.join(DATA_DIR, 'jobs.json'), JSON.stringify(jobs, null, 2));
        fs.writeFileSync(path.join(DATA_DIR, 'education.json'), JSON.stringify(education, null, 2));
        fs.writeFileSync(path.join(DATA_DIR, 'certifications.json'), JSON.stringify(certifications, null, 2));

        console.log('✅ JSON files generated in /json folder');
    } catch (error) {
        console.error("Error:", error);
    }
}

function parseJobs(text) {
    const jobs = [];
    const companies = ["Institución Financiera", "Universidad", "Tata Consultancy Services", "Plan Ceibal"];
    
    let currentText = text;
    for (let i = 0; i < companies.length; i++) {
        const start = companies[i];
        const next = companies[i + 1] || "$";
        const regex = new RegExp(`${start}\\n([\\s\\S]*?)(?=${next}|$)`, 'i');
        const match = currentText.match(regex);

        if (match) {
            const lines = match[1].trim().split('\n').map(l => l.trim());
            jobs.push({
                company: start, 
                role: lines[0], 
                period: lines[1], 
                location: lines[2], 
                description: lines.slice(3).join(' ')
            });
        }
    }
    return jobs;
}

function parseEducation(text) {
    const eduList = [];
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    // Logic: Line 1 is Institute, Line 2 is Degree + Date [cite: 68-71]
    for (let i = 0; i < lines.length; i += 2) {
        if (lines[i] && lines[i+1]) {
            eduList.push({
                institute: lines[i].trim(),
                degreeAndDate: lines[i+1].trim()
            });
        }
    }
    return eduList;
}

parseCV();