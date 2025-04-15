const csvFilePath = 'Harvest%20Songs.csv'; // Path to your CSV file
const dataContainer = document.getElementById('data-container');

fetch(csvFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text(); // Get the CSV data as text
  })
  .then(csvData => {
    // Parse the CSV data
    const lines = csvData.trim().split('\n');
    if (lines.length > 0) {
      const headers = lines[0].split(','); // Assuming comma-separated values
      const songData = lines.slice(1).map(line => {
        const values = line.split(',');
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header.trim()] = values[index] ? values[index].trim() : ''; // Handle potential empty values
        });
        return rowData;
      });

      // Create the HTML table
      let html = '<table><thead><tr>';
      headers.forEach(header => {
        html += `<th>${header.trim()}</th>`;
      });
      html += '</tr></thead><tbody>';

      songData.forEach(row => {
        html += '<tr>';
        headers.forEach(header => {
          html += `<td>${row[header.trim()]}</td>`;
        });
        html += '</tr>';
      });

      html += '</tbody></table>';
      dataContainer.innerHTML = html;
    } else {
      dataContainer.innerText = 'No data found in the CSV file.';
    }
  })
  .catch(error => {
    console.error('Error fetching or parsing CSV:', error);
    dataContainer.innerText = 'Failed to load data from CSV.';
  });
