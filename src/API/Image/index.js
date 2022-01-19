import express from "express";
import multer from "multer";
import { s3Upload } from "../../utils/s3";
import { ImageModel } from "../../database/allModels";

const Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
Route		      | 	/
Description   |	  Uploads given images to s3 bucket and saves file link to mongodb
Access	      | 	Public
Parameter  	  |	  --
Methods	      | 	POST
*/
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const bucketOptions = {
      Bucket: "zomat0-master",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const uploadImage = await s3Upload(bucketOptions);

    const saveImageToDatabase = await ImageModel.create({
      images: [{ location: uploadImage.Location }],
    });

    return res.status(200).json(saveImageToDatabase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const image = await ImageModel.findById(_id);

    return res.status(200).json(image);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
