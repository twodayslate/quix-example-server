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

function allGifs(req) {
    return [{
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
        "duration": 11.0,
        "hasAudio": false,
        "urls": {
            "sd": `${req.protocol}://${process.env["host"]}` + "/mixkit-young-teacher-teaching-complicated-equations-4623-480p.mp4",
            "hd":  `${req.protocol}://${process.env["host"]}` + "/mixkit-young-teacher-teaching-complicated-equations-4623.mp4"
        }
    },
    {
        "id": "mixkit-dog-catches-a-ball-in-a-river-1494-hd-ready",
        "tags": [],
        "niches": ["animals"],
        "width": 1920,
        "height": 1080,
        "duration": 15.0,
        "hasAudio": false,
        "urls": {
            "sd": `${req.protocol}://${process.env["host"]}` + "/mixkit-dog-catches-a-ball-in-a-river-1494-hd-ready-480p.mp4",
            "hd":  `${req.protocol}://${process.env["host"]}` + "/mixkit-dog-catches-a-ball-in-a-river-1494-hd-ready.mp4"
        }
    },
    {
        "id": "broken",
        "tags": [],
        "niches": ["test-category"],
        "width": 1920,
        "height": 1080,
        "duration": 15.0,
        "hasAudio": false,
        "urls": {
            "sd": `${req.protocol}://${process.env["host"]}` + "/broken.mp4",
            "hd":  `${req.protocol}://${process.env["host"]}` + "/broken-hd.mp4"
        }
    },
]
}

function niches(req) {
    const gifs = allGifs(req); // Get all GIFs
    var nichesList = [
          {
            "id": "test-category",
            "name": "Test Category",
            "thumbnail": `${req.protocol}://${process.env["host"]}` + "/thumbnails/test.jpg",
          },
          {
            "id": "animals",
            "name": "Animals",
            "thumbnail": `${req.protocol}://${process.env["host"]}` + "/thumbnails/animals.jpg",
          }
        ]
      

      // Add a count for each niche
    nichesList.forEach(niche => {
        niche.gifs = gifs.filter(gif => gif.niches && gif.niches.includes(niche.id)).length;
    });

    return nichesList;
}

app.get('/v2/home/feeds', (req, res) => {
    console.log("getting home feed")
    res.json({
        "horizontalGifs": [],
        "hotGifs": allGifs(req),
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
    const gifs =allGifs(req);
    var filteredGifs = gifs.filter(
        gif => 
            gif.tags && gif.tags.length > 0 && 
            (req.query == undefined || req.query.search_text == undefined ||  req.query.search_text.length == 0 || gif.tags == req.query.search_text)
    )
    
    var total = filteredGifs.length
    var max_page_length = 3
    var pages = Math.ceil(total/max_page_length)
    console.log("total videos", total, "requested page", req.params.page)

    // Parse and validate the page parameter
    let page = parseInt(req.query.page) || 1;
    if (page < 1) page = 1;
    if (page > pages) page = pages;

    const start = (page - 1) * max_page_length;
    const end = start + max_page_length;
    console.log("slice", start, end)
    filteredGifs = filteredGifs.slice(start, end)
    console.log("page", page, "pages", pages)

    // Check for the "order" query parameter
    if (req.query.order === "oldest") {
        filteredGifs.reverse(); // Reverse the array if the order is "oldest"
    }

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

app.get('/v2/niches', (req, res) => {
    console.log("requesting niches")

    const allNiches = niches(req);
    var filteredNiches = allNiches;

    var total = filteredNiches.length
    var max_page_length = 1
    var pages = Math.ceil(total/max_page_length)
    console.log("total videos", total, "requested page", req.params.page)

    // Parse and validate the page parameter
    let page = parseInt(req.query.page) || 1;
    if (page < 1) page = 1;
    if (page > pages) page = pages;

    const start = (page - 1) * max_page_length;
    const end = start + max_page_length;
    console.log("slice", start, end)
    filteredNiches = filteredNiches.slice(start, end)
    console.log("page", page, "pages", pages)

    res.json({
        "niches": filteredNiches,
        "page": page,
        "pages": pages,
        "total": allNiches.length
    })
})

app.get('/v2/niches/trending', (req, res) => {
    console.log("requesting trending niches")

    var filteredNiches = [niches(req)[1]];

    res.json({
        "niches": filteredNiches
    })
})

app.get('/v2/niches/:id/gifs', (req, res) => {
    var filteredGifs = allGifs(req).filter(
        gif => (gif.niches == req.params.id)
    )

    res.json({
        "page": 1,
        "pages": 1,
        "total": filteredGifs.length,
        "gifs": filteredGifs
    })

});


app.use(express.static('public'))
app.enable('trust proxy');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})