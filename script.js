const sheetId = '1XcbV2YsbjketYuOLoI_QLspyYToqX72l9Xm-g6tBFMA'; // Replace with your actual Sheet ID
// Shareable link: https://docs.google.com/spreadsheets/d/1XcbV2YsbjketYuOLoI_QLspyYToqX72l9Xm-g6tBFMA/edit?usp=sharing
const apiKey = null; // You might need an API key for more complex scenarios, but not for basic public sharing
const sheetName = 'Harvest Songs'; // Replace with the name of your sheet if it's not 'Sheet1'
const dataContainer = document.getElementById('data-container');

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:K`;
// Note: A1:I assumes your data starts in the first row and goes up to column I. Adjust if needed.

fetch(url)
  .then(response => response.json())
  .then(data => {
    const values = data.values;
    if (values && values.length > 0) {
      // Assuming the first row contains headers
      const headers = values[0];
      const songData = values.slice(1); // Get data rows

      let html = '<table><thead><tr>';
      headers.forEach(header => {
        html += `<th>${header}</th>`;
      });
      html += '</tr></thead><tbody>';

      songData.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
          html += `<td>${cell}</td>`;
        });
        html += '</tr>';
      });

      html += '</tbody></table>';
      dataContainer.innerHTML = html;
    } else {
      dataContainer.innerText = 'No data found in the sheet.';
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    dataContainer.innerText = 'Failed to load data.';
  });
