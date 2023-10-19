/**
 * Takes the license string and identifies which badge should be shown. If no license is chosen, return an empty screen
 * @param {String} license 
 * @returns Markdown containing the badge
 */
function renderLicenseBadge(license) {
    switch (license) {
        case "Apache-2.0":
            return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](${renderLicenseLink(license)})`

        case "GPL-2.0":
            return `[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](${renderLicenseLink(license)})`

        case "GPL-3.0":
            return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](${renderLicenseLink(license)})`

        case "MIT":
            return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](${renderLicenseLink(license)})`
            
        case "WTFPL":
            return `[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](${renderLicenseLink(license)})`

        default:
            return ""
    }
}

/**
 * Get the URL link for the chosen license. If no license chosen then give an empty string
 * @param {String} license 
 * @returns String containing the license URL
 */
function renderLicenseLink(license) {
    switch (license) {
        case "Apache-2.0":
            return "https://opensource.org/licenses/Apache-2.0"

        case "GPL-2.0":
            return "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html"

        case "GPL-3.0":
            return "https://www.gnu.org/licenses/gpl-3.0"

        case "MIT":
            return "https://opensource.org/licenses/MIT"
            
        case "WTFPL":
            return "http://www.wtfpl.net/about/"

        default:
            return ""
    }
}

/**
 * Create the License section.
 * If a license was chosen, state which license was chosen.
 * If no license was chosen, state no license was chosen.
 * @param {String} license 
 */
function renderLicenseSection(license) {
    const SYMBOL_SECTION = "##";
    const SYMBOL_LINE_BREAK = "\n\n";

    if (license) {
        return `${SYMBOL_SECTION} License${SYMBOL_LINE_BREAK}This application is covered under the ${license} license${SYMBOL_LINE_BREAK}`
    } else {
        return "No license was chosen"
    }
}


/**
 * Builds the Table of Contents for the README.
 * @returns String containing the table of contents in Markdown
 */
function renderTableOfContents() {
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

/**
 * Takes all the responses from the user and formats it in Markdown notation.
 * @param {Object} data 
 * @returns String containing Markdown notation
 */
function generateMarkdown(data) {
    const SYMBOL_TITLE= "#";
    const SYMBOL_SECTION = "##";
    const SYMBOL_LINE_BREAK = "\n\n";

    let name = data.name;
    let description = data.description;
    let installation = data.installation;
    let usage = data.usage;
    let testing = data.testing;
    let contributing = data.contribution;
    let license = data.license;
    let github = data.github;
    let email = data.email;

    return `${SYMBOL_TITLE} ${name}${SYMBOL_LINE_BREAK}` +
    `${renderLicenseBadge(license)}${SYMBOL_LINE_BREAK}` +
    `${SYMBOL_SECTION} Table of Contents${SYMBOL_LINE_BREAK}${renderTableOfContents()}${SYMBOL_LINE_BREAK}` +
    `${SYMBOL_SECTION} Description${SYMBOL_LINE_BREAK}${description}${SYMBOL_LINE_BREAK}` +
    `${SYMBOL_SECTION} Installation${SYMBOL_LINE_BREAK}${installation}${SYMBOL_LINE_BREAK}` +
    `${SYMBOL_SECTION} Usage${SYMBOL_LINE_BREAK}${usage}${SYMBOL_LINE_BREAK}` +
    `${SYMBOL_SECTION} Tests${SYMBOL_LINE_BREAK}${testing}${SYMBOL_LINE_BREAK}` +
    `${SYMBOL_SECTION} Contributing${SYMBOL_LINE_BREAK}${contributing}${SYMBOL_LINE_BREAK}` +
    `${SYMBOL_SECTION} Questions${SYMBOL_LINE_BREAK}If you want to contact me, you can reach me at ${email} or reach out to me on [GitHub](https://github.com/${github})${SYMBOL_LINE_BREAK}` +
    `${renderLicenseSection(license)}`
}

module.exports = { generateMarkdown };

