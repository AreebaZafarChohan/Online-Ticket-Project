// This file contains admin portal work

import inquirer, {PromptModule, QuestionCollection} from "inquirer";
import { main } from "./main.js";
import { offerOptions, trendingOptions, otherOptions, allClients,
     Clients, allPlacesForChoice, Offer} from "./displayTours.js";
import chalk from "chalk";     

// Declare admin ID and password
let myId: string = "JourneyJoyna157";
let myPassword: string = "AreNab157";

// Function to login admin functions based on admin ID and password
export async function adminLogin(): Promise<void> {
    console.log(chalk.bgMagenta.bold("\nAdmin Portal\n"));
    const {adminName, adminId, adminPassword} = await inquirer.prompt([
        {
            type: "input",
            name: "adminName",
            message: chalk.cyan("Enter your username:"),
        },
        {
            type: "input",
            name: "adminId",
            message: chalk.cyan("Enter your ID:"),
        },
        {
            type: "password",
            name: "adminPassword",
            message: chalk.cyan("Enter your password:"),
            mask: "•",
        }
    ]);
    if (adminId === myId && adminPassword === myPassword) {
        console.log("\nLogin successfull!\n");
        console.log(chalk.underline.yellow(`\n \t Hey ${adminName}! Welcome to Admin Portal. \t \n`))
        adminPortal();
    } else {
        console.log(chalk.red.bold("Invalid userID or password. Please try again"));
        return main();
    }
}

// Function to show list of options for admin that which work he/she want to do
async function adminPortal(): Promise<void> {
    const {action} = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: chalk.green("Choose an action:"),
            choices: [
                "Add a Tour",
                "Remove a tour",
                "Remove a User",
                "Update Tour Information",
                "View All Clients",
                "View All Tours",
                "Logout"
            ],
        },
    ]);

    switch (action) {
        case "Add a Tour":
            addTour();
            break;

        case "Remove a tour":
            removeTour();
            break;
            
        case "Remove a User":
            removeUser();
            break;

        case "Update Tour Information":
            updateTourInfo();
            break;   

        case "View All Clients":
            viewAllClients();
            break;  

        case "View All Tours":
            viewAllTours();
            break;  

        case "Logout":
            console.log("");
            main();
            return; 
    }
}

// Concate separate places of tours list in one list of tour
let allPlaces: Offer[] = offerOptions.concat(trendingOptions).concat(otherOptions);

// Function to add tour in list of tour based on separate tours condtion
async function  addTour(): Promise<void> {
    const newTour = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: chalk.magenta("Enter the name of place:"),
        },
        {
            type: "number",
            name: "price",
            message: chalk.magenta("Enter the price:"),
        },
        {
        type: "number",
        name: "discountedPrice",
        message: chalk.magenta("Enter the discounted price (if it is offer):"),
        },
        {
            type: "input",
            name: "validity",
            message: chalk.magenta("Enter the validity (e.g. 2024-06-22):"),
        },
        {
            type: "input",
            name: "duration",
            message: chalk.magenta("Enter the duration (e.g. 6 Days and 5 nights):"),
        },
        {
            type: "input",
            name: "groupName",
            message: chalk.magenta("Enter the group name:"),
        },
    ]);

    let {name, value, price, discountedPrice, validity, duration, groupName } = newTour; 
    let addNewTour = {
        name: name,
        value: name,
        price: price,
        discountedPrice: discountedPrice,
        validity: validity,
        duration: duration,
        groupName: groupName,
    }
    allPlaces.push(addNewTour);
    console.log(chalk.green.bold("\nTour added successfully!\n"));
    adminPortal();
 }

 // Function to remove tour in list
async function removeTour(): Promise<void> {
    const {placeName} = await inquirer.prompt([
        {
            type: "list",
            name: "placeName",
            message: chalk.green("Choose place to remove:"),
            choices: allPlaces.map((place) => (
                {name: `${place.name} - Validitiy: ${place.validity}`, value: place.name})),
        }
    ]);

    const index = allPlaces.findIndex(place => place.name === placeName); 
    if (index !== -1) {
        allPlaces.splice(index, 1);
        console.log(chalk.green.bold(`\n${placeName} tour removed successfully!\n`));
        adminPortal();
    } else {
        console.log(chalk.red.bold("\nTour not found!\n"));
        return adminPortal();
    }
} 

// Function to remove user in list
async function removeUser(): Promise<void> {
    const {id} = await inquirer.prompt([
        {
            type: "list",
            name: "id",
            message: chalk.green("Select user to remove:"),
            choices: allClients.map((user) => ({
                name: `placeName: ${user.chosenPlace} -- clientName: ${user.name}
               clientId: ${user.id} -- payment: ${user.payment.amount.toFixed(2)}
               posponed: ${user.postponed} -- cancelled: ${user.cancel}`, value: user.id
            })),
        }
    ]);
    const removeClient = (clientArray: Clients[]) => {
        const index = clientArray.findIndex(client => client.id === id)
        if (index !== -1) {
            clientArray.splice(index, 1);
            return true;
        } 
        return false;
    } 
    const removedClient = removeClient(allClients);
    if (removedClient) {
        console.log(chalk.green.bold("\nUser removed successfully\n"));
        adminPortal();
    } else {
        console.log(chalk.red.bold("\nUser not found!\n"));
        return adminPortal();
    }
}

