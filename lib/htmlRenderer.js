module.exports = function(employees) {
    var html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Portfolio</title>
    <style>
    body {margin: 0; background-color: azure; text-align: center; font-family: sans-serif;}
    header {padding: 10px; margin-bottom: 25px; background-color: midnightblue; color: azure;}
    main section {width: 250px; display: inline-block; background-color: lavender; border-radius: 10px; box-shadow: 0 0 4px black;}
    main section h2, main section h3 {color: white; background-color: blueviolet; margin: 0; padding: 5px;}
    main section p {padding: 5px; margin:0;}
    </style>
</head>
<body>
<header><h1>Team Portfolio</h1></header>
<main>
    `;

    for(let employee of employees){
        let label,value;
        switch(employee.getRole()){
            case "Manager": label="office number"; value= employee.getOfficeNumber(); break;
            case "Engineer": label="github"; value=employee.getGithub(); break;
            case "Intern": label="school"; value=employee.getSchool(); break;           
        }
        html+= `
        <section>
        <h2>${employee.getName()}</h2>
        <h3>${employee.getRole()}</h3>
        <p>id: ${employee.getId()}</p>
        <p>email: ${employee.getEmail()}</p>
        <p>${label}: ${value}</p>
        </section>
        `;
    } 
    html+=`
    </main>
    </body>
    </html>
    `;
    return html;
}