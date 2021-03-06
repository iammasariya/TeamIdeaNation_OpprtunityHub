var mongo = require("../mongo");
var mongoURL = "mongodb://localhost:27017/DEVPOST";

exports.addProject = function(req,res)
{
  var npoId = 12;
  var projctTitle = req.body["PROJECT_TITLE"];
  var projectDesc = req.body["PROJECT_DESC"];
  var skillSet = req.body["SKILL_SET"];
  var deadline = req.body["DEADLINE"];
  var datePosted = new Date().now();

  var queryJSON =
  {
    "NPO_ID" : npoId,
    "PROJECT_TITLE" : projctTitle,
    "PROJECT_DESC" : projectDesc,
    "SKILL_SET" : skillSet,
    "DEADLINE" : deadline,
    "DATE_POSTED" : datePosted
  }

  var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
      console.log(result);

            var jsonResponse={"projectDetails":result};
            //res.customerDetails=result;
            //callback(null, jsonResponse);

        }
    }
    mongo.insertOne("PROJECT", queryJSON, callbackFunction);
}

exports.displayAllProjectsNPO = function(req,res)
{
  var npoId = req.session.userId;

  var queryJSON =
  {
    "NPO_ID" : npoId//new require('mongodb').ObjectID(req.session.userId)
  }


  var callbackFunction = function(err,result)
  {
    if(err)
    {
      console.log(err);
      var jsonResponse={"statusCode":401};
      res.send(jsonResponse);
    }
    else {
      console.log(result);
      var jsonResponse = {"projects":result,"statusCode":200};
      res.send(jsonResponse);
    }
  }
  mongo.find("PROJECT",queryJSON,callbackFunction);
}

exports.getProjectDetails = function(req,res)
{

  var projectId = req.body["projectId"];

      var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
              var jsonResponse={"statusCode":401};
              res.send(jsonResponse);
        }
        else {
    
            console.log(result);
            
            var jsonResponse={"results":result,"statuscode":200};
            //res.customerDetails=result;
            //callback(null, jsonResponse);
            res.send(jsonResponse);
        }
    }
    mongo.findOneUsingId("PROJECT", projectId, callbackFunction);
}


exports.displayAllProjects = function(req,res)
{
  var npoId =req.session.userId;

  var queryJSON =
  {
    "NPO_ID" : npoId
  }

  var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
              var jsonResponse={"statusCode":401};
        }
        else {
      console.log(result);

            var jsonResponse={"projects":result,"statusCode":200};
            //res.customerDetails=result;
            //callback(null, jsonResponse);

        }
    }
    mongo.find("PROJECT", queryJSON, callbackFunction);
}

exports.getDisplayPage = function(req,res)
{
  //var projectId = req.body['projectId'];
  var projectId = req.param("projectId");
  console.log(projectId);
  res.render('./ProjectPages/project.ejs',{"projectId":projectId});
}


exports.editProject = function(req,res)
{
  var npoId = 12;
  var projectId = req.body["projectId"];
  var projctTitle = req.body["PROJECT_TITLE"];
  var projectDesc = req.body["PROJECT_DESC"];
  var skillSet = req.body["SKILL_SET"];
  var deadline = req.body["DEADLINE"];

  var queryJSON =
  {
    "NPO_ID" : npoId,
    "_id" : ObjectId(projectId)
  }

  var updateQuery =
  {
    "PROJECT_TITLE" : projctTitle,
    "PROJECT_DESC" : projectDesc,
    "SKILL_SET" : skillSet,
    "DEADLINE" : deadline
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
    mongo.updateOne("PROJECT", queryJSON, updateJSON, callbackFunction);
}


function doAddProject(req, res) {


  var npoId = req.session.userId;
  var org_name = req.session.name;
  var project_name=req.param("PROJECT_TITLE");
  var project_desc=req.param("PROJECT_DESC");
  var positions = req.param("POSITIONS");
  console.log(positions);

var queryJSON =
{
  "NPO_ID" : npoId,
  "NAME" : org_name,
  "PROJECT_TITLE": project_name,
  "PROJECT_DESC": project_desc,
  "SKILL_SET":positions,
  "DEADLINE":""
}

  var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
        // console.log(result);
         var jsonRes = {"statuscode" : 200};
         res.send(jsonRes);
        }

    }
    mongo.insertOne("PROJECT", queryJSON, callbackFunction);
}

exports.doAddProject = doAddProject;

exports.getProjectList = function(req,res){
  var queryJSON = {};
  var callbackFunction = function(err,result){
      if(err){
        console.log(err);
      }
      else{
        if(result!=null){
          var resJson = {"result" : result};
          res.send(resJson);
        }
      }
  }
   mongo.find("PROJECT", queryJSON, callbackFunction);
}

exports.getCreateProject = function(req,res)
{
  res.render('./ProjectPages/createProject.ejs',{name:req.session.name});
}

exports.applyForJob = function(req,res)
{
  var skill = req.body["skill"];
  var projectId = req.body["projectId"];
  console.log(skill);
  var pushJSON ={ "SKILL_SET.$.APPLICATIONS " : {
    "USER_ID":req.session.userId,
    "NAME":req.session.name,
    "STATUS":0
  }};

  
  var callbackFunction = function(err,result){
      if(err){
        console.log(err);
      }
      else{
        if(result!=null){
          var resJson = {"statuscode" : 200};
          res.send(resJson);
        }
      }
  }
  mongo.applyForJob("PROJECT",projectId,skill,pushJSON,callbackFunction);
}