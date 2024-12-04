import logo from '../assets/logo.png';

export const flattenData = (data) => {
    return data.map(item => {
        const flatItem = {
            'name': item.name || '',
            'address': item.address || '',
            'agency': item.agency || '',
            'number': item.number || '',
            'personToVisit': item.personToVisit || '',
            'purpose': item.purpose || '',
            'timeIn': formatValue(item.timeIn),
            'timeOut': item.timeOut ? formatValue(item.timeOut) : '',
            'guard': item.guard || '',
        };
        return flatItem;
    });
};

// Helper function to format date values
const formatValue = (value) => {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
        return date.toLocaleString(); // Convert to a readable date-time format
    }
    return value || '';
};

export const capitalizeHeaders = (headers) => {
    return headers.map(header =>
        header
            .split('.')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ')
    );
};

export const printTableData = (data, documentType = "Visitor Report") => {
    console.log(data);
    const flattenedData = flattenData(data);

    // Get all unique headers from the dataset
    const headers = Object.keys(flattenedData[0] || {});

    // Capitalize and format headers
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
                    p {
                        margin-top: 3em;
                        font-size: 14px;
                        color: #666;
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
                <p>Reported By: ___________________<p>
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
