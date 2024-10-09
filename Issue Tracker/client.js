fetch('http://localhost:4000/data')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#dataTable tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        
                        <td>${item.Name}</td>
                        <td>${item.Email}</td>
                        <td>${item.Branch}</td>
                        <td>${item.Rollno}</td>
                    `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));