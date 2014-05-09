$(document).ready(function() {
//not able to click on last added list element without
//refreshing the page

  $("#tasks_list").on("click", "li", function(event){
  	event.preventDefault();

  	$(this).toggleClass("true");
  		var task_name = $(this).text();
      if ($(this).hasClass("true")){

  			// console.log("You clicked task named: " + task_name)
  			$.post("/complete", {name: task_name})

  		} else {
  			var task_name = $(this).text();
  			$.post("/incomplete", {name: task_name})

  		}//close of if/else

  });//on click li

  $("#create_task a").on("click", function(event){
  	event.preventDefault();
  	$(this).hide();
  	//get request
  	$.get("/new", function(create_task){
  		//append our create_task form to create_task id on index
  		$("#create_task").append(create_task);
  	});//get request
  });//on click #create_task

  $(document).on("submit", "#form_submit", function(event){
  	event.preventDefault();
  	//finds the action tag in the form
  	var url = $(this).attr("action");
  	// takes the params and returns url passable object
  	var data = $(this).serialize();
  	console.log("this is the data: " + data);
  	// the function is what we want to do when the returned data
  	//don't forget to include locals
  	$.post(url, data, function(add_task){
  		console.log("Made it to the post!");
  		$('#tasks_list').append(add_task);
  	}); //post
  	//removes the submit form from the DOM
  	$(this).remove();
  	// unhides the link to create a task
  	$("#create_task a").show();
  });//form submit

  //when the delete button is clicked got through
  //each elemenet in the list and add a checkbox
  //add a delete button to the end of the form.
  //afterwards remove the checkboxes

});//doc ready














