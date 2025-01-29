import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import { getDayOfYear, intlFormat, add as addDay } from "date-fns";

class Appointment {
  summary: string;
  location: string;
  start: Date;
  end: Date;
  constructor(summary: string, location: string, start: Date, end: Date) {
    this.summary = summary;
    this.location = location;
    this.start = start;
    this.end = end;
  }
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  timetableContainer: {
    border: "1pt solid black",
    width: "50%",
    height: "100%",
  },
  timeSlot: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  timeText: {
    fontSize: 12,
  },
  todoContainer: {
    width: "50%",
    height: "50%",
    border: "1pt solid black",
    borderLeft: "none",
  },
});

// Helper function to generate hours
const generateHours = (
  start: number,
  end: number,
  step: number = 1
) => {
  const hours = [];
  const height = `${100 / (end - start)}%`;
  for (let i = start; i <= end; i++) {
    const formattedHour = `${i}:00`;
    hours.push(
      <View
        style={[
          styles.timeSlot,
          {
            height: height,
            borderBottom: i === end ? "none" : "1pt solid black",
          },
        ]}
        key={i}
      >
        <Text style={styles.timeText}>{formattedHour}</Text>
      </View>
    );
  }
  return hours;
};

const DayPage = (props: { day: Date; appointments: Appointment[] }) => {
  const hours = generateHours(8, 21);
  return (
    <Page size="A4" style={styles.page} id={"" + getDayOfYear(props.day)}>
      <Text style={styles.title}>
        {intlFormat(props.day, { day: "numeric", month: "long" })}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.timetableContainer}>{hours}</View>
        <View style={styles.todoContainer}></View>
      </View>
    </Page>
  );
};

const GenerateYearDates = (year: number) => {
  const dates = [];
  var i = new Date(year, 0, 1);
  do {
    dates.push(i);
    i = addDay(i, { days: 1 });
  } while (i.getFullYear() === year);
  return dates;
};

// Create the PDF document
const DayCalendarPDF = () => {
  return (
    <Document>
      <DayPage
        day={new Date()}
        appointments={[
          new Appointment("Meeting", "Meeting room", new Date(), new Date()),
        ]}
      />
    </Document>
  );
};

ReactPDF.render(<DayCalendarPDF />, `${__dirname}/out.pdf`);
