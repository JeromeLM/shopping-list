// Variables
// =========

var enterButton = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var items = ul.getElementsByTagName("li");
var deleteButtons = document.getElementsByClassName("delete");

// Utility functions
// =================

function inputLength() {
	return input.value.length;
}

function createListItem() {
	// Create the list item element
	var li = document.createElement("li");

	// Add the text
	li.appendChild(document.createTextNode(input.value + " "));
		
	// Add the delete button, with the delete action callback
	var button = document.createElement("button");
	button.innerHTML = "Delete";
	button.setAttribute("class", "delete");
	button.addEventListener("click", removeListItem);
	li.appendChild(button);

	// Add the click action callback
	li.addEventListener("click", applyDone);
	
	// Add the new list item to the list
	ul.appendChild(li);

	// Clear the input
	input.value = "";
}

// Callback functions
// ==================

function applyDone() {
	// Filter on "LI", otherwise action will be done even when clicking on the delete button !
	if (event.target.tagName === "LI") {
		event.target.classList.toggle("done");
	}
}

function removeListItem() {
	// expected event.target is <button class="delete">Delete</button>
	
	// At first, remove the event listener linked to the delete button of the list item
	event.target.removeEventListener("click", removeListItem);
	// Then, remove the whole list item (event.target.parentNode is <li>...</li>)
	event.target.parentNode.remove();
}

function addListItemAfterClick() {
	if (inputLength() > 0) {
		createListItem();
	}
}

function addListItemAfterKeypress() {
	if ((inputLength() > 0) && (event.keyCode === 13)) {
		createListItem();
	}
}

// Event listeners settings
// ========================

enterButton.addEventListener("click", addListItemAfterClick);

input.addEventListener("keypress", addListItemAfterKeypress);

for (var i = 0; i < items.length; i++) {
	items[i].addEventListener("click", applyDone);
}

for (var i = 0; i < deleteButtons.length; i++) {
	deleteButtons[i].addEventListener("click", removeListItem);
}
