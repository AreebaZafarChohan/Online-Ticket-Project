// This file contains all CURD options for our tour clients

import inquirer from "inquirer";
import { offerclients, otherClients } from "./displayTours.js";

// This login function is for those pepole who have booked a tour

async function clientSignIn() {
    const {clientName, id, password} = await inquirer.prompt([
        {
            type: "input",
            name: "clientName",
            message: "Enter your username:",
        },
        {
            type: "input",
            name: "id",
            message: "Enter your ticket id:",
        },
        {
            type: "password",
            name: "password",
            message: "Enter your ticket password:",
            mask: "•",
        }
    ])
    const allClients = offerclients.concat(otherClients)
    const signInClient = allClients.find((user) => user.id === id && user.password === password);

    if (signInClient) {
        console.log("Login successfull!");
    } else {
        console.log("Invalid userID or password. Please try again");
    }
}

clientSignIn();