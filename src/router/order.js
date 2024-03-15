import express from "express"
import { Order } from "../model/order"
import { auth } from "../auth/auth"

let router = express.Router()

router.get("/getAll", (req, res) => {
    Order.find({})
        .populate([
            { path: "productId", select: "title price" },
            { path: "userId", select: "name", populate: { path: "adminId", select: "name" } }
        ])
        .then((resData) => {
            res.status(200).send(resData)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

router.post("/create", auth, (req, res) => {

    req.body.userId = req?.loginUser?._id
    Order.create(req.body)
        .then((resData) => {
            res.status(200).send(resData)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})


export default router;