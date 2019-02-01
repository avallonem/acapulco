/***************************************************************
  The Honeynet Project
  Acapulco (Attack Community grAPh COnstruction)
  Login and Data Retrieving Script
  Copyright (C) 2012  Hugo Gascon <hgascon@gmail.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
  
  This login script uses the Splunk JavaScript SDK to log in
  the user in the Splunk server. It gets some query parameters
  from the html interface and retrieves the specified data from
  the server to be processed and displayed.

***************************************************************/

$.fn.pVal = function() {
        return this.hasClass('placeholder') ? '' : this.val();
};

username = "";
password = "";
scheme   = "";
host     = "";
port     = "";
  
Async = splunkjs.Async;
utils = splunkjs.Utils;

var jd = "";
var data = "";
var http = new splunkjs.ProxyHttp("/proxy");
var pc 
var service = "";

var updateConnectionInformation = function() {
  username = utils.trim($("#id_username").pVal()) || "admin";
  password = utils.trim($("#id_password").pVal()) || "admin";
  scheme   = utils.trim($("#id_scheme").pVal())   || "https";
  host     = utils.trim($("#id_host").pVal())     || "localhost";
  port     = utils.trim($("#id_port").pVal())     || "8089";
    
  var connectionString = username + " : ****** @ " + scheme + "://" + host + ":" + port;
  $("#signin-dropdown").text(connectionString);
  };
  
$(function() {
  $('input, textarea').placeholder();
  updateConnectionInformation();

  
  $(".dropdown input").click(function(e) {
    e.stopPropagation();
  });
  
  $(".dropdown input").blur(function(e) {
    updateConnectionInformation();
  });

  $("#login-btn").click(function() {
    $("#ko-login").css("display", "none");
    login();
  });
});

/*
Create a new splunk javascript object to log
the user in the Splunk server. If the login process
is correct, display info messages and the button to
retrieve data from the Splunk instance.
*/
function login(){
  //MOD
/*  console.log("Error in logging in");

	service = new splunkjs.Service(http, { 
		scheme: scheme,
		host: host,
		port: port,
		username: username,
		password: password
	});
  // First, we log in
  service.login(function(err, success) {
    // We check for both errors in the connection as well
    // as if the login itself failed.
    if (err || !success) {
        console.log("Error in logging in");
        $("#ko-login").css("display", "block");
        done(err || "Login failed");
        return;
    }
    else{*/ 
      console.log("logged correctly!");
      $("#ko-login").css("display", "none");
      $("#acapulco-run").css("display", "block");
      $("#ok-login").css("display", "block");
/*    }      
 })*/
};

/*
This functions verifies the type of data requested,
read the input parameters and creates a new query to
the Splunk server. If the data is corrrectly received
it passed to the corresponding parser to be processed.
*/
function getData(){
    //MOD
    console.log("logged correctly!");
    //
    $("#zero-data").css("display", "none");
   //MOD $("#ok-login").css("display", "none");
    $("#draw-data").css("display", "none");
    $("#done-data").css("display", "none");
    var query;
    var mode=0;
    var size = sld.n_value;
    if (size > 0){
      $("#get-data").css("display", "block");
   //   if ($("#normal-data").attr("checked") == "checked"){
        //MOD
      console.log("dosearch");
      doSearch();
     
/*
      const spawn = require("child_process").spawn;
      const pythonProcess = spawn('python',["/root/acapulco/Acapulco4HNP/bin/sissden.py"]);
      console.log("oh cane");
      pythonProcess.stdout.on('data', (data) => {
    // Do something with the data returned from python script
        console.log(data);
      });
        query = "" +
        'search index=acapulco_normal sourcetype=acapulco_normal | head '+size+' | fields chan,saddr,sport,dport,daddr,url,hash';
        mode=1;
      }
      else{
        query = "" +
        'search index=acapulco sourcetype=acapulco | head '+size+' | fields chan,saddr,sport,dport,daddr,url,hash';
      }
      
      service.oneshotSearch(query, {count: 0}, function(err, results) {
        console.log(results);
        if (err) {
          console.log(err);
          alert("An error occurred with the search");
          return;
        }*/
        $("#get-data").css("display", "none");
        $("#draw-data").css("display", "block");
        //parse(results,mode);
      //})
      
    }
    else{
      $("#zero-data").css("display", "block");
    }
};
 
function doSearch () {
    var searchHost = 'https://index.eval.sissden.eu/cowrie-*/_search';
    var body = {
      
    };
    // Check if the search string or the filter were entered.
   
      var query = {
  "_source":["src_port","src_ip","dest_ip","dest_port"],
  "query": {
    "match_all":{}
}
}
      body.query = query;    
    // Perform the request.
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function () {
    // do something to response
    console.log("callback!");
    console.log(this.responseText);
    };
    
     xmlHttp.open('GET', searchHost);
   // xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.setRequestHeader('Content-Type', 'text/plain');
    xmlHttp.setRequestHeader('Authorization', 'Basic QUtJRFBPU1RFOlBoaWVWZTh2YTJPb2xvdGg2YWVwb3VuZzl1cmFpcXVhaDdvaGdhZUQ=');
    console.log(JSON.stringify(body));
    
    
    xmlHttp.send(JSON.stringify(body));
    console.log("chiamata fatta!!");
  
    //var response = JSON.parse(xmlHttp.responseText);
    
    // Print results on screen.
    /*
    var output = '';
    for (var i = 0; i < response.hits.hits.length; i++) {
      output += '<h3>' + response.hits.hits[i]._source.title + '</h3>';
      output += response.hits.hits[i]._source.summary_processed[0] + '</br>';
    }
   */


  };