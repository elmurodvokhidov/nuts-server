const express = require('express');
const {
    addNewVideo,
    getAllVideos,
    updateVideo,
    deleteVideo,
    getVideosByType
} = require('../controller/videos.controller');
const router = express.Router();

router.post('/', addNewVideo);
router.get('/', getAllVideos);
router.get('/:type', getVideosByType);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

module.exports = router;