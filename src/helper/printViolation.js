// utils/printViolationTableData.js
import logo from '../assets/logo.png';

export const flattenViolationData = (data) => {
    return data.map(item => {
        const flatItem = {};

        // Format each field according to the UI
        flatItem['date'] = formatDate(item.createdAt);
        flatItem['violation'] = item.violation;
        flatItem['severity'] = item.severity;
        flatItem['current'] = item.current ? 'Yes' : 'No';

        return flatItem;
    });
};

// Helper function to format dates
const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
};

export const printViolationTableData = (violationData, studentData, documentType = "Violation Report") => {
    const flattenedData = flattenViolationData(violationData);

    // Define headers as shown in your UI
    const headers = ['Date', 'Violation', 'Severity', 'Current'];
    const printWindow = window.open('', '_blank');

    // Create table rows based on flattened data
    const tableRows = flattenedData.map(row => `
        <tr>
            <td>${row.date || ''}</td>
            <td>${row.violation || ''}</td>
            <td style="color: ${row.severity === 'MAJOR' ? 'orange' : row.severity === 'MINOR' ? 'yellow' : row.severity === 'SEVERE' ? 'red' : 'black'};">
                ${row.severity || ''}
            </td>
            <td>${row.current || ''}</td>
        </tr>
    `).join('');

    const printContent = `
        <html>
            <head>
                <title>Print Violation Table Data</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        background-color: #f9f9f9;
                    }
                    .header, .student-info {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .logo {
                        width: 100px;
                        height: auto;
                    }
                    h1 {
                        margin: 5px 0;
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                    }
                    h2, .student-info div {
                        margin: 5px 0;
                        font-size: 18px;
                        font-weight: normal;
                        color: #666;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background-color: #f1f1f1;
                        font-weight: bold;
                        color: #333;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    tr:nth-child(odd) {
                        background-color: white;
                    }
                    tr:hover {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <img src="${logo}" alt="Logo" class="logo" />
                    <h1>Scholarpass</h1>
                    <h2>${documentType}</h2>
                </div>
                <div class="student-info">
                    <div><strong>Name:</strong> ${studentData.name}</div>
                    <div><strong>Student Number:</strong> ${studentData.studentNumber}</div>
                    <div><strong>Section:</strong> ${studentData.section}</div>
                    <div><strong>Department:</strong> ${studentData.department}</div>
                    <div><strong>Email:</strong> ${studentData.email}</div>
                </div>
                <table>
                    <thead>
                        <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </body>
        </html>
    `;

    // Write the HTML content to the new window
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
    };
};

export default printViolationTableData;
