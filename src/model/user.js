import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
    dob: String,
    image: String,
    userType: String,
    password: String,
    gender: String,
    adminId: {
      type: ObjectId,
      ref: "user",
    },
    hobby: [String],
    address: {
      city: String,
      pinCode: Number,
      state: String,
    },
    siblings: [{ name: String, age: Number }]
  },
  { timestamps: true }
);

// model.creat model.save()
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12)
  }
})

userSchema.methods.validatePassword = async function (password) {
  console.log(this.password)
  console.log(password)
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("user", userSchema);
