exports.displayProfile = function(req,res)
{
  var queryJSON =
  {
    "userId" : 12  //Session varibale here
  }

  var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
      console.log(result);

            var jsonResponse={"participantDetails":result};
            //res.customerDetails=result;
            callback(null, jsonResponse);

        }
    }

    mongo.findOne("PARTICIPANT",queryJSON,callbackFunction);
}

exports.editProfile = function(req,res)
{
  var firstName = req.body["firstName"];
  var lastName = req.body["lastName"];
  var desc = req.body["desc"];
  var skillSet = req.body["skillSet"];
  var image = req.body["image"];
  var userId = 12 // Session varibale here

  var updateJSON =
  {
    "FIRST_NAME" :firstName,
    "LAST_NAME" : lastName,
    "DESC" : desc,
    "SKILL_SET" :skillSet,
    "IMAGE" :image
  }

  var queryJSON =
  {
    "USER_ID" : userId
  }

  var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
      console.log(result);

            //var jsonResponse={"customerDetails":result};
            //res.customerDetails=result;
            //callback(null, jsonResponse);

        }
    }
    mongo.updateOne("PARTICIPANT", queryJSON, updateJSON, callbackFunction);
}

exports.getLoggedParticipant = function(req,res)
{
  var userId = 122; // Session varibale here

  var queryJSON =
  {
    "USER_ID":userId
  }

  var callbackFunction =  function(err,result)
  {
    if(err)
    {
      console.log(err);
    }
    else {
      console.log(result);
      // JSON response here
    }
  }

  mongo.find("PARTICIPANT",queryJSON,callbackFunction);
}