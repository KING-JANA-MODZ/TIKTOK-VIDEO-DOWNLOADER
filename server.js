const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("TikTok Downloader Server Running ✅");
});

app.post("/download", async (req, res) => {

    const { url } = req.body;

    if(!url){
        return res.json({ status:false });
    }

    try {

        const response = await axios.get(
            "https://tikwm.com/api/?url=" + encodeURIComponent(url)
        );

        if(response.data.code !== 0){
            return res.json({ status:false });
        }

        res.json({
            status:true,
            video: response.data.data.play,
            title: response.data.data.title
        });

    } catch(e) {
        res.json({ status:false });
    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running...");
});
