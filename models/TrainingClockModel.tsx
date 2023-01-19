import { TimeModel } from "./TimeModel";

interface TrainingClockModel{
    workoutTime: TimeModel;
    restTime: TimeModel;
    seriesCount: number;
}

export default TrainingClockModel;