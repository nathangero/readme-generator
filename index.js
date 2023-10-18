// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const FILE_NAME = "./README_generated.md";

// Create objects to pass into the inquirer prompt
const askForTitle = {
    type: "input",
    message: "What's the name of your project?",
    name: "projectName",
    default: "My Cool Project",
}

const askforDescription = {

}

const askForInstallation = {

}

const askForUsage = {
    
}

const askForContribution = {
    
}

const askForTesting = {
    
}

const askForLicense = {
    type: "list",
    message: "Select a license:",
    name: "license",
    choices: [
        {
            name: "Apache license 2.0",
            value: "Apache-2.0"
        },
        {
            name: "GNU General Public License v2.0",
            value: "GPL-2.0",
        },
        {
            name: "GNU General Public License v3.0",
            value: "GPL-3.0",
        },
        {
            name: "MIT",
            value: "MIT",
        },
        {
            name: "Do What The F*ck You Want To Public License",
            value: "WTFPL"
        }
    ]
}

const askForGithub = {
    
}

const askForEmail = {
    
}


// Create an array of questions for user input
const questions = [
    askForTitle,
    // askforDescription, 
    // askForInstallation, 
    // askForUsage, 
    // askForContribution, 
    // askForTesting, 
    askForLicense, 
    // askForGithub, 
    // askForEmail
];

/**
 * Takes in the passed in string "data" and  
 * @param {String} fileName 
 * @param {String} data 
 */
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        err ? console.error(err) : console.log("Generated README");
    })
}

// TODO: Create a function to initialize app
async function init(questions) {
    let responses = await inquirer.prompt(questions);
    console.log(responses)

    // let readmeStr = buildReadmeStr(responses);
    
    // writeToFile(FILE_NAME, readmeStr);
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
init(questions);
