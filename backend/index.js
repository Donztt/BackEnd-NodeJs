const express = require('express');
const app= express();
const routes = require("./routes/router");
const cors = require('cors')

const PORT = 3000

const conn = require("./db/conn");

app.use(cors())
app.use(express.json()); 

conn()

app.use("/api", routes)

app.listen(PORT, () => {
    console.log("Running on port: "+ PORT);
})
