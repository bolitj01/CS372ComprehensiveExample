const express = require('express');
const db = require('./db');

let app = express();
app.use(express.json());

app.use(express.static('public'));

app.get('/posts', (req, res) => {
 db.getAll()
        .then((items) => {
            res.status(200).json(items);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ err: err.message });
        });
});

app.post('/posts', (req, res) => {
    const postParams = req.body;
    db.create(postParams)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ err: err.message });
        });
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.getOne(id)
        .then((item) => {
            res.status(200).json(item);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ err: err.message });
        });
});

app.put('/posts/:id/like', (req, res) => {
    const { id } = req.params;
    db.like(id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ err: err.message })
        })
});

app.put('/posts/:id/dislike', (req, res) => {
    const { id } = req.params;
    db.like(id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ err: err.message });
        })
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.delete(id).then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ err: err.message });
    })
})

db.isReady.then(() => {
    app.listen(8080, () => {
        console.log("listening on port 8080");
    })
})