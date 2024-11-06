// utils/printTableData.js
import logo from '../assets/logo.png';

export const flattenData = (data) => {
    return data.map(item => {
        const flatItem = {};
        for (const key in item) {
            // Exclude _id, __v, and any key that ends with Id, ID, or id
            if (key === '_id' || key === '__v' || (key !== 'studentID' && key.match(/id$/i))) continue;

            if (key === 'studentID' && typeof item[key] === 'object' && item[key] !== null) {
                // If studentID is an object, add studentNumber and name fields
                flatItem['studentID.studentNumber'] = item[key].studentNumber;
                flatItem['studentID.name'] = item[key].name;
            } else if (typeof item[key] === 'object' && item[key] !== null) {
                // Flatten nested objects
                for (const subKey in item[key]) {
                    flatItem[`${key}.${subKey}`] = formatValue(item[key][subKey]);
                }
            } else {
                flatItem[key] = formatValue(item[key]);
            }
        }
        return flatItem;
    });
};

// Helper function to format values, especially dates
const formatValue = (value) => {
    // Check if the value is a valid date
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
        return date.toLocaleString(); // Convert to readable date-time format
    }
    return value;
};

export const capitalizeHeaders = (headers) => {
    return headers.map(header => header.charAt(0).toUpperCase() + header.slice(1).replace(/\./g, ' ')); // Capitalize and format
};

export const printTableData = (data, documentType = "Visitor Report") => {
    const flattenedData = flattenData(data);

    // Get headers from the first item in the flattened data
    const headers = Object.keys(flattenedData[0] || {});
    const capitalizedHeaders = capitalizeHeaders(headers);

    // Create a new window for printing
    const printWindow = window.open('', '_blank');

    // Create table headers dynamically
    const tableHeaders = capitalizedHeaders.map(header => `<th>${header}</th>`).join('');

    // Create table rows based on flattened data dynamically
    const tableRows = flattenedData.map(row => {
        const cells = headers.map(header => `<td>${row[header] || ''}</td>`).join('');
        return `<tr>${cells}</tr>`;
    }).join('');

    const printContent = `
        <html>
            <head>
                <title>Print Table Data</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        background-color: #f9f9f9;
                    }
                    .header {
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
                    h2 {
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
                <table>
                    <thead>
                        <tr>${tableHeaders}</tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
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

export default printTableData;
