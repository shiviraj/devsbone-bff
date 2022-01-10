const multer = require('multer')
const cloudinary = require('cloudinary').v2

const MediaService = {
  validate() {
    return multer({
      limits: { fileSize: 2000000 },
      fileFilter(req, file, cb) {
        if (!file.mimetype.match(/image\/(jpg|jpeg|png)$/)) {
          cb(new Error('unprocessableEntity'))
        }
        cb(null, true)
      }
    })
      .single('image')
  },
  upload(id, file) {
    const imageOptions = { tags: id, folder: 'blog' }
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(imageOptions, (err, res) => res ? resolve(res) : reject(err))
      stream.write(file.buffer)
      stream.end()
    })
  }
}

module.exports = MediaService
