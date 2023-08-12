"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const sign_up_controller_1 = __importDefault(require("../controllers/sign_up_controller"));
const driver_sign_up_controller_1 = __importDefault(require("../controllers/driver_sign_up_controller"));
const sign_in_controller_1 = __importDefault(require("../controllers/sign_in_controller"));
const driver_sign_in_controller_1 = __importDefault(require("../controllers/driver_sign_in_controller"));
const router = express_1.default.Router();
router.post("/sign_up", sign_up_controller_1.default);
router.post("/driver_sign_up", driver_sign_up_controller_1.default);
router.post("/sign_in", sign_in_controller_1.default);
router.post("/driver_sign_in", driver_sign_in_controller_1.default);
module.exports = router;
