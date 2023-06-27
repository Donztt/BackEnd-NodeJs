const mongoose = require("mongoose")


async function main() {
    try {
        
        mongoose.set("strictQuery", true)

        await mongoose.connect(
            "mongodb+srv://Donztt:zYKEmGGJZVYiKbG2@cluster0.6mmjgfr.mongodb.net/"
        )
        
        console.log("DB Connected");
    } catch (error) {
        console.log("erro: ", error);
    }
}

module.exports = main