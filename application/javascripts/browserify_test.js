var d3 = require('d3');
var _ = require('underscore');
var moment = require('moment');

$(document).ready(function(){
  // use d3
  d3.select('h1').style('color','blue');
  // use underscore
  _.each([1,2,3],function(d){
    console.log(d);
  });
  // moment
  console.log(moment().format());
});
