# Stack

I have decided to use Cypress with Typescript for this project, because of the advantages that Typescript has over Javascript, such as the usage of types and better code organization.

# Project setup

I have forked the sample app from the saucelab repo and worked on top of it. I have done this so that I can leverage over the access to the source code itself, in case I need to add test ids.

Since the app is a bit old, at the beginning I had to do some cleanup, such as updating some packages that are being used. The repo already had some e2e tests in it, so I removed all of them and all packages related to it, so that I can start clean.

I have also installed all the necessary packages for my new e2e tests, just as: cypress, typescript, eslint, prettier, etc. The project already had some linter rules, but for simplicity purposes and so that I can also add the rules I think suit me best, I have created new config files for eslint and prettier.

I have also created scripts that help you with running the e2e tests and environment setup.

Lastly, I have created some git hooks that run pre-commit, and contain the scripts for eslint and prettier. Please note that they are configured to only lint the e2e tests, and not the source code.

# End-to-end tests architecture

I must say that I believe Cypress has one of the best documentation I have seen in my career. It's very easy to start, only by following their guidelines and best practices.

My project has the following main folders:

- `consts`, where I have saved consts used in different tests, such as user credentials and selectors. Cypress recommends not having page obejcts, but I also didn't want to simply hard code the selectors in the tests themselves, so I created a const that has all the selectors there. Initially, I had them in the tests, but then I realized that multiple tests interact with the same elements, so I needed to look for a solution and came up with this. If the app is bigger and has more screens, we can have multiple consts per page or maybe data objects.
- `e2e`, where all the tests are saved. Since the app is pretty simple and small I didn't create subfolders for different areas of the app, but that is something I would do for bigger applications.
- `support`, contains the `e2e.ts` file that has functions, such as the `beforeEach()` that runs before each test. We can also have here other functions like `afterEach()`, `beforeAll()`, etc. It's important to note that these functions are executed for each test file. The `index.ts` file in this folder contains custom Cypress commands, such as `login` or `getByDataTestId` which helps us locate elements by the data test ids that are added in the source code.
- `types`, contains files with custom types, aka interfaces I needed to use in the tests. In this case there is only one `UserInterface`, but we can have more if needed. Due to the simplicity of the app, we only needed this one.

# End-to-end tests

All tests are independent from each other and can be run in any order. As mentioned above, the tests follow the Cypress guidelines and I did not create page objects.

Preferred method for locating elements is by text of the elements or data tests ids, that are added to the elements.

# How to run the tests

1. Clone the repo
2. `npm install` - installs all the dependencies that need to run the application and the e2e tests. Note: since the code for the app is older, some of the packages are outdated, so you might see some warnings.
3. `npm run start` - starts the app locally, at port 3000
4. `npm run cy:test`- starts Cypress and runs all the tests in the `cypress/e2e` folder
