import express from "express"
import { Product } from "../model/product"

const router = new express.Router()

router.get("/getAll", (req, res) => {
    Product.find({})
        .then((resData) => {
            console.log("resData", resData)
            res.send(resData)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post("/create", (req, res) => {
    let input = req?.body
    Product.create(input)
        .then((resData) => {
            console.log("resData", resData)
            res.send(resData)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put("/update/:id", (req, res) => {
    let input = req?.body
    console.log("---->", input)
    Product.findByIdAndUpdate(req?.params?.id, input, { new: true })
        .then((resData) => {
            console.log("resData", resData)
            res.send(resData)
        })
        .catch((err) => {
            console.log("err", err)
            res.send(err)
        })
})

router.delete("/delete/:id", (req, res) => {
    let input = req?.body
    Product.findByIdAndDelete(req?.params?.id, input)
        .then((resData) => {
            console.log("resData", resData)
            res.send(resData)
        })
        .catch((err) => {
            res.send(err)
        })
})

export default router