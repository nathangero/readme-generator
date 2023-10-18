// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const FILE_NAME = "./README_generated.md";

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        message: "What's the name of your project?",
        name: "projectName"
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        err ? console.error(err) : console.log("Generated README");
    })
}

// TODO: Create a function to initialize app
async function init() {
    let responses = await inquirer.prompt(questions);
    console.log(responses)

    let readmeStr = buildReadmeStr(responses);
    
    writeToFile(FILE_NAME, readmeStr);
}

function buildReadmeStr(response) {
    const SYMBOL_TITLE= "#";
    const SYMBOL_SECTION = "##";
    const SYMBOL_LINE_BREAK = "\n\n";
    let readme = "";
    let projectName = response.projectName;

    let title = `${SYMBOL_TITLE} ${projectName}${SYMBOL_LINE_BREAK}`;
    let tableOfContents = `${SYMBOL_SECTION} Table of Contents${SYMBOL_LINE_BREAK}${SYMBOL_LINE_BREAK}`;
    let description = `${SYMBOL_SECTION} Description${SYMBOL_LINE_BREAK}${SYMBOL_LINE_BREAK}`;
    let installation = `${SYMBOL_SECTION} Installation${SYMBOL_LINE_BREAK}${SYMBOL_LINE_BREAK}`;
    let usage = `${SYMBOL_SECTION} Usage${SYMBOL_LINE_BREAK}${SYMBOL_LINE_BREAK}`;
    let tests = `${SYMBOL_SECTION} Tests${SYMBOL_LINE_BREAK}${SYMBOL_LINE_BREAK}`;
    let contributing = `${SYMBOL_SECTION} Contributing${SYMBOL_LINE_BREAK}${SYMBOL_LINE_BREAK}`;
    let license = `${SYMBOL_SECTION} License${SYMBOL_LINE_BREAK}${SYMBOL_LINE_BREAK}`;

    readme += `${title}${tableOfContents}${description}${installation}${usage}${tests}${contributing}${license}`

    return readme;
}


// Function call to initialize app
init();
