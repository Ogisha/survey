import Vue from 'vue'
import App from './App.vue'


new Vue({
  el: '#app',
  render: h => h(App)
});

var novi = [];
var odg = [];

$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader("api-key", "c8441234d7585dff41fdfa065a37d33cdf17330d");
  }
});

$.ajax({
  type: "GET",
  dataType: "json",
  headers: {"api-key": "c8441234d7585dff41fdfa065a37d33cdf17330d",
            "Access-Control-Allow-Origin": "*"},
  url: "http://survey.quantox.tech/survey",
  data: {},
  success: function(obj) {
    alert("Success");
    $("#data").append(JSON.stringify(obj));
  },
  error: function(xhr) {
    alert(JSON.stringify(xhr));
  }
});

$.getJSON("http://survey.quantox.tech/survey", function(data) {
  $.each(data, function(key, val) {
    $("div#part2").append(
      "<div id='question'" + val.id + "><p>" + val.question + "</p><textarea></textarea></div>"
    );
  });
});

$.getJSON("http://survey.quantox.tech/answers/", function(data) {
  $("textarea").val("");
  $.each(data, function(key, val) {
    
    if(novi.indexOf(val.category) == -1) {
      novi.push(val.category);
      $("div#forma2").append(
      "<fieldset><legend>" + val.category + ": </legend><div><p>" + val.
      question + "</p><textarea id='question" + val.id + "' required onkeyup='localStorage.setItem(" + val.
      id + ", $(this).val())'>" + locStorage(val.id) + "</textarea></div></fieldset>"
       );
    }
    
    else {
      $("div#forma2").append(
      "<div><p>" + val.
      question + "</p><textarea id='question" + val.id + "' required onkeyup='localStorage.setItem(" + val.
      id + ", $(this).val())'>" + locStorage(val.id) + "</textarea></div>"
      );
    }
    
    var newObj = {
      questionid: val.id,
      answer: localStorage.getItem(val.id)
    };
      
    odg.push(newObj);
    
    function locStorage(id) {
      if (localStorage.getItem(id))
        return localStorage.getItem(id);
      else
        return "";
    }
  });
});

$("#popis").submit(function(e) {
  
  e.preventDefault();
  var jTemp = JSON.stringify(odg);
  
  $.ajax({
    method: "POST",
    url: "http://survey.quantox.tech/answers/",
    data: jTemp,
    dataType: "json",
      
    success: function(data){
       alert("Success");
    },
    
    error: function(xhr, ajaxOptions, thrownError) {
  
      if (xhr.status == 200) {
        alert(ajaxOptions);
       }
       
      else {
        alert(xhr.status);
        alert(xhr.readyState);
        alert(thrownError);
      }
    }
 });
});
