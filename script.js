document.getElementById('universityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const countryInput = document.getElementById('country').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch(`http://universities.hipolabs.com/search?country=${countryInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(university => {
                    resultDiv.innerHTML += `
                        <div class="university-info mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <h2 class="card-title">${university.name}</h2>
                                </div>
                                <div class="card-body">
                                    <p><strong>Country:</strong> ${university.country}</p>
                                    ${university['state-province'] ? `<p><strong>State/Province:</strong> ${university['state-province']}</p>` : ''}
                                    <p><strong>Web Pages:</strong> ${university.web_pages.map(page => `<a href="${page}" target="_blank" class="badge badge-primary">${page}</a>`).join(' ')}</p>
                                    <p><strong>Domains:</strong> ${university.domains.map(domain => `<span class="badge badge-secondary">${domain}</span>`).join(' ')}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                resultDiv.innerHTML = `<div class="alert alert-danger">No university found for the country "${countryInput}"</div>`;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<div class="alert alert-danger">An error occurred: ${error.message}</div>`;
        });
});
