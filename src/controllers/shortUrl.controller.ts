import urlModel from "../models/url.model";
import { Request, Response } from "express";
import { uid } from "uid";

export const shortUrl = async (req: Request, res: Response) => {
  const {originalUrl} = req.body;
  const urlFound = await urlModel.findOne({originalUrl});
  const shortedUrl = `http://localhost:5173/${uid(6)}`;

  if (urlFound) return res.status(200).json(urlFound.shortedUrl);

  try {
    const newUrl = new urlModel({shortedUrl, originalUrl});
    await newUrl.save();
    res.status(200).json(newUrl.shortedUrl);
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
    console.log(error);
  }
}

export const shortUrlCounter = async (req: Request, res: Response) => {
  try {
    const count = await urlModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
    console.log(error);
  }
}