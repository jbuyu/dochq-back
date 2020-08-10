const moment = require("moment");
const nameAge = (data) => {
  let {
    first_name,
    last_name,
    dob,
    email,
    gender,
    phone,
    consultation,
    symptoms,
  } = data;
  let name = first_name + last_name;
  let age = moment().diff(dob, "years");
  return {
    name,
    age,
    email,
    gender,
    phone,
    consultation,
    symptoms,
  };
};

module.exports = nameAge;
