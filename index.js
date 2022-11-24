const contactOperations = require("./contacts.js");
const argv = require("yargs").argv;
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// console.log(argv);

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await contactOperations.listContacts();
            console.table(contacts);
            break;
        
        case "get":
            const contactById = await contactOperations.getContactById(id);

            if (!contactById) {
                throw new Error(`Contact with id - ${id}, not found.`);
            }

            console.log(contactById);
            break;

        case "add":
            const newContact = await contactOperations.addContact(
                name,
                email,
                phone
            );
            console.log(newContact);
                break;

        case "remove":
            const removeContact = await contactOperations.removeContact(id);
            console.log(removeContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
        }
}

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "5" });

(async () => {
    await invokeAction(argv);
})();

// invokeAction(argv);