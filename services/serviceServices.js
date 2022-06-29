// service Services
const Service = require("../models/serviceModel");
const mongoose = require("mongoose");


// create new service
exports.createService = (req, res, next) => {
    const service = new Service({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        createdDate: new Date()
    });


    // image
    if (req.file) {
        service.image = req.file.originalname;
    }

    service.save()
        .then(result => {
            res.status(201).json({
                message: "Service created!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Service not created!",
                error: err
            });
        });
};

// update service
exports.updateService = (req, res, next) => {
    Service.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
    })
        .then(result => {
            res.status(200).json({
                message: "Service updated!",
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

// delete service
exports.deleteService = (req, res, next) => {
    Service.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "Service deleted!",
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

// get all service 
exports.getAllService = (req, res, next) => {
    Service.find()
        .select("_id name price description image category createdDate")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                service: docs.map(doc => {
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
};

// get service by id
exports.getServiceById = (req, res, next) => {
    Service.findById(req.params.id)
        .select("_id name price description image category createdDate")
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    service: doc,
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

// get Service by price 
exports.getServiceByPrice = (req, res, next) => {
    Service.find({ price: req.params.price })
        .select("_id name price description image category createdDate")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                service: docs.map(doc => {
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
};

// get service by name
exports.getServiceByName = (req, res, next) => {
    Service.find({ name: req.params.name })
        .select("_id name price description image category createdDate")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                service: docs.map(doc => {
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
}
