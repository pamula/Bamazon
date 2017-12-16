var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require('prompt');

// padText is to format the table to look better//

var padText = require('./padTable.js');


var connection = mysql.createConnection({
	host:"localhost",
	port:3306,

	// your username//
	user:"root",
	password:"JSFpsDr143",
	database: "BamazonDB"
});
connection.connect(function(err){
	if(err) throw err;
	console.log("connected as id" + connection.threadId);
	runSearch();
});

function runSearch(){
	inquirer
	.prompt([
	{
		name: "action",
		type: "list",
		message: "what would you like to do?",
		choices: [
		"view products for sale",
		"view Low Inventory",
		"Add To Inventory",
		"Add New Product"]
	}
	
// 	{
// 	name: "item",
// 	type:"input",
// 	message:"what would you like to add",
// 	choice:'Add To Inventory'

// }
		
		// console.log(action)

	])
	.then(function(answer){
		switch(answer.action){
			case "view products for sale":
			viewSearch();
			break;

			case "view Low Inventory":
			viewLowInventory();
			break;

			case "Add To Inventory":
			addToInventory();
			break;

			case "Add New Product":
			addNewProduct();
			break;

		}
	});
}

function viewSearch(){

	connection.query('SELECT * FROM Products', function(err, res){



  // Error Handler

  if(err) throw err;





  // Show User message

  console.log('Check out our selection...\n');



  // Set up table header

  console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');

  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')

  

  // Loop through database and show all items

  for(var i = 0; i < res.length; i++){



    // ---------- Add in padding for table ----------

    var itemID = res[i].ItemID + ''; // convert to string

    itemID = padText("  ID  ", itemID);



    var productName = res[i].ProductName + ''; // convert to string

    productName = padText("      Product Name      ", productName);



    var departmentName = res[i].DepartmentName + ''; // convert to string

    departmentName = padText("  Department Name  ", departmentName);



    var price = '$' + res[i].Price.toFixed(2) + ''; // convert to string

    price = padText("   Price  ", price);



    var quantity = res[i].StockQuantity + ''; // convert to string (no need to pad)

    // ----------------------------------------------



    // Log table entry

    console.log(itemID + '|' + productName + '|' + departmentName + '|' + price + '|' + quantity);

}
runSearch();



  // =================================================================================================


});

}



function viewLowInventory(answer){

	

	var query = "SELECT * FROM Products WHERE StockQuantity < 5";

	connection.query(query,function(err,res){
		if(err) throw err;

		 console.log('  ID  |      Product Name      |  Department Name | In Stock');

    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')

    

	for(var i=0; i<res.length; i++){

		 var itemID = res[i].ItemID + ''; // convert to string

    itemID = padText("  ID  ", itemID);



    var productName = res[i].ProductName + ''; // convert to string

    productName = padText("      Product Name      ", productName);



    var departmentName = res[i].DepartmentName + ''; // convert to string

    departmentName = padText("  Department Name  ", departmentName);

     var quantity = res[i].StockQuantity + ''; 

     console.log( itemID + '|' + productName + '|' + departmentName + '|' + quantity);


		// runSearch();	
	}
	runSearch();

	});

}

// ----------------------------------------------------------------------------------------------------////

// Add to Inventory////


  

  // Running the View Products Function (case 1) and then asking user for unput after callback

  // viewSearch(function(){



    // Prompt user for re-stock item

    prompt.start();
    function addToInventory(){

    console.log('\nWhich item do you want to restock?');

    prompt.get(['restockItemID'], function (err, result) {

      

      // Show Item ID selected

      var restockItemID = result.restockItemID;

      console.log('You selected to re-stock Item # ' + restockItemID + '.');



      // Prompt for how many more items

      console.log('\nHow many items will you restock?');

      prompt.get(['restockCount'], function(err, result){

        

        //Show Restock Count selected

        var restockCount = result.restockCount;

        console.log('You selected to re-stock ' + restockCount + ' items.');

        restockCount = parseInt(restockCount); // convert to integer



        if(Number.isInteger(restockCount)){



          // Query for current item inventory

          connection.query('SELECT StockQuantity FROM Products WHERE ?', [{ItemID: restockItemID}], function(err, res){



            // Check if the item Id was valid (i.e. something was returned from mySQL)

            if(res[0] == undefined){

              

              console.log('Sorry... We found no items with Item ID "' +  restockItemID + '"');

              connection.end(); // end the script/connection



            }

            // Valid Item ID, so add Bamazon Inventory with stowing quantity <-- more Bamazon lingo ;)

            else{

              

              var bamazonQuantity = res[0].StockQuantity;

              var newInventory = parseInt(bamazonQuantity) + parseInt(restockCount); // ensure integers



              // Update Database with new items

              connection.query('UPDATE Products SET ? WHERE ?', [{StockQuantity: newInventory}, {ItemID: restockItemID}], function(err, res){

                if(err) throw err; // Error Handler



                console.log('\nInventory updated successfully! How customer-centric!')
                 // Inside jokes for days!
                 console.log(newInventory);

                connection.end(); // end the script/connection



              }); // end inventory update query

            

            }



          }); // end current quantity query

        }

        else{

          console.log('Only whole items can be added. Integers only!')

          connection.end(); 
         // end the script/connection

         runSearch();

        }



      }); // end prompt 2 (amount to add)



    }); // end prompt 1 (item id)



  } // end case 1 callback







// ---------------------------------------------------------------------------------



// Add New Product

function addNewProduct(){
	 // Prompt user for new item details

  prompt.start();

  console.log('\nComplete the new product details:');

  prompt.get(['ProductName', 'DepartmentName', 'Price', 'Quantity'], function (err, result) {



    // Collect/parse variables

    var productName = result.ProductName;

    var departmentName = result.DepartmentName;

    var price = result.Price;

    var quantity = result.Quantity;



    // Update Database

    connection.query('INSERT INTO Products SET ?', {

      ProductName: productName,

      DepartmentName: departmentName,

      Price: price,

      StockQuantity: quantity

    }, function(err, res){



      // Slighly more refined Error Handler

      if(err){

        console.log('\nSorry. The SQL database could not be updated.\n' +

          'Please ensure you entered the price and quantity as numbers!');

        connection.end(); // end the script/connection

      }

      else{

        console.log('\nInventory updated successfully!')

        connection.end(); // end the script/connection

      }



    });



  });



}

