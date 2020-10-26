const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexfile = require("./knexfile.js");
const env = process.env.NODE_ENV || "development";
const db = knex(knexfile[env]);

const server = express();

server.use(helmet());
server.use(express.json()); // to parse JSON from body

server.get("/usuarios", (req, res) => {
    db("usuarios")
        .then((usuarios) => {
            res.status(200).json({ data: usuarios });
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

server.get("/usuarios/:id", (req, res) => {
    db("usuarios")
        .where("id", "=", req.params.id)
        .first()
        .then((usuario) => {
            if (usuario) {
                res.status(200).json({ data: usuario });
            } else {
                res.status(404).json({ mensaje: "are you lost?" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

server.post("/usuarios", (req, res) => {
    // needs express.json() to read JSON from req.body
    const dataUsuario = req.body;

    // validas la data y luego
    db("usuarios")
        .insert(dataUsuario, "id")
        .then(([id]) => {
            db("usuarios")
                .where({ id })
                .then((usuario) => {
                    res.status(201).json({ data: usuario });
                });
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`api running on port ${PORT}`));
