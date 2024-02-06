# Stack

I have decided to use Playwright with Typescript for this project, because of the advantages that Typescript has over Javascript, such as the usage of types and better code organization. When installing Playwright it comes with Typescript installed out of the box, so I see this as one of its advantages.

# Project setup

I have forked the sample app from the saucelab repo and worked on top of it. I have done this so that I can leverage over the access to the source code itself, in case I need to add test ids.

Since the app is a bit old, at the beginning I had to do some cleanup, such as updating some packages that are being used. The repo already had some e2e tests in it, so I removed all of them and all packages related to it, so that I can start clean.

I have also installed all the necessary packages for my new e2e tests, just as: playwright, eslint, prettier, etc. The project already had some linter rules, but for simplicity purposes and so that I can also add the rules I think suit me best, I have created new config files for eslint and prettier.

I have also created scripts that help you with running the e2e tests and environment setup.

Lastly, I have created some git hooks that run pre-commit, and contain the scripts for eslint and prettier. Please note that they are configured to only lint the e2e tests, and not the source code.

# End-to-end tests architecture

Playwright, just like Cypress, has one of the best documentation I have seen in my career. It's very easy to start, only by following their guidelines and best practices. The installation takes literally, just one command.

My project has the following main folders:

- `consts`, where I have saved consts used in different tests, such as user credentials and items.
- `pages`, where I have the page objects for each screen of the app. I believe that by using page objects we are achieving better readability, easier use and later maintenance.
- `specs`, where all the tests are saved. Since the app is pretty simple and small I didn't create subfolders for different areas of the app, but that is something I would do for bigger applications.
- `types`, contains files with custom types, aka interfaces I needed to use in the tests. In this case there is only one `UserInterface`, but we can have more if needed. Due to the simplicity of the app, we only needed this one.

# End-to-end tests

All tests are independent from each other and can be run in any order.

Preferred method for locating elements is by text of the elements or data tests ids, that are added to the elements.

# How to run the tests

1. Clone the repo
2. `npm install` - installs all the dependencies that need to run the application and the e2e tests. Note: since the code for the app is older, some of the packages are outdated, so you might see some warnings.
3. `npm run start` - starts the app locally, at port 3000
4. `npm run playwright:test`- starts Playwright and runs all the tests in the `e2e/specs` folder

If you'd like to debug/observe the steps the tests are performing, you can do that by running the following command `npm run playwright:test:ui`.
If you'd like to see the report generated for the tests, you can do that by running the following command `npm run playwright:test:report`.
