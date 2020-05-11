const express = require("express")
// const bodyParser = require("body-parser")
const ejs = require("ejs")

const main = require("./routes/main")
const audios = require("./routes/audios")
const categories = require("./routes/categories")

const app = express()

// EJS template engine
app.set("view engine", "ejs")

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.raw())

// Static dir
app.use(express.static("./public"))

app.use("/", main)
app.use("/audios", audios)
app.use("/categories", categories)

const PORT = process.env.PORT || 5000

// Listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
