export default class WorkoutLog {
    
    static log_id = null;
    static workout = '';
    static date = null;
    static description = '';
    static minutes = 0;

    
    static setUp = (id, workout, date, description, length) => {
        this.log_id = id;
        this.workout = workout;
        this.date = date;
        this.description = description;
        this.minutes = length;
    }

    static clear = () => {
        this.log_id = null;
        this.workout = '';
        this.date = null;
        this.description = '';
        this.minutes= 0;
    }
    
}