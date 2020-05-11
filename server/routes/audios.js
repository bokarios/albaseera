const express = require("express")
const multerConfig = require("../../multerConfig")

const db = require("../../models")

const router = express.Router()

router.get("/", (req, res) => {
	db.audio.findAll({}).then((audios) => {
		res.status(200).json({ data: audios })
	})
})

router.get("/:id", (req, res) => {
	db.audio.findAll({ where: { category_id: req.params.id } }).then((audios) => {
		if (audios.length > 0) {
			res.status(200).json({ data: audios, status: true })
		} else {
			res.status(404).json({ message: "No matching audios", status: false })
		}
	})
})

router.post("/", (req, res) => {
	multerConfig.upload(req, res, (err) => {
		if (err) {
			res.render("upload", {
				title: "Upload Error",
				msg: err,
			})
		} else {
			if (req.body.category == undefined || req.file == undefined) {
				res.render("upload", {
					title: "Upload Error",
					msg: "All fields are required",
				})
			} else {
				const category = req.body.category

				db.audio
					.create({
						title: req.file.filename,
						path: req.file.path.replace("public\\", ""),
						category_id: category,
					})
					.then((audio) => {
						if (audio) {
							res.render("upload", {
								title: "Upload success",
								msg: "Uploaded successfully",
							})
						} else {
							console.log(req.file)

							res.render("upload", {
								title: "Upload Error",
								msg: "Faild to upload",
							})
						}
					})
					.catch((error) => {
						if (error == "SequelizeUniqueConstraintError: Validation error") {
							res.render("upload", {
								title: "Upload Error",
								msg: "Audio already exist",
							})
						}
					})
			}
		}
	})
})

module.exports = router
