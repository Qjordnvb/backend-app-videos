import { RequestHandler } from "express";
import Video from "./Video";

export const createVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findOne({
    url: req.body.url,
  });
  if (videoFound)
    return res.status(301).json({
      message: "The url already exists",
    });
  const video = new Video(req.body);
  const savedVideo = await video.save();
  res.json(savedVideo);
};

export const deleteVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findByIdAndDelete(req.params.id);

  if (!videoFound) return res.status(204).json({ message: "Algo salio mal" });

  return res.status(204).json();
};

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const videos = await Video.find();
    return res.json(videos);
  } catch (error) {
    res.json(error);
  }
};

export const getVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findById(req.params.id);
  if (!videoFound) return res.status(204).json({ message: "Not found video" });
  return res.json(videoFound);
};

export const updateVideo: RequestHandler = async (req, res) => {
  const videoUpdated = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!videoUpdated) {
    return res.status(204).json({ message: "could not update" });
  }

  return res.json(videoUpdated);
};
