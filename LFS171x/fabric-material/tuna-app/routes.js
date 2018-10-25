//SPDX-License-Identifier: Apache-2.0

var tuna = require('./controller.js');
var receiver = require('./controller2.js');
var login = require('./Login_Controller.js');

module.exports = function(app){

  app.get('/get_tuna/:id', function(req, res){
    tuna.get_tuna(req, res);
  });
  app.get('/organ_as_used/:id', function(req, res){
    tuna.organ_as_used(req, res);
  });
  app.get('/get_history/:id', function(req, res){
    tuna.get_history(req, res);
  });
  app.get('/add_tuna/:tuna', function(req, res){
    tuna.add_tuna(req, res);
  });
  app.get('/get_all_tuna', function(req, res){
    tuna.get_all_tuna(req, res);
  });
  app.get('/change_holder/:holder', function(req, res){
    tuna.change_holder(req, res);
  });

// receiver route

  app.get('/get_all_receiver', function(req, res){
    receiver.get_all_receiver(req, res);
  });
  app.get('/get_receiver/:id', function(req, res){
    receiver.get_receiver(req, res);
});
  app.get('/add_receiver/:receiver', function(req, res){
    receiver.add_receiver(req, res);
 
  });
 app.get('/change_receiver_state/:receiver', function(req, res){
    receiver.change_receiver_state(req, res);
 
  });


//login route
 app.get('/add_hospital/:hospital', function(req, res){
    login.add_Hospital(req, res);
 
  });
 app.get('/get_hospital/:id', function(req, res){
    login.get_Hospital(req, res);
 
  });
 app.get('/add_AB/:AB', function(req, res){
    login.add_AB(req, res);
 
  });
 app.get('/get_AB/:id', function(req, res){
    login.get_AB(req, res);
 
  });


}
