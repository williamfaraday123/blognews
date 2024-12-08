const initializeDB = async () => {
    const response = await fetch('/api/database/initializeDB', {
        method: 'POST'
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data.message);
    } else {
        console.error('Failed to initialize database');
    }
};

initializeDB();