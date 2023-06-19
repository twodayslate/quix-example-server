const express = require('express')
const app = express()
const port = 3000

app.get('/v2/auth/temporary', (req, res) => {
    console.log("requesting temporary auth")
  res.json({
    "token": "not-needed"
  })
})

app.get('/v2/gifs/search', (req, res) => {
    console.log(`searching gif ${req.query.search_text}`)
    const gifs = [{
                "id": "mixkit-dynamic-animation-of-the-head-of-a-screaming-man-32645",
                "tags": ["design"],
                "width": 1080,
                "height": 1920,
                "duration": 10.0,
                "hasAudio": false,
                "urls": {
                    "sd": `${req.protocol}://${process.env["host"]}` + "/mixkit-dynamic-animation-of-the-head-of-a-screaming-man-32645-480p.mp4",
                    "hd":  `${req.protocol}://${process.env["host"]}` + "/mixkit-dynamic-animation-of-the-head-of-a-screaming-man-32645.mp4"
                }
            },
            {
                "id": "mixkit-siamese-cat-inside-a-hat-4103",
                "tags": ["cute"],
                "width": 1920,
                "height": 1080,
                "duration": 19.0,
                "hasAudio": false,
                "urls": {
                    "sd": `${req.protocol}://${process.env["host"]}` + "/mixkit-siamese-cat-inside-a-hat-4103-480p.mp4",
                    "hd":  `${req.protocol}://${process.env["host"]}` + "/mixkit-siamese-cat-inside-a-hat-4103.mp4"
                }
            },
            {
                "id": "mixkit-typing-on-a-laptop-242",
                "tags": ["technology"],
                "width": 1920,
                "height": 1080,
                "duration": 9.0,
                "hasAudio": false,
                "urls": {
                    "sd": `${req.protocol}://${process.env["host"]}` + "/mixkit-typing-on-a-laptop-242-480p.mp4",
                    "hd":  `${req.protocol}://${process.env["host"]}` + "/mixkit-typing-on-a-laptop-242.mp4"
                }
            },
            {
                "id": "mixkit-young-people-dancing-cheerfully-4614",
                "tags": ["funny"],
                "width": 1920,
                "height": 1080,
                "duration": 25.0,
                "hasAudio": false,
                "urls": {
                    "sd": `${req.protocol}://${process.env["host"]}` + "/mixkit-young-people-dancing-cheerfully-4614-480p.mp4",
                    "hd":  `${req.protocol}://${process.env["host"]}` + "/mixkit-young-people-dancing-cheerfully-4614.mp4"
                }
            },
            {
                "id": "mixkit-young-teacher-teaching-complicated-equations-4623",
                "tags": ["educational"],
                "width": 1920,
                "height": 1080,
                "duration": 15.0,
                "hasAudio": false,
                "urls": {
                    "sd": `${req.protocol}://${process.env["host"]}` + "/mixkit-young-teacher-teaching-complicated-equations-4623-480p.mp4",
                    "hd":  `${req.protocol}://${process.env["host"]}` + "/mixkit-young-teacher-teaching-complicated-equations-4623.mp4"
                }
            }]
    var filteredGifs = gifs.filter(gif => (req.query == undefined || req.query.search_text == undefined ||  req.query.search_text.length == 0 || gif.tags == req.query.search_text))
    res.json({
        "page": 1,
        "pages": 1,
        "total": filteredGifs.length,
        "gifs": filteredGifs
    })
})

app.get('/v2/search/trending', (req, res) => {
    console.log("requesting trending")
    res.json({
        "tags": [
            {"name": "cute"},
            {"name": "funny"}
        ]
    })
})

app.get('/v1/tags', (req, res) => {
    console.log("requesting tags")
    res.json({
        "tags": [
            {"name": "cute"},
            {"name": "design"},
            {"name": "educational"},
            {"name": "funny"},
            {"name": "technology"}
        ]
    })
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})