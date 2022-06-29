// servicecategory services
const ServiceCategory = require("../models/serviceCategoryModel");
const Service = require("../models/serviceModel");
const mongoose = require("mongoose");

// get service category
exports.getServiceCategory = (req, res, next) => {
    ServiceCategory.find()
        .select("_id name")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                serviceCategory: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// create a new service category
exports.createServiceCategory = (req, res, next) => {
    const serviceCategory = new ServiceCategory({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    serviceCategory.save()
        .then(result => {
            res.status(201).json({
                message: "Created service category successfully",
                createdServiceCategory: {
                    _id: result._id,
                    name: result.name,
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// upadate service category
exports.updateServiceCategory = (req, res, next) => {

    ServiceCategory.updateOne({ _id: req.params.id }, {
        name: req.body.name,
    })
        .then(result => {
            res.status(200).json({
                message: "Service category updated!",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// delete service category
exports.deleteServiceCategory = (req, res, next) => {
    const id = req.params.id;
    ServiceCategory.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Service category deleted!",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        );
};

// get service category by id
exports.getServiceCategoryById = (req, res, next) => {
    const id = req.params.id;
    ServiceCategory.findById(id)
        .select("_id name")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    serviceCategory: doc,
                });
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};


// get service by serviceCategory 
exports.getServiceByServiceCategory = (req, res, next) => {
    ServiceCategory.findById(req.params.id)
        .select("_id name")
        .exec()
        .then(doc => {
            if (doc) {
                Service.find({ category: doc._id })
                    .select("_id name price description image category stock createdDate")
                    .exec()
                    .then(docs => {
                        const response = {
                            count: docs.length,
                            services: docs.map(doc => {
                                return {
                                    _id: doc._id,
                                    name: doc.name,
                                    price: doc.price,
                                    description: doc.description,
                                    image: doc.image,
                                    category: doc.category,
                                    createdDate: doc.createdDate,
                                }
                            })
                        };
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}