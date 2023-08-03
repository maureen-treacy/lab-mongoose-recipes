const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI ='mongodb://127.0.0.1/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    const newRecipe = {title: "Cheese Pizza", 
      level: "Easy Peasy",
      ingredients: ["Pre-made Dough","Tomato Sauce","Cheese"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://preppykitchen.com/wp-content/uploads/2021/10/Cheese-Pizza-Feature.jpg",
      duration: 27,
      creator: "Poppy Kitchen",
  }

    const newRecipeDb = Recipe.create(newRecipe)
    // console.log(newRecipe.title)

    let insertedRecipes= await Recipe.insertMany(data);
    // console.log(insertedRecipes.title)

    let updatedRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})

    let deletedRecipe = await Recipe.deleteOne({title: "Carrot Cake"})

    let databaseClose = await mongoose.connection.close(MONGODB_URI);
    console.log("Closed Database")


    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
