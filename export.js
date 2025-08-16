// Fonction pour exporter en PDF
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let content = document.getElementById('form-container').innerText;
    doc.text(content, 10, 10);
    doc.save('document.pdf');
}

// Fonction pour exporter en Word
function exportWord() {
    let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                 "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                 "xmlns='http://www.w3.org/TR/REC-html40'>" +
                 "<head><meta charset='utf-8'><title>Export Word</title></head><body>";
    let footer = "</body></html>";
    let content = document.getElementById('form-container').innerHTML;
    let source = header + content + footer;
    let blob = new Blob(['\ufeff', source], { type: 'application/msword' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = 'document.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Fonction pour imprimer
function printDocument() {
    let content = document.getElementById('form-container').innerHTML;
    let newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write('<html><head><title>Impression</title></head><body>');
    newWindow.document.write(content);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
}
