

window.addEventListener('load', ()=> {

  let container = document.querySelector("#taskForm");
  let taskDetails_i = document.getElementById("taskDetails") as HTMLInputElement;
  let assigneeName_i = document.getElementById("assigneeName") as HTMLInputElement;
  let dueDate_i = document.getElementById("dueDate") as HTMLInputElement;
  
  //let button = document.getElementById('addBtn');

  let error_1: HTMLElement| null = document.getElementById("detailsEmptyAlert");
  let error_2: HTMLElement| null = document.getElementById("assigneeNameEmptyAlert");
  let error_3: HTMLElement| null = document.getElementById("dueDateEmptyAlert");
  let error_4: HTMLElement| null = document.getElementById("dueDateFutureAlert");

  let map=0;
  let map1=0;
  if(error_1!=null)
  error_1.style.display="none";
  if(error_2!=null)
  error_2.style.display="none";
  if(error_3!=null)
  error_3.style.display="none";
  if(error_4!=null)
  error_4.style.display="none";

 




    enum status {
        completed = "COMPLETED",
        incomplete = "INCOMPLETE"
    };

    interface taskData {
        taskDetails: string;
        assigneeList: string;
        dueDate: string;
        taskStatus : status;
      };

      let listAssignee = document.getElementById("assigneeName");
      let assigneeLists : string[] = ["Jayesh","Shibo", "Rahul", "Prabhjot", "Anubhv", "Hari", "Sarthak", "Anubhav", "Chetan", "Rishab","Rakesh"];
      let assigneeDropdown = (assigneeList: string[]) => {
        for(let list of assigneeList){
          const option_i = document.createElement("option");
          option_i.value = list;
          const names = document.createTextNode(list);
          option_i.appendChild(names);
          listAssignee?.appendChild(option_i);
        }
        
      }
      console.log(assigneeLists);
      assigneeDropdown(assigneeLists);


    let tasksData: taskData[] = [];
    let taskCompleted: taskData[]=[];

    let formatDate =(_date: string) =>{
    const [year,month,day] = _date.split('-');
    const date = new Date(+year, +month - 1, +day);
    return date;
  }


// ---------  Task entry object -------\\

  let taskObject = (taskName:string , assigneeName:string , dueDate_i:string) => {
    let newTask : taskData = {
        taskDetails : taskName,
        assigneeList : assigneeName,
        dueDate : dueDate_i,
        taskStatus : status.incomplete
       }
       tasksData.push(newTask);
}


//   --- Task Completion Object  ----\\

let taskObjectComplete = (taskName:string,assigneeName:string, dueDate_i:string) => {
  let newTask : taskData = {
      taskDetails : taskName,
      assigneeList : assigneeName,
      dueDate : dueDate_i,
      taskStatus : status.completed
     }
     taskCompleted.push(newTask);
}



// -------   Validation Check ------- \\


let validationCheck = (taskName:string,assigneeName:string,dueDate:string) =>
{
  let check=false;

  

  let currentDate = new Date(); 
  currentDate.setHours(0, 0, 0, 0);
  console.log(formatDate(dueDate) );

  // Validation Check for input data
  
  if (taskName?.trim() === "") {

    //no task details
   
    if(error_1!=null)
    error_1.style.display="block";
    check=true;
  }else
  if(error_1!=null)
  error_1.style.display="none";
  
  if ( assigneeName?.trim() === "") {
    //no assignee
    if(error_2!=null)
    error_2.style.display="block";
    check=true;
  }
  else
  if(error_2!=null)
    error_2.style.display="none";

  if (formatDate(dueDate) < currentDate ) {
    // the date should be ahead from today
    if(error_4!=null)
    {
    console.log(formatDate(dueDate) );
    error_4.style.display="block";
    }
    check=true;
  }
  else
  if(error_4!=null)
  error_4.style.display="none";

  if( dueDate?.trim() === "")
  {
    // the date is empty
    if(error_3!=null)
    error_3.style.display="block";
    check=true;
  }
  else
  if(error_3!=null)
    error_3.style.display="none";


  if(!check)
  {
    taskObject(taskDetails_i.value,assigneeName_i.value,dueDate_i.value);

  }
 

}


    container?.addEventListener('submit', (e) =>{
        e.preventDefault();
        validationCheck(taskDetails_i.value,assigneeName_i.value,dueDate_i.value);
       let taskDetails_entry = document.createTextNode(tasksData[map].taskDetails);
       let assigneeName_entry= document.createTextNode(tasksData[map].assigneeList);
       let dueDate_entry=  document.createTextNode(tasksData[map].dueDate);
       
       
        let table = document.getElementById("InProgressTable") as HTMLTableElement;
        let row =   table?.insertRow(1);
        let cell1 = row?.insertCell(0) ;
        let cell2 = row?.insertCell(1);
        let cell3 = row?.insertCell(2) ;
        let cell4 = row?.insertCell(3);
        

        let table2 = document.getElementById("completedTable") as HTMLTableElement ;
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        
        cell1?.appendChild(taskDetails_entry);
        cell2?.appendChild(assigneeName_entry);
        cell3?.appendChild(dueDate_entry);
        cell4?.appendChild(checkbox);
        map++;

        checkbox?.addEventListener('click', (e) => {
          checkbox!.parentElement!.parentElement!.remove();
            let row = table2?.insertRow(1);
            let cell1 = row?.insertCell(0) as HTMLTableCellElement;
            let cell2 = row?.insertCell(1) as HTMLTableCellElement;
            let cell3 = row?.insertCell(2) as HTMLTableCellElement;
            let cell4 =row?.insertCell(3) as HTMLTableCellElement;
            

            cell1.append(taskDetails_entry);
            cell2.append(assigneeName_entry);
            cell3.append(dueDate_entry);
            cell4.append(status.completed.toString());
            map1++;
            map--;

            
        });

      
       
       let res = document?.getElementById("taskForm") as HTMLFormElement;
       res.reset();
    });
    
});
