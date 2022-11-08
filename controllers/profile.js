const User = require('../models/User')

module.exports = {
getProfile: async (req, res) => {
    try {
      const userinfo = await User.find({_id:req.user._id});
      res.render("/profile.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
}