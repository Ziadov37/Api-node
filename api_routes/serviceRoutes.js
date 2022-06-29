// Service routes 
const express = require("express");
const router = express.Router();
const { createService, updateService, deleteService, getServiceById, getAllService, getServiceByPrice, getServiceByName } = require("../services/ServiceServices.js");
const { uploadSingle } = require("../middlewares/uploadPictures.js");
const {admin} = require("../middlewares/middlewares.js")

router.post("/create", admin,  uploadSingle,  createService);
router.put("/update/:id", updateService);
router.delete("/:id", deleteService);
router.get("/getservice/:id", getServiceById);
router.get("/getserviceByname/:name", getServiceByName);
router.get("/getservices", getAllService);
router.get("/getserviceByprice/:price", getServiceByPrice);

module.exports = router;