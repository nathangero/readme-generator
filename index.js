const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown")
const FILE_NAME = "./README.generated.md";

// Create objects to pass into the inquirer prompt
const askForTitle = {
    type: "input",
    message: "What's the name of your project?",
    name: "name",
    default: "My Cool Project",
}

const askforDescription = {
    type: "editor",
    message: "Describe your project: (save & close editor to continue)",
    name: "description",
}

const askForInstallation = {
    type: "editor",
    message: "How does one install your project? (save & close editor to continue)",
    name: "installation",
}

const askForUsage = {
    type: "editor",
    message: "How does one use your project? (save & close editor to continue)",
    name: "usage",
}

const askForContribution = {
    type: "editor",
    message: "How does one contribute to your project? (save & close editor to continue)",
    name: "contribution",
}

const askForTesting = {
    type: "editor",
    message: "What tests have you done? (save & close editor to continue)",
    name: "testing",
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
        },
        {
            name: "No license",
            value: ""
        }
    ]
}

const askForGithub = {
    type: "input",
    message: "What's your GitHub username?",
    name: "github",
    validate: async function(value) {
        // check if the username exists
        let requestUrl = "https://api.github.com/users/" + value
        let response = await fetch(requestUrl);

        if (!response.ok) {
            console.error("Couldn't find that GitHub user. Please try again");
        } else {
            return true
        }
    }
}

const askForEmail = {
    type: "input",
    message: "What's an email you can be contacted at?",
    name: "email",
    validate: function(value) {
        // Check if email is an email format
        let isValid = String(value).toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        if (!isValid) {
            console.error("Please enter a valid email");
        } else {
            return true
        }
    }
}


// Create an array of questions for user input
const questions = [
    askForTitle,
    askforDescription, 
    askForInstallation, 
    askForUsage, 
    askForContribution, 
    askForTesting, 
    askForLicense, 
    askForGithub,
    askForEmail
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

/**
 * Uses the questions passed in to ask the user what information they want to put into their README.
 * @param {Array} questions 
 */
async function init(questions) {
    // let projectInfo = {
    //     "name": 'My Cool Project',
    //     "description": "IT's just awesome.\r\n\r\nYou can go ahead and find out",
    //     "installation": 'First make sure you have npm installed on your computer.\r\n' +
    //       '\r\n' +
    //       'Then go ahead and download this code',
    //     "usage": 'Go to the directory of where you downloaded the code.\r\n' +
    //       '\r\n' +
    //       'Then open up the Terminal and run ```node index.js```',
    //     "contribution": 'You can fork this project and make a pull request',
    //     "testing": "Not much sadly, that's why I need help!!",
    //     "license": 'MIT',
    //     "github": 'nathangero',
    //     "email": 'nathanageronimo@gmail.com'
    // }

    let projectInfo = await inquirer.prompt(questions);
    // console.log(projectInfo)

    let readmeStr = generateMarkdown.generateMarkdown(projectInfo);
    
    writeToFile(FILE_NAME, readmeStr);
}


// Function call to initialize app
init(questions);
