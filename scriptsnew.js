window.addEventListener('load', function () {
    var container = document.querySelector("#taskForm");
    var taskDetails_i = document.getElementById("taskDetails");
    var assigneeName_i = document.getElementById("assigneeName");
    var dueDate_i = document.getElementById("dueDate");
    //let button = document.getElementById('addBtn');
    var error_1 = document.getElementById("detailsEmptyAlert");
    var error_2 = document.getElementById("assigneeNameEmptyAlert");
    var error_3 = document.getElementById("dueDateEmptyAlert");
    var error_4 = document.getElementById("dueDateFutureAlert");
    var map = 0;
    var map1 = 0;
    if (error_1 != null)
        error_1.style.display = "none";
    if (error_2 != null)
        error_2.style.display = "none";
    if (error_3 != null)
        error_3.style.display = "none";
    if (error_4 != null)
        error_4.style.display = "none";
    var status;
    (function (status) {
        status["completed"] = "COMPLETED";
        status["incomplete"] = "INCOMPLETE";
    })(status || (status = {}));
    ;
    ;
    var listAssignee = document.getElementById("assigneeName");
    var assigneeLists = ["Jayesh", "Shibo", "Rahul", "Prabhjot", "Anubhv", "Hari", "Sarthak", "Anubhav", "Chetan", "Rishab", "Rakesh"];
    var assigneeDropdown = function (assigneeList) {
        for (var _i = 0, assigneeList_1 = assigneeList; _i < assigneeList_1.length; _i++) {
            var list = assigneeList_1[_i];
            var option_i = document.createElement("option");
            option_i.value = list;
            var names = document.createTextNode(list);
            option_i.appendChild(names);
            listAssignee === null || listAssignee === void 0 ? void 0 : listAssignee.appendChild(option_i);
        }
    };
    console.log(assigneeLists);
    assigneeDropdown(assigneeLists);
    var tasksData = [];
    var taskCompleted = [];
    var formatDate = function (_date) {
        var _a = _date.split('-'), year = _a[0], month = _a[1], day = _a[2];
        var date = new Date(+year, +month - 1, +day);
        return date;
    };
    // ---------  Task entry object -------\\
    var taskObject = function (taskName, assigneeName, dueDate_i) {
        var newTask = {
            taskDetails: taskName,
            assigneeList: assigneeName,
            dueDate: dueDate_i,
            taskStatus: status.incomplete
        };
        tasksData.push(newTask);
    };
    //   --- Task Completion Object  ----\\
    var taskObjectComplete = function (taskName, assigneeName, dueDate_i) {
        var newTask = {
            taskDetails: taskName,
            assigneeList: assigneeName,
            dueDate: dueDate_i,
            taskStatus: status.completed
        };
        taskCompleted.push(newTask);
    };
    // -------   Validation Check ------- \\
    var validationCheck = function (taskName, assigneeName, dueDate) {
        var check = false;
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        console.log(formatDate(dueDate));
        // Validation Check for input data
        if ((taskName === null || taskName === void 0 ? void 0 : taskName.trim()) === "") {
            //no task details
            if (error_1 != null)
                error_1.style.display = "block";
            check = true;
        }
        else if (error_1 != null)
            error_1.style.display = "none";
        if ((assigneeName === null || assigneeName === void 0 ? void 0 : assigneeName.trim()) === "") {
            //no assignee
            if (error_2 != null)
                error_2.style.display = "block";
            check = true;
        }
        else if (error_2 != null)
            error_2.style.display = "none";
        if (formatDate(dueDate) < currentDate) {
            // the date should be ahead from today
            if (error_4 != null) {
                console.log(formatDate(dueDate));
                error_4.style.display = "block";
            }
            check = true;
        }
        else if (error_4 != null)
            error_4.style.display = "none";
        if ((dueDate === null || dueDate === void 0 ? void 0 : dueDate.trim()) === "") {
            // the date is empty
            if (error_3 != null)
                error_3.style.display = "block";
            check = true;
        }
        else if (error_3 != null)
            error_3.style.display = "none";
        if (!check) {
            taskObject(taskDetails_i.value, assigneeName_i.value, dueDate_i.value);
        }
    };
    container === null || container === void 0 ? void 0 : container.addEventListener('submit', function (e) {
        e.preventDefault();
        validationCheck(taskDetails_i.value, assigneeName_i.value, dueDate_i.value);
        var taskDetails_entry = document.createTextNode(tasksData[map].taskDetails);
        var assigneeName_entry = document.createTextNode(tasksData[map].assigneeList);
        var dueDate_entry = document.createTextNode(tasksData[map].dueDate);
        var table = document.getElementById("InProgressTable");
        var row = table === null || table === void 0 ? void 0 : table.insertRow(1);
        var cell1 = row === null || row === void 0 ? void 0 : row.insertCell(0);
        var cell2 = row === null || row === void 0 ? void 0 : row.insertCell(1);
        var cell3 = row === null || row === void 0 ? void 0 : row.insertCell(2);
        var cell4 = row === null || row === void 0 ? void 0 : row.insertCell(3);
        var table2 = document.getElementById("completedTable");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        cell1 === null || cell1 === void 0 ? void 0 : cell1.appendChild(taskDetails_entry);
        cell2 === null || cell2 === void 0 ? void 0 : cell2.appendChild(assigneeName_entry);
        cell3 === null || cell3 === void 0 ? void 0 : cell3.appendChild(dueDate_entry);
        cell4 === null || cell4 === void 0 ? void 0 : cell4.appendChild(checkbox);
        map++;
        checkbox === null || checkbox === void 0 ? void 0 : checkbox.addEventListener('click', function (e) {
            checkbox.parentElement.parentElement.remove();
            var row = table2 === null || table2 === void 0 ? void 0 : table2.insertRow(1);
            var cell1 = row === null || row === void 0 ? void 0 : row.insertCell(0);
            var cell2 = row === null || row === void 0 ? void 0 : row.insertCell(1);
            var cell3 = row === null || row === void 0 ? void 0 : row.insertCell(2);
            var cell4 = row === null || row === void 0 ? void 0 : row.insertCell(3);
            cell1.append(taskDetails_entry);
            cell2.append(assigneeName_entry);
            cell3.append(dueDate_entry);
            cell4.append(status.completed.toString());
            map1++;
            map--;
        });
        var res = document === null || document === void 0 ? void 0 : document.getElementById("taskForm");
        res.reset();
    });
});
