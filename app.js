const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");
const { create } = require("domain");
const employees = [];

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
    const html = render(employees);
    fs.writeFileSync("./output/team.html",html);
    finishEmployeeList();
}

function finishEmployeeList () {
    console.log("Checkout team.html in the ouput folder!");
    console.log ("Thanks for using this amazing app!");
}
