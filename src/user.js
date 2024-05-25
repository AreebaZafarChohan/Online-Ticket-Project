//This file contains user's registeration or sign in functionalities and generate unique id for every user.
import inquirer from "inquirer";
class UserRegistrationOrSignIn {
    users = [];
    // Function to generate a 6-digit unique ID for every user
    generateUserId() {
        const length = 6;
        let uniqueId = "";
        for (let i = 0; i < length; i++) {
            const digit = Math.floor(Math.random() * 10); // Generate a random digit between 0 to 9
            uniqueId += digit.toString();
        }
        return uniqueId;
    }
    // Function to simulate user registeration
    registeration() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter your first name:",
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter your last name:",
            },
            {
                type: "input",
                name: "birthday",
                message: "Please enter your birthday (YYYY-MM-DD):",
                validate: (input) => {
                    const checkDateFormat = /^\d{4}-\d{2}-\d{2}$/;
                    if (!checkDateFormat.test(input)) {
                        return "Please enter date in correct format YYYY-MM-DD";
                    }
                    return true;
                },
            },
            {
                type: "input",
                name: "email",
                message: "Enter your email address:",
                validate: (input) => {
                    const emailRegex = /^[^\s@]{1,64}@gmail\.com$/;
                    if (!emailRegex.test(input)) {
                        return "Please enter a valid email address.";
                    }
                    // Verify total length of email address
                    if (input.length > 254) {
                        return "Email address length cannot exceed 254 characters.";
                    }
                    return true;
                },
            },
            {
                type: "list",
                name: "gender",
                message: "Enter your gender:",
                choices: ["Male", "Female", "Other"],
            },
            {
                type: "input",
                name: "mobileNumber",
                message: "Please enter your mobile number (optional, 11 digits):",
                validate: (input) => {
                    // Allow empty input for optional field
                    if (input.trim() === "") {
                        return true;
                    }
                    // Regular expressionto match a valid mobile number (11 digits)
                    const mobileNumber = parseInt(input);
                    if (isNaN(mobileNumber) || !/^\d{11}$/.test(input)) {
                        return "Please enter a valid 11-digit mobile number or leave it blank.";
                    }
                    return true;
                },
            },
            {
                type: "password",
                name: "userPassword",
                message: "Create your PIN:",
                mask: "•",
            },
        ])
            .then((answers) => {
            const userId = this.generateUserId();
            const newUser = {
                userId: userId,
                firstName: answers.firstName,
                lastName: answers.lastName,
                birthDay: answers.birthDay,
                email: answers.email,
                gender: answers.gender,
                mobileNumber: answers.mobileNumber,
                password: answers.userPassword,
            };
            this.users.push(newUser);
            console.log(`Thank you for registering! Your user ID is: ${userId}. Please remember it for login.`);
        });
    }
    // Function to simulate user signin
    signIn() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "userId",
                message: "Enter your user ID:",
            },
            {
                type: "password",
                name: "UserPassword",
                message: "Enter your PIN:",
                mask: "•",
            },
        ])
            .then((answers) => {
            const user = this.users.find((u) => u.userId === answers.userId && u.password === answers.userPassword);
            if (user) {
                console.log(`Login successful. Welcome back to the JourneyJoy Tours ${user.firstName} ${user.lastName}.`);
            }
            else {
                console.log(`Invalid user ID or Password. Please try again.`);
                this.signIn();
            }
        });
    }
    // From here the application is start
    start() {
        console.log("\n Welcome to the JourneyJoy Tours \n");
        inquirer
            .prompt([
            {
                type: "list",
                name: "option",
                message: "Do you want to register or signin?",
                choices: ["Register", "Signin"],
            },
        ])
            .then((answers) => {
            if (answers.option === "Register") {
                this.registeration();
            }
            else {
                this.signIn();
            }
        });
    }
}
// Create an instance of the UserRegistrationOrSignIn class and start the application
const startApplication = new UserRegistrationOrSignIn();
startApplication.start();
