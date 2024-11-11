// utils/printStudentTableData.js
import logo from '../assets/logo.png';

export const flattenData = (data) => {
    return data.map(item => {
        const flatItem = {};

        // Format each field according to the UI
        flatItem['logDate'] = formatValue(item.timeIn, 'logDate');
        flatItem['timeIn'] = formatValue(item.timeIn, 'timeIn');
        flatItem['timeOut'] = item.timeOut ? formatValue(item.timeOut, 'timeOut') : '';
        flatItem['vehicle'] = item.vehicle ? item.vehicle.model : 'Walk-in';

        return flatItem;
    });
};

// Helper function to format values, especially dates
const formatValue = (value, field) => {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
        if (field === 'timeIn' || field === 'timeOut') {
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        }
        if (field === 'logDate') {
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    }
    return value;
};

export const printStudentTableData = (tableData, studentData, documentType = "Student Report") => {
    const flattenedData = flattenData(tableData);

    // Define headers as shown in your UI
    const headers = ['Date', 'Time-in', 'Time-out', 'Mode'];
    const printWindow = window.open('', '_blank');

    // Create table rows based on flattened data
    const tableRows = flattenedData.map(row => `
        <tr>
            <td>${row.logDate || ''}</td>
            <td>${row.timeIn || ''}</td>
            <td>${row.timeOut || ''}</td>
            <td>${row.vehicle || 'Walk-in'}</td>
        </tr>
    `).join('');

    const printContent = `
        <html>
            <head>
                <title>Print Student Table Data</title>
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

export default printStudentTableData;
