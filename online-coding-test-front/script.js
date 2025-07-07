document.getElementById('submitBtn').addEventListener('click', async () => {
    const lang = document.getElementById('language').value;
    const code = document.getElementById('code').value;
    const responseDiv = document.getElementById('response');

    if (!code.trim()) {
        responseDiv.textContent = 'Error: Code cannot be empty.';
        responseDiv.style.color = 'red';
        return;
    }

    responseDiv.textContent = 'Submitting code...';
    responseDiv.style.color = 'black';

    try {
        const response = await fetch('http://127.0.0.1:3000/exam/submit', { // API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lang, code }),
        });


        // 리턴 값 이슈
        if (response.ok) {
            const result = await response.json();
            responseDiv.textContent = 'Success! API Response:\n' + JSON.stringify(result, null, 2);
            responseDiv.style.color = 'green';
        } else {
            const errorText = await response.text();
            responseDiv.textContent = `Error: ${response.status} ${response.statusText}\n${errorText}`;
            responseDiv.style.color = 'red';
        }
    } catch (error) {
        console.log(error)
        responseDiv.textContent = 'Network Error: ' + error.message;
        responseDiv.style.color = 'red';
    }
});