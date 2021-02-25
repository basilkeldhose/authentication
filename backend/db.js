const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/samplePost", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if (!err) {
        console.log("mongodb conection suceesfull");
    }
    else {
        console.log("error in database connection" + JSON.stringify(err, undefined, 2));
    }
});

require("./model/register.schema")
module.exports = mongoose