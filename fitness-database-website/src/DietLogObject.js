export default class DietLog {
    static diet_id = null;
    static date = null;
    static description = null

    static setUp = (id,date, description) => {
        this.diet_id = id;
        this.date = date;
        this.description = description;
    }

    static clear = () => {
        this.diet_id = null;
        this.date = null;
        this.description = null;
    }
}