## Recipe structure
```
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "ingredients": [
    {
      "name": String,
      "quantity": Number,
      "unit": String
    }
  ],
  "instructions": [String], // Array of steps
  "prepTime": Number, // In minutes
  "cookTime": Number, // In minutes
  "servings": Number,
  "imageUrl": String,
  "category": String, Enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"],
  "createdAt": Date,
}

```

## User structure
```
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "passwordHash": String,
  "createdAt": Date,
  "updatedAt": Date,
  "favoriteRecipes": [ObjectId], // References to Recipes
}
```
