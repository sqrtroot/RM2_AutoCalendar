import { Document } from "@react-pdf/renderer";
import { DayPage } from "./components/DayPage";
import { Appointment } from "./data/Appointment";
export const Calendar = (props:{year: number}) => {
  return (
    <Document>
      <DayPage
        day={new Date(props.year, 0, 1)}
        appointments={[
          new Appointment("Meeting", "Meeting room", new Date(props.year, 0, 1, 9, 0), new Date(props.year, 0, 1, 10, 0)),
        ]}
      />
    </Document>
  );
};