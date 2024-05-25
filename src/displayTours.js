// This file contains all over the portal work which will be shown to user.
import inquirer from "inquirer";
export let offerclients = [];
export let otherClients = [];
function showPlaces() {
    inquirer
        .prompt([
        {
            type: "list",
            name: "menuOption",
            message: "Welcome to the JourneyJoy Tour Portal! Please choose an option:\n",
            choices: [
                "Offers",
                "Trending destinations",
                "Other places and Out of country tours",
            ],
        },
    ])
        .then((answers) => {
        if (answers.menuOption === "Offers") {
            offers();
        }
        else if (answers.menuOption === "Trending destinations") {
            trendingDestinations();
        }
        else {
            ForiegnCountriesAndOtherPlaces();
        }
    });
}
let offerOptions = [
    {
        name: "Hunza Valley",
        value: "hunzaValley",
        price: 38000,
        discountedPrice: 34000,
        duration: "6 Days and 5 nights",
        validity: "2024-06-22",
        availability: 0,
        groupName: "offerHunza",
    },
    {
        name: "Kalam Valley",
        value: "kalamValley",
        price: 25000,
        discountedPrice: 22500,
        duration: "4 Days and 3 nights",
        validity: "2024-06-25",
        availability: 0,
        groupName: "offerKalam",
    },
    {
        name: "Skardu Valley",
        value: "skarduValley",
        price: 40000,
        discountedPrice: 36500,
        duration: "7 Days and 6 nights",
        validity: "2024-06-30",
        availability: 0,
        groupName: "offerSkardu",
    },
    {
        name: "Neelum Valley",
        value: "neelumValley",
        price: 32500,
        discountedPrice: 28000,
        duration: "7 Days and 6 nights",
        validity: "2024-06-30",
        availability: 0,
        groupName: "offerNeelum",
    },
    {
        name: "Kashmir",
        value: "kashmir",
        price: 27000,
        discountedPrice: 23000,
        duration: "4 Days and 3 nights",
        validity: "2024-06-27",
        availability: 0,
        groupName: "offerKashmir",
    },
    {
        name: "Murree",
        value: "murree",
        price: 56000,
        discountedPrice: 52000,
        duration: "4 Days and 3 nights",
        validity: "2024-06-30",
        availability: 0,
        groupName: "offerMurree",
    },
];
let offerOptionsForChocies = offerOptions.map((option) => ({
    name: `\n• ${option.name}:
Original Price: Rs/-${option.price} --- Discounted Price: Rs/-${option.discountedPrice}
Tour's Duration: ${option.duration} --- Availibility ${option.availability} persons.
Last Date Of Booking ${option.validity}`,
    value: option.value,
}));
async function offers() {
    const { offers } = await inquirer.prompt([
        {
            type: "list",
            name: "offers",
            message: "\nWhere do you want to go?",
            choices: offerOptionsForChocies,
        },
    ]);
    const selectedOffer = offerOptions.find((offer) => offer.value === offers);
    if (selectedOffer) {
        const currentDate = new Date();
        const offerValidity = new Date(selectedOffer.validity);
        if (currentDate <= offerValidity &&
            selectedOffer.availability >= 0 &&
            selectedOffer.availability <= 20) {
            console.log("\nThis offer is still available. You can proceed with booking.\n");
            bookNowOrVisitUs();
        }
        else {
            console.log("\nSorry, this offer is no longer available.");
        }
    }
    else {
        console.log("\nInvalid selection. Please try again.");
    }
}
;
let trendingOptions = [
    {
        name: "Lahore",
        value: "lahore",
        price: 40000,
        duration: "5 Days and 4 nights",
        validity: "2024-07-17",
        availability: 0,
        groupName: "trendLahore",
    },
    {
        name: "Islamabad",
        value: "islamabad",
        price: 45000,
        duration: "6 Days and 5 nights",
        validity: "2024-07-15",
        availability: 0,
        groupName: "trendIslamabad",
    },
    {
        name: "Balochistan",
        value: "balochistan",
        price: 47000,
        duration: "7 Days and 6 nights",
        validity: "2024-07-15",
        availability: 0,
        groupName: "trendBalochistan",
    },
    {
        name: "Peshawar",
        value: "peshawar",
        price: 45000,
        duration: "6 Days and 5 nights",
        validity: "2024-07-10",
        availability: 0,
        groupName: "trendPeshawar",
    },
    {
        name: "Sawat",
        value: "sawat",
        price: 50000,
        duration: "7 Days and 6 nights",
        validity: "2024-07-05",
        availability: 0,
        groupName: "trendSawat",
    },
    {
        name: "Naran Kaghan",
        value: "naranKaghan",
        price: 55000,
        duration: "6 Days and 5 nights",
        validity: "2024-06-30",
        availability: 0,
        groupName: "trendNaranKaghan",
    },
    {
        name: "Karachi",
        value: "karachi",
        price: 45000,
        duration: "6 Days and 5 nights",
        validity: "2024-07-10",
        availability: 0,
        groupName: "trendKarachi",
    },
];
let trendingDestinationOptionsForChocies = trendingOptions.map((option) => ({ name: `\n• ${option.name}:
Package Price: Rs/-${option.price} --- Tour's Duration: ${option.duration}
 Availibility ${option.availability} persons.
Last Date Of Booking ${option.validity}`,
    value: option.value,
}));
async function trendingDestinations() {
    const { trendingDestination } = await inquirer.prompt([
        {
            type: "list",
            name: "trendingDestination",
            message: "\nWhat would you like to explore?",
            choices: trendingDestinationOptionsForChocies,
        },
    ]);
    const selectedDestination = trendingOptions.find((destination) => destination.value === trendingDestination);
    if (selectedDestination) {
        const currentDateForDestination = new Date();
        const destinationValidity = new Date(selectedDestination.validity);
        if (currentDateForDestination <= destinationValidity &&
            selectedDestination.availability >= 0 &&
            selectedDestination.availability <= 20) {
            console.log("\nThis offer is still available. You can proceed with booking.\n");
            bookNowOrVisitUs();
        }
        else {
            console.log("\nSorry, this offer is no longer available.");
        }
    }
    else {
        console.log("\nInvalid selection. Please try again.");
    }
}
;
let otherOptions = [
    {
        name: "Dubai",
        value: "dubai",
        price: 150000,
        duration: "3 Days and 2 nights",
        validity: "2024-06-25",
        availability: 0,
        groupName: "othDubai",
    },
    {
        name: "Istanbul",
        value: "istanbul",
        price: 250000,
        duration: "5 Days and 4 nights",
        validity: "2024-06-30",
        availability: 0,
        groupName: "othIstanbul",
    },
    {
        name: "Paris",
        value: "paris",
        price: 270000,
        duration: "6 Days and 5 nights",
        validity: "2024-07-10",
        availability: 0,
        groupName: "othParis",
    },
    {
        name: "New York",
        value: "newYork",
        price: 250000,
        duration: "4 Days and 3 nights",
        validity: "2024-07-05",
        availability: 0,
        groupName: "othNewYork",
    },
    {
        name: "Bangkok",
        value: "bangkok",
        price: 200000,
        duration: "7 Days and 6 nights",
        validity: "2024-07-15",
        availability: 0,
        groupName: "othBangkok",
    },
    {
        name: "Multan",
        value: "multan",
        price: 50000,
        duration: "8 Days and 7 nights",
        validity: "2024-07-10",
        availability: 0,
        groupName: "othMultan",
    },
    {
        name: "Rawalpindi",
        value: "rawalpindi",
        price: 54000,
        duration: "8 Days and 6 nights",
        validity: "2024-07-15",
        availability: 0,
        groupName: "othRawalpindi",
    },
    {
        name: "Taj Mehal",
        value: "tajMehal",
        price: 150000,
        duration: "5 Days and 4 nights",
        validity: "2024-07-12",
        availability: 0,
        groupName: "othTajMehal",
    },
    {
        name: "London",
        value: "london",
        price: 265000,
        duration: "7 Days and 6 nights",
        validity: "2024-07-07",
        availability: 0,
        groupName: "othLondon",
    },
    {
        name: "Canada",
        value: "canada",
        price: 295000,
        duration: "7 Days and 6 nights",
        validity: "2024-06-25",
        availability: 0,
        groupName: "othCanada",
    },
    {
        name: "South Korea",
        value: "sothKorea",
        price: 300000,
        duration: "7 Days and 6 nights",
        validity: "2024-06-27",
        availability: 0,
        groupName: "othSouthKorea",
    },
    {
        name: "Switzerland",
        value: "switzerland",
        price: 350000,
        duration: "6 Days and 5 nights",
        validity: "2024-07-01",
        availability: 0,
        groupName: "othSwitzerland",
    },
];
let OtherPlacesForChoices = otherOptions.map((option) => ({ name: `\n• ${option.name}:
Package Price: Rs/-${option.price} --- Tour's Duration: ${option.duration}
 Availibility ${option.availability} persons.
Last Date Of Booking ${option.validity}`,
    value: option.value,
}));
async function ForiegnCountriesAndOtherPlaces() {
    const { otherPlaces } = await inquirer.prompt([
        {
            type: "list",
            name: "otherPlaces",
            message: "\nWhich place would you like to visit?",
            choices: OtherPlacesForChoices,
        },
    ]);
    const selectedPlace = otherOptions.find((place) => place.value === otherPlaces);
    if (selectedPlace) {
        console.log(`\nSelected Offer: ${selectedPlace.name}`);
        console.log(`Package Price: Rs/-${selectedPlace.price}`);
        console.log(`Tour's Duration: ${selectedPlace.duration}`);
        console.log(`Availability: ${selectedPlace.availability} persons`);
        console.log(`Last Date Of Booking: ${selectedPlace.validity}`);
        const currentDateForPlace = new Date();
        const placeValidity = new Date(selectedPlace.validity);
        if (currentDateForPlace <= placeValidity &&
            selectedPlace.availability >= 0 &&
            selectedPlace.availability <= 20) {
            console.log("\nThis offer is still available. You can proceed with booking.");
            bookNowOrVisitUs();
        }
        else {
            console.log("\nSorry, this offer is no longer available.");
        }
    }
    else {
        console.log("\nInvalid selection. Please try again.");
    }
    return otherPlaces;
}
;
showPlaces();
async function bookNowOrVisitUs() {
    const { bookNowOrVisitUs } = await inquirer.prompt([
        {
            type: "list",
            name: "bookNowOrVisitUs",
            message: "\nDo you want to make a booking or visit us?",
            choices: ["Book Now", "Visit Us", "Exit"],
        }
    ]);
    if (bookNowOrVisitUs === "Book Now") {
        bookNow();
    }
    else if (bookNowOrVisitUs === "Visit Us") {
        console.log(`\nAddress: Street No 123, Gulistan-e-Johar, Karachi
    Visiting Hours: 9AM to 5PM
    Phone: +923625432523 -- Email: sarazafar453@gmail.com`);
        console.log(`Discover our amazing tours and create lasting memories!`);
        bookingConfirmation();
    }
    else {
        console.log("\nThank You for Visiting Us. Come again!");
        process.exit(0);
    }
}
let allPlaces = offerOptions.concat(trendingOptions).concat(otherOptions);
let AllPlacesForChoice = allPlaces.map((option) => ({
    name: `\n• ${option.name}:
Original Price: Rs/-${option.price} --- Discounted Price : Rs/-${option.discountedPrice}
Tour's Duration: ${option.duration} --- Availibility ${option.availability} persons.
Last Date Of Booking ${option.validity}`,
    value: option.value,
}));
// This function generates a unique id for every tour client
function generateJourneyJoyId() {
    const prefix = "JourneyJoy";
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit nimber
    return `${prefix}${randomNumber}`;
}
async function bookNow() {
    const { userName, email, clientPassword, chosenplace, payment, discountOffer } = await inquirer.prompt([
        {
            type: "input",
            name: "userName",
            message: "\nEnter your name:",
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email here:",
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
            type: "password",
            name: "clientPassword",
            message: "Create a strong password for ticket:",
            mask: "•",
        },
        {
            type: "list",
            name: "chosenplace",
            message: "Choose an option. Which place would you want to explore?\n",
            choices: AllPlacesForChoice,
        },
        {
            type: "list",
            name: "discountOffer",
            message: "Have you choosen the discount offer?",
            choices: ["Yes", "No"],
        },
        {
            type: "list",
            name: "payment",
            message: "Would you like to pay by credit card or debit card?",
            choices: ["Credit Card", "Debit Card"],
        }
    ]);
    const clientCardDetails = await getCardDetails();
    const clientId = generateJourneyJoyId();
    const clients = {
        name: userName,
        id: clientId,
        email: email,
        password: clientPassword,
        chosenPlace: chosenplace,
        groupName: "",
        discountedOffer: discountOffer,
        payment: clientCardDetails,
    };
    let groupNaming = allPlaces.find((place) => {
        place.name === chosenplace;
    });
    if (groupNaming) {
        clients.groupName += groupNaming.groupName;
    }
    else {
        clients.groupName = "";
    }
    if (clients.discountedOffer === undefined) {
        otherClients.push(clients);
    }
    else {
        offerclients.push(clients);
    }
    // This function returns a ticket info to client
    function returnTicket(obj) {
        console.log("\t JourneyJoy Ticket \t");
        console.log(`Place : ${obj.chosenPlace}`);
        console.log(`Client Name:`);
    }
}
async function getCardDetails() {
    const { cardNumber, expiryDate, cardHolderName, amount } = await inquirer.prompt([
        {
            type: "input",
            name: "cardNumber",
            message: "\nEnter your 16-digit card number:",
            validate: (value) => {
                const cardRegex = /^\d{16}$/;
                if (!cardRegex.test(value)) {
                    return "Please enter a valid 16-digit card number.";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "expiryDate",
            message: "Enter expiry date (MM/YY):",
            validate: (value) => {
                const expiryRegex = /^\d{2}\/\d{2}$/;
                if (!expiryRegex.test(value)) {
                    return "Please enter a valid expiry date in MM/YY format.";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "cardHolderName",
            message: "Enter cardholder's name (max 20 characters):",
            validate: (value) => {
                if (value.length > 20) {
                    return "Cardholder's name must be 20 characters or less.";
                }
                return true;
            },
        },
        {
            type: "number",
            name: "amount",
            message: "Enter the payment amount:",
            validate: (amt) => {
                const clientOfferAmount = offerOptions.find((value) => value.discountedPrice === amt);
                const clientTrendingOptionsAmount = trendingOptions.find((value) => value.price === amt);
                const clientOtherPlaceAmount = otherOptions.find((value) => value.price === amt);
                if (clientOfferAmount || clientTrendingOptionsAmount || clientOtherPlaceAmount) {
                    return confirmPayment();
                }
                else {
                    return "Invalid amount. Please choose a valid amount or procceed with full-payment.";
                }
            },
        },
    ]);
    const cardDetails = { cardNumber, expiryDate, cardHolderName, amount };
    return cardDetails;
}
async function confirmPayment() {
    const { confirmPayment } = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirmPayment",
            message: "Confirm payment?",
            default: false,
        }
    ]);
    if (confirmPayment) {
        console.log("\nProcessing Payment......");
        setTimeout(() => {
            console.log("Payment successfully processed!");
        }, 3000);
    }
    else {
        console.log("Payment cancelled.");
        bookNowOrVisitUs();
    }
}
function bookingConfirmation() {
    inquirer.prompt({
        type: "confirm",
        name: "confirm",
        message: "Do you want to take a tour",
        default: false,
    })
        .then((answers) => {
        if (answers.confirm) {
            showPlaces();
        }
        else {
            console.log("Thank You for Visiting Us. Come again!");
            process.exit(0);
        }
    });
}
