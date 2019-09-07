const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "Bamazon"

});



connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadID);
});

let displayProducts = function () {
    let query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("res", res);
        purchasePrompt();
    });
}

function purchasePrompt() {
    inquirier.prompt([
        {
            name: "ID",
            type: "input",
            message: "Enter ID to buy",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How mant would you like?",
            filter: Number
        },
    ]).then(function (anwsers) {
        const quantityNeeded = anwsers.Quantity;
        const IDrequested = anwsers.ID;
        purchaseOrder(IDrequested, quantityNeeded);
    });
};

function purchaseOrder(ID, amtNeeded) {
    connection.query(`Select * FROM products Where item_id = ${ID}`, function (err, res) {
        if (err) { console.log(err) };
        if (amtNeeded <= res[0].stock_quantity) {
            var totalCost = res[0].price * amtNeeded;
            console.log("Your product is in stock!");
            console.log("Your total is " + amtNeeded + " " + res[0].product_name + " is " + totalCost);

            connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${amtNeeded} WHERE item_id = ${ID}`);
        } else {
            console.log("Your product is out of stock" + res[0].product_name + "please visit soon for restock!");
        };
        displayProducts();
    });
};

displayProducts();

//--------------------------------------
//--------------------------------------
//--------------------------------------
//--------------------------------------
//--------------------------------------

// const mysql = require("mysql");
// const inquirer = require("inquirer");
// // const Table = require("cli-table2");


// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "bamazon"
// });


// connection.connect(err => {
//     if (err) {
//         throw err;
//     }
//     console.log(`connected as id ${connection.threadId}\n`);
// });


// var display = () => {
//     connection.query("SELECT * FROM products", function (err, res) {// running a query against the db and selecting all the fields from the products table
//         if (err) throw err;
//         console.log("Find the list of products below");

//         var table = new Table({
//             head: ["Id", "Product Description", "Cost", "Quantity",],
//             colWidths: [5, 25, 12, 8],
//             colAligns: ["center", "left", "left", "left"],
//             style: {
//                 head: ["aqua"],
//                 compact: true
//             }
//         });
//         for (var i = 0; i < res.length; i++) {
//             table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity,]);
//         }
//         console.log(table.toString());
//         customerInquiry();
//     });
// };

// customerInquiry = () => {
//     inquirer.prompt([
//         {
//             name: "item_id",
//             type: "input",
//             message: "what's the the ID of the product you would like to buy?",
//         },
//         {
//             name: "quantity",
//             type: "input",
//             message: "Please enter the number of items you wish to buy:"
//         }
//     ]).then(function (answer) {
//         connection.query("SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?", { item_id: answer.item_id }, function (err, res) {
//             if (err) throw err;
//             if (res[0].stock_quantity >= answer.quantity) {
//                 let itemsRemaining = res[0].stock_quantity - answer.quantity;
//                 let purchaseTotal = answer.quantity * res[0].price;
//                 connection.query(`UPDATE products SET stock_quantity=${itemsRemaining} WHERE item_id=${answer.item_id}`,
//                     function (err, res) {
//                         if (err) throw err;
//                         console.log(`Your total is: ${purchaseTotal}`);
//                         connection.end();
//                     });
//             }
//             else {
//                 console.log("Quantity requested exceeds available inventory for this product.");
//                 getStoreInfo();
//             }
//         })
//     })
// }
// display();