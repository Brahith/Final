let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let User = mongoose.Schema({
    /*password:
    {
        type:String,
        default:"",
        trim:true,
        required:'Password is required'
    },*/
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required:'DisplayName is required'
    },
    email:
    {
        type:String,
        default:"",
        trim:true,
        required:'DisplayName is email'
    },
    created:
    {
        type:Date,
        default:Date.now
    },
    update:
    {
        type:Date,
        default:Date.now
    }

},
{
    collection:"user"
}
)

// configure options for user model
let options = ({MissingPasswordError:'Wrong/Missing Password'});
User.plugin(passportLocalMongoose,options);

module.exports.User = mongoose.model('User',User);