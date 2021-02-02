const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");
const { create } = require("domain");
const employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

console.log("Welcome to this app!");
getEmployeeType();

async function getEmployeeType () {
    //UI receives type - manager, engineer or intern
    //Redirects based on answer to above
    const answer = await inquirer.prompt({
        type: "list",
        choices: ["Manager", "Engineer", "Intern"],
        message: "What type of employee would you like to enter?",
        name: "type"    
    });    
    switch(answer.type){
        case "Manager": getManager(); break;
        case "Engineer": getEngineer(); break;
        case "Intern": getIntern(); break;
    }
}
async function getEmployee (type){
    //UI receives name, id, email
    return await inquirer.prompt([
        {message: `${type} Name`, name: "name"},
        {message: `${type} ID`, name: "id"},
        {message: `${type} Email`, name: "email"} 
    ]); 
}

async function getManager () {
    //get standard Employee info and Office Number
    //redirects to add/quit Employee function
    const standardData = await getEmployee("Manager");
    const customData = await inquirer.prompt({
        message: "Manager Office Number", name: "office"
    });
    employees.push(new Manager(standardData.name, standardData.id, standardData.email, customData.office));
    addEmployee(); 
}

async function getEngineer () {
    //get standard Employee info and GitHub
    //redirects to add/quit Employee function
    const standardData = await getEmployee("Engineer");
    const customData = await inquirer.prompt({
        message: "Engineer GitHub", name: "github"
    });
    employees.push(new Engineer(standardData.name, standardData.id, standardData.email, customData.github));
    addEmployee(); 
}

async function getIntern () {
    //get standard Employee info and School
    //redirects to add/quit Employee function
    const standardData = await getEmployee("Intern");
    const customData = await inquirer.prompt({
        message: "Intern School", name: "school"
    });
    employees.push(new Intern(standardData.name, standardData.id, standardData.email, customData.school));
    addEmployee(); 
}

async function addEmployee () {
    //UI asks if user wants to add another employee or quit application
    //if adding another Employee, redirect to getEmployeeType, else redirect to create HTML 
    const response = await inquirer.prompt({
        message: "Add another employee?", name: "confirm", type: "confirm"
    });
    if (response.confirm) {
        getEmployeeType();
    } else {
        createHTML();
    }
}

function createHTML () {
    //generate HTML from created employees
    //if successful, redirect to finish
    console.log(employees);
}

function finishEmployeeList () {
    console.log("Checkout team.html in the ouput folder!");
    console.log ("Thanks for using this amazing app!");
}
