// routes Service category 

const express = require("express");
const router = express.Router();
const { createServiceCategory, updateServiceCategory, deleteServiceCategory, getServiceCategory, getServiceCategoryById, getServiceByServiceCategory } = require("../services/serviceCategoryServices");
router.get("/", getServiceCategory);
router.get("/:id", getServiceCategoryById);
router.get("/service/:id", getServiceByServiceCategory);
router.post("/create", createServiceCategory);
router.put("/update/:id", updateServiceCategory);
router.delete("/:id", deleteServiceCategory);

module.exports = router;


