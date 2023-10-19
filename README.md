# README Generator

## Description

The purpose of this repo is to help developers create their README files easier and faster. It'll create a README that will have the following sections: project title, Description, Installation, Usage, Tests, Contributing, Questions, and License.

This is achieved by using the node package, [inquirer](https://www.npmjs.com/package/inquirer). Inquirer allows the user to be prompted in the command line, given the questions and choices inside a .js file.

### How it works

For sections Description, Installation, Usage, Tests, and Contributing, the user is asked to use their default text editor and write out what they want. So, when the user is talking about the Usage section, they can type out bullet points, numbered lists, use back ticks ( ` ) for code blocks, etc. Once they save and close that editor, the code will store that information until the user is finished.

For the license section, the user is provided with a few most popuplar license options and the option for "no license." If a license is chosen, the user will have the corresponding badge at the top of the README right under the project title.

When asked for the GitHub username and email, both have to pass validation checks in order to continue on. The GitHub validation will use the ```fetch()``` Web API to check GitHub's API if that's a valid username or not. For the email validation, it must past a ```String().match()``` check which uses Regex to see if the email is of a valid format.

## Installation

1. Make sure node.js is installed on your computer. If you don't have it installed, you can get it [here](https://nodejs.org/en/download).
2. Download/clone the code from the repo.

## Usage

1. Open the Terminal or Command Prompt.
2. Navigate to the directory where the code was downloaded/cloned into.
3. Run the following code

```bash
node index.js
```

4. Answer the following prompts until finished.
5. Once finished, the README is generated in the same directory as the code. 
6. Delete the ".generated" portion of the README, and you're good!

## Video Walkthrough

<iframe src="https://drive.google.com/file/d/1KwxrUNZqVJEwGMtYE4eeA3cdM-O1qRaI/view?usp=share_link" title="App walkthrough" width="680" height="480"><iframe>

## Credits

[Validating Email Address](https://stackoverflow.com/a/46181)

### Resources

[GitHub get a user](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user)

[GitHub list of licenses](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)

[GitHub license badges](https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba#apache-20-license)

