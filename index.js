const inquirer = require("inquirer");
const fs = require("fs");
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

    let readmeStr = buildReadmeStr(projectInfo);
    
    writeToFile(FILE_NAME, readmeStr);
}


/**
 * Takes all the responses from the user and formats it in Markdown notation.
 * @param {Object} response 
 * @returns String containing Markdown notation
 */
function buildReadmeStr(response) {
    const SYMBOL_TITLE= "#";
    const SYMBOL_SECTION = "##";
    const SYMBOL_LINE_BREAK = "\n\n";

    let name = response.name;
    let desc = response.description;
    let install = response.installation;
    let use = response.usage;
    let contribute = response.contribution;
    let tests = response.testing;
    let lic = response.license;
    let git = response.github;
    let mail = response.email;

    let title = `${SYMBOL_TITLE} ${name}${SYMBOL_LINE_BREAK}`;
    let licenseBadge = `${buildLicenseBadge(lic)}${SYMBOL_LINE_BREAK}`
    let tableOfContents = `${SYMBOL_SECTION} Table of Contents${SYMBOL_LINE_BREAK}${buildTableOfContents()}${SYMBOL_LINE_BREAK}`;
    let description = `${SYMBOL_SECTION} Description${SYMBOL_LINE_BREAK}${desc}${SYMBOL_LINE_BREAK}`;
    let installation = `${SYMBOL_SECTION} Installation${SYMBOL_LINE_BREAK}${install}${SYMBOL_LINE_BREAK}`;
    let usage = `${SYMBOL_SECTION} Usage${SYMBOL_LINE_BREAK}${use}${SYMBOL_LINE_BREAK}`;
    let testing = `${SYMBOL_SECTION} Tests${SYMBOL_LINE_BREAK}${tests}${SYMBOL_LINE_BREAK}`;
    let contributing = `${SYMBOL_SECTION} Contributing${SYMBOL_LINE_BREAK}${contribute}${SYMBOL_LINE_BREAK}`;
    let questions = `${SYMBOL_SECTION} Questions${SYMBOL_LINE_BREAK}If you want to contact me, you can reach me at ${mail} or reach out to me on [GitHub](https://github.com/${git})${SYMBOL_LINE_BREAK}`;
    let license = `${SYMBOL_SECTION} License${SYMBOL_LINE_BREAK}This application is covered under the ${lic} license${SYMBOL_LINE_BREAK}`;

    return `${title}${licenseBadge}${tableOfContents}${description}${installation}${usage}${testing}${contributing}${questions}${license}`
}

/**
 * Takes the license string and identifies which badge should be shown
 * @param {String} license 
 * @returns Markdown containing the badge
 */
function buildLicenseBadge(license) {
    switch (license) {
        case "Apache-2.0":
            return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"

        case "GPL-2.0":
            return "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)"

        case "GPL-3.0":
            return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"

        case "MIT":
            return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
            
        case "WTFPL":
            return "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)"

        default: // MIT by default
            return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    }
}

/**
 * Builds the Table of Contents for the README.
 * @returns String containing the table of contents in Markdown
 */
function buildTableOfContents() {
    const SYMBOL_LINE_BREAK = "\n\n";
    let description = "* [Description](#description)" + SYMBOL_LINE_BREAK;
    let installation = "* [Installation](#installation)" + SYMBOL_LINE_BREAK;
    let usage = "* [Usage](#usage)" + SYMBOL_LINE_BREAK;
    let testing = "* [Tests](#tests)" + SYMBOL_LINE_BREAK;
    let contribution = "* [Contributing](#contributing)" + SYMBOL_LINE_BREAK;
    let questions = "* [Questions](#questions)" + SYMBOL_LINE_BREAK;
    let license = "* [License](#license)" + SYMBOL_LINE_BREAK;

    return description + installation + usage + testing + contribution + questions + license;
}


// Function call to initialize app
init(questions);
