

window.addEventListener('load', ()=> {
    let form = document.querySelector("#new-task-form");
    let input = document.querySelector("#new-task-input");
    let asignee = document.querySelector("#new-task-asignee");
    let due_date = document.querySelector("#new-task-due-date");

    form.addEventListener('submit', (e) =>{
        e.preventDefault();

        let n_task = input.value;
        let n_assignee = asignee.value;
        let n_due_date = due_date.value;


        let currentDate = new Date(); //getting the current date
        currentDate.setHours(0, 0, 0, 0);

        // Validation Check for input data
        if (n_task=== "") {
            //no task details
            alert("Task Details Empty, Please Enter");
            return;
          } 
          if ( n_assignee=== "") {
            //no assignee
            alert("No Assignee Name , Please enter the Assignee's Name");
            return;
          } 
          if (n_due_date < currentDate ) {
            // the date should be ahead from today
            alert("Please enter correct date");
            return;
          }
          if( n_due_date=="")
          {
            // the date is empty
            alert("Due Date field is Empty, Please enter the Date");
          }

        let table = document.getElementById("InProgressTable");
        let row = table.insertRow(1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        

        let table2 = document.getElementById("completedTable");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        
        cell1.innerHTML = n_task;
        cell2.innerHTML = n_assignee;
        cell3.innerHTML = n_due_date;
        cell4.appendChild(checkbox);

        checkbox.addEventListener('click', (e) => {
            checkbox.parentElement.parentElement.remove();
            let row = table2.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.innerHTML = n_task;
            cell2.innerHTML = n_assignee;
            cell3.innerHTML = n_due_date;
            
        });
        document.getElementById("new-task-form").reset();
    });
});
