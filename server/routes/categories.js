const express = require("express")
const db = require("../../models")
const router = express.Router()

router.get("/", (req, res) => {
	db.category.findAll({}).then((categories) => {
		res.status(200).json({ data: categories, status: true })
	})
})

module.exports = router
