import express from "express";
import { User } from "../model/user";
import jwt from "jsonwebtoken";
import { auth } from "../auth/auth";

const router = new express.Router();

const generateToken = (resData) => {
  let token = jwt.sign({ email: resData.email, _id: resData?._id }, "131231")
  return token
}


router.get("/getAll", auth, (req, res) => {
  User.find({})
    .then((resData) => {
      // console.log("resData", resData);
      res.send(resData);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/signup", async (req, res) => {
  let input = req?.body;
  console.log("--->", input);
  User.create(input)
    .then((resData) => {
      let token = generateToken(resData)
      res.send({ data: resData, token });
    })
    .catch((err) => {
      console.log("error", err,)
      res.status(400).send(err);
    });
})

router.put("/update/:id", (req, res) => {
  let input = req?.body
  User.findOneAndUpdate({ _id: req?.params?.id }, input)
    .then((resData) => {
      console.log("resData", resData)
      res.send(resData)
    })
    .catch((err) => {
      res.send(err)
    })
})

router.put("/password-reset/id", auth, async (req, res) => {
  let matchUser = await User.findById(req?.params?.id)
  if (!matchUser) return new Error("user not found")
  else {
    if (req?.body?.password) {
      console.log("---->")
      matchUser.password = req?.body?.password
      matchUser.age = 1000
    }
    await matchUser.save()
    res.send("password changed")
  }
})

router.post("/login", (req, res) => {
  let { email, password } = req?.body

  User.findOne({ email })
    .then(async (userRes) => {
      let match = await userRes.validatePassword(password)
      let token = generateToken(userRes)
      if (match) {
        res.status(404).send("password not match")
      }
    })
    .catch((err) => res.send(err.message))
})

router.delete("/delete/:id", (req, res) => {
  let input = req?.body
  User.findByIdAndDelete(req?.params?.id, input)
    .then((resData) => {
      res.send(resData)
    })
    .catch((err) => {
      res.send(err)
    })
})
export default router;
