import path from 'path'
import express from 'express'
import multer from 'multer'
// Cloudinary does NOT support ES6 module, so use this way to make it work
import cloudinaryES6 from 'cloudinary'
const cloudinary = cloudinaryES6.v2
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const router = express.Router()

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Images_Proshop', // enter your preferred folder name
        allowed_formats: ['jpeg', 'png', 'jpg'],
    },
})

const upload = multer({ storage })

router.post('/', upload.single('image'), (req, res) => {
    const uploadImageURL = req.file.path // if use upload.array, use req.files instead
    res.send(uploadImageURL)
})

// diskStorage Solution:
// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename(req, file, cb) {
//         cb(
//             null,
//             `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
//         )
//     },
// })

// function checkFileType(file, cb) {
//     const filetypes = /jpg|jpeg|png/
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype)

//     if (extname && mimetype) {
//         return cb(null, true)
//     } else {
//         cb('Images only!')
//     }
// }

// const upload = multer({
//     storage,
//     fileFilter: function(req, file, cb) {
//         checkFileType(file, cb)
//     },
// })

// // router.post('/', upload.single('image'), (req, res) => {
// //     res.send(`/${req.file.path}`)
// // })
// // Fix to have a path looking not strange:
// router.post('/', upload.single('image'), (req, res) => {
//     res.send(`/${req.file.path.replace(/\\/g, '/')}`)
// })

export default router