// Function to update tour from in list of tours
async function updateTourInfo(): Promise<void> {
    const {placeName} = await inquirer.prompt([
        {
            type: "list",
            name: "placeName",
            message: chalk.green("Choose the place to update:\n"),
            choices: allPlacesForChoice,
        }
    ]);
    const tour = allPlaces.find((place) => place.name === placeName);
    if (!tour) {
        console.log(chalk.red.bold("Tour not found.\n"));
        return adminPortal();
    }

    const {tourToUpdate} = await inquirer.prompt([
        {
            type: "list",
            name: "tourToUpdate",
            message: chalk.cyan("\nWhich field would you like to update?"),
            choices: ["Validity", "Price", "Duration"],
        },
    ]);

    if (tourToUpdate === "Validity") {
        const {newValidity} = await inquirer.prompt([
            {
                type: "input",
                name: "newValidity",
                message: chalk.yellow("Enter the new validity (e.g. 2024-06-22):"),
            },
        ]);
        tour.validity = newValidity;
        console.log(chalk.green.bold("\nTour validity updated successfully!\n"));
        adminPortal();
    } else if (tourToUpdate === "Price") {
        const {newPrice} = await inquirer.prompt([
            {
                type: "number",
                name: "newPrice",
                message: chalk.yellow("Enter the new price:"),
            },
        ]);
        tour.price = newPrice;
        console.log(chalk.green.bold("Tour price updated successfully!\n"));
        adminPortal();
    } else if (tourToUpdate === "Duration") {
        const {newDuration} = await inquirer.prompt([
            {
                type: "input",
                name: "newDuration",
                message: chalk.yellow("Enter the new duration (e.g. 4 days 3 nights):"),
            },
        ]);
        tour.duration = newDuration;
        console.log(chalk.green.bold("Tour duration updated successfully!\n"));
        adminPortal();
    }
}

// Function to view all clients
async function viewAllClients(): Promise<void> {
    console.log(chalk.cyan.underline.bold("\n  \tList of All Clients\t  \n"));
    if (allClients.length === 0) {
        console.log(chalk.bold.blue("List of client is empty!\n"));
    } else {
        for (const client of allClients) {
            console.log(chalk.bold.yellow(`Place : ${client.chosenPlace}`));
            console.log(chalk.bold.yellow(`Client Name: ${client.name}`));
            console.log(chalk.bold.yellow(`Client ID: ${client.id}`));
            console.log(chalk.bold.yellow(`Email: ${client.email}`));
            console.log(chalk.bold.yellow(`Gender: ${client.gender}`));
            console.log(chalk.bold.yellow(`Mobile Number: ${client.mobileNumber}`));
            console.log(chalk.bold.yellow(`Group Name: ${client.groupName}`));
            console.log(chalk.bold.yellow(`Discounted Offer: ${client.discountedOffer}`));
            console.log(chalk.bold.yellow(`Last date of booking: ${client.validity}`));
            console.log(chalk.bold.yellow(`Tours Duration: ${client.duration}`));
            console.log(chalk.bold.yellow(`Payment: $${client.payment.amount}`));
            console.log(chalk.bold.yellow(`Payment Card Number: ${client.payment.cardNumber}`));
            console.log(chalk.bold.yellow(`Expiry Date: ${client.payment.expiryDate}`));
            console.log(chalk.bold.yellow(`Card Holder Name: ${client.payment.cardHolderName}`));
            console.log(chalk.bold.yellow(`Postponed Tickect: ${client.postponed}`));
            console.log(chalk.bold.yellow(`Cancelled Ticket: ${client.cancel}`));
            console.log(chalk.bold.magenta("------------------------------------\n"));
        }
    }
    
    console.log("\n");
    adminPortal();
}

// Function to view all tours
async function viewAllTours(): Promise<void> {
    console.log(chalk.cyan.bold("\n\tList of All Tours\t\n"));
    allPlaces.forEach(tour => {
        console.log(chalk.bold.yellow(`Place Name: ${tour.name}`));
        console.log(chalk.bold.yellow(`Price: ${tour.price}`));
        console.log(chalk.bold.yellow(`Discounted Price: ${tour.discountedPrice || 'N/A or Undefined'}`));
        console.log(chalk.bold.yellow(`Validity: ${tour.validity}`));
        console.log(chalk.bold.yellow(`Duration: ${tour.duration}`));
        console.log(chalk.bold.yellow(`Group Name: ${tour.groupName}`));
        console.log(chalk.bold.magenta("------------------------------------\n"));
    });
    console.log("\n");
    adminPortal();
}