import { useState, Fragment, SetStateAction } from "react";
import moment from "moment";
import TimeRange from "react-time-range";

const Time = () => {
  const pickupTimeEarliest = moment()
    .startOf("day")
    .add(30, "minutes")
    .format();
  const pickupTimeLatest = moment()
    .endOf("day")
    .subtract(30, "minutes")
    .format();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startTime, setStartTime] = useState(pickupTimeEarliest);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [endTime, setEndTime] = useState(pickupTimeLatest);

  const start = (event: { startTime: SetStateAction<string>; }) => setStartTime(event.startTime);
  const end = (event: { endTime: SetStateAction<string>; }) => setEndTime(event.endTime);

  console.log({ moment: moment().startOf("day").format() });

  return (
    <Fragment>
      <TimeRange
        onStartTimeChange={start}
        onEndTimeChange={end}
        startMoment={startTime}
        endMoment={endTime}
        minuteIncrement={30}
        startLabel={null}
        endLabel={null}
        use24Hours={true}
      />
    </Fragment>
  );
}

export default Time;


