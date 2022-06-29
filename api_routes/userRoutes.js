const { createUser, updateUser, deleteUser, getUserByEmail, getUserById, getUserByRole, getUserByRegisterDate, getAllUsers, loginUser } = require('../services/userServices');
const router = require("express").Router();

// routers
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/getuser/:id", getUserById);
router.get("/email", getUserByEmail);
router.get("/role/:role", getUserByRole);
router.get("/registerDate/:registerDate", getUserByRegisterDate);
router.get("/getusers", getAllUsers);
// login user
router.post("/login", loginUser);

// export routers
module.exports = router;
