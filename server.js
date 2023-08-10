const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const express = require('express');
const db = new split3.Database('./company.db');

app.use(express.json());

app.get('/departments', (req, res) => {
    db.all('SELECT id, name FROM departments', (err, departments) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(departments);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});