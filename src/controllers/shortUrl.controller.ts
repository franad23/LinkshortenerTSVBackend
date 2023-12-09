import urlModel from "../models/url.model";
import { Request, Response } from "express";
import axios, {AxiosError} from "axios";
import { uid } from "uid";

export const shortUrl = async (req: Request, res: Response) => {
  let {originalUrl, continueUrl}:{ originalUrl: string; continueUrl: boolean }  = req.body;
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  const urlFound = await urlModel.findOne({originalUrl});

  if (!regex.test(originalUrl)) {
    originalUrl = `http://${originalUrl}`;
  }
  
  if (urlFound) return res.status(200).json(urlFound.shortedUrl);
  
  try {
    if (continueUrl) {
      const shortedUrl = `http://localhost:5173/${uid(6)}`;
      const newUrl = new urlModel({shortedUrl, originalUrl});
      await newUrl.save();
      res.status(200).json(newUrl.shortedUrl);
      return
    }
    const {status} = await axios.head(originalUrl);
    if (status >= 200 && status <= 300) {
      const shortedUrl = `http://localhost:5173/${uid(6)}`;
      const newUrl = new urlModel({shortedUrl, originalUrl});
      await newUrl.save();
      res.status(200).json(newUrl.shortedUrl);
    } else {
      res.status(404).json({message: "Page not found"});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar la página' });
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