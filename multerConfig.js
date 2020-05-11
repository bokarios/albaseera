const multer = require("multer")
const path = require("path")

// Set storage engine
const storage = multer.diskStorage({
	destination: "./public/audios",
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	},
})

// Init upload
const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
}).single("myAudio")

// Check file type
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /mp3|mpeg|wav/
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	// Check mimetype
	const mimetype = filetypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb("Not support file type")
	}
}

module.exports = { storage, upload }
