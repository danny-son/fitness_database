export default class Meal {
    static meal_id = null;
    static description = '';
    static calories = 0;
    static carbs = 0;
    static protein = 0;
    static fat = 0;

    
    static setUp = (id, description, calories, carbs, protein, fat) => {
        this.meal_id = id;
        this.description = description;
        this.calories = calories;
        this.carbs = carbs;
        this.protein = protein
        this.fat = fat;
    }

    static clear = () => {
        this.meal_id = null;
        this.description = '';
        this.calories = 0;
        this.carbs = 0;
        this.protein = 0;
        this.fat = 0;
    }
}