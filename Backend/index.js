const express = require("express");
const fs = require("fs")
const cors = require("cors");
const multer = require("multer");
const { readJson, writeJson } = require("./fsUtils")

const app = express();

app.use(cors());
app.use(express.static("public"))
app.use(express.json())

//Different File Pathes
const dataPath = "./data.json"

// typical get data request

app.get("/api/data", (_, res) => {
    readJson(dataPath).then(data => res.json({ success: true, result: data })).catch(err => res.json({ success: false, error: err }))
})
//request Logger
app.use((req, _, next) => {
    console.log("new REQUEST", req.url, req.method, req.body)
    next()
});

// initiate Storage for Post Images
const storagePosts = multer.diskStorage({
    destination: "./public/postImg",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});


const uploadPostImg = multer({ storage: storagePosts });

app.post("/api/posts/uploadimg", uploadPostImg.single("postImg"), (req, res, next) => {
    const newPost = {
        id: Date.now(),
        title: req.body.postTitle,
        content: req.body.postContent,
        img: req.file.path.replace("public/", "")
    }

    readJson(dataPath).then(data => writeJson(dataPath, [...data, newPost])).then(data => res.json({ success: true, result: data })).catch(err => res.json({ success: false, error: err }))

})



//Delete Post

app.delete("/api/data/:postId/delete", (req, res) => {
    const postId = req.params.postId;
    fs.unlink
    readJson(dataPath).then(data => {
        const newData = data.filter(post => post.id.toString() !== postId)
        const file = data.find(post => post.id.toString() === postId)
        const path = "./public/" + file.img
        fs.unlink(path, (err) => console.log(err))
        return newData
    }).then(data => writeJson(dataPath, data)).then(data => res.json({ success: true, result: data })).catch(err => res.json({ success: false, error: err }))

})

// 404 Not found handler
app.use((_, res) => {
    res.json({ success: false, error: "Page not found" })
});

// Starting Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("APP RUNNING at port " + PORT));
