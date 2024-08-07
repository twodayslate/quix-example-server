const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.json({
        "server": `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        "github": "https://github.com/twodayslate/quix-example-server",
        "message": "Thank you for trying the example server. Please contact support if you need any help!"
    })
})

app.get('/v2/auth/temporary', (req, res) => {
    console.log("requesting temporary auth")
  res.json({
    "token": "not-needed"
  })
})

app.get('/v2/home/feeds', (req, res) => {
    console.log("getting home feed")
    res.json({
        "horizontalGifs": [],
        "hotGifs": [
            {
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
            }
        ],
        "hotImages": [],
        "longGifs": [],
        "soundGifs": [],
        "verifiedGifs": [],
        "verifiedImages": [],
        "verticalGifs": []
    })
})

app.get('/watch/:id', (req, res) => {
    console.log(req.params.id)
    let id = req.params.id;
res.send("<h2>Watch</h2><video controls><source src=\"" + `${req.protocol}://${process.env["host"]}/${id}` + ".mp4\" type=\"video/mp4\"></video>")
});

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
    var filteredGifs = gifs.filter(
        gif => (req.query == undefined || req.query.search_text == undefined ||  req.query.search_text.length == 0 || gif.tags == req.query.search_text)
    )
    
    var page = 1
    var total = filteredGifs.length
    var max_page_length = 3
    var pages = Math.ceil(total/max_page_length)
    console.log("total videos", total, "requested page", req.params.page)
    if (req.query.page != null) {
        page = parseInt(req.query.page)
    }
    const start = (page-1) * max_page_length
    const end = max_page_length * page
    console.log("slice", start, end)
    filteredGifs = filteredGifs.slice(start, end)
    console.log("page", page, "pages", pages)
    res.json({
        "page": page,
        "pages": pages,
        "total": total,
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
app.enable('trust proxy');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})