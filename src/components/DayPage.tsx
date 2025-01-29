import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getDayOfYear, intlFormat } from "date-fns";
import { Appointment } from "../data/Appointment";
import { randomUUIDv7 } from "bun";

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
  appointmentBlock: {
    position: "absolute",
    left: "9%",
    width: "40%",
    backgroundColor: "#ccc",
    padding: 5,
    border: "1pt solid black",
    borderRadius: 5,
    textOverflow:'ellipsis',
  },
  appointmentText: {
    fontSize: 5,
  },
});

// Helper function to generate hours
const generateHours = (start: number, end: number) => {
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


export const DayPage = (props: { day: Date; appointments: Appointment[] }) => {
  const hours = generateHours(8, 21);
  const appointmentBlocks = props.appointments.map((appointment) => {
    const startHour = appointment.start.getHours();
    const endHour = appointment.end.getHours();
    const hourSpan = endHour - startHour;
    return (
      <View
        key={appointment.summary+randomUUIDv7()}
        style={[
          styles.appointmentBlock,
          {
            top: `${(startHour - 8) * (100 / 14)}%`,
            height: `${hourSpan * (100 / 14)}%`,
          },
        ]}
      >
        <Text style={styles.appointmentText}>
          {appointment.summary}{" "}
          {appointment.location ? "@ " + appointment.location : ""}
        </Text>
        <Text style={styles.appointmentText}>
          {intlFormat(appointment.start, {
            hour: "numeric",
            minute: "numeric",
          })}
          -{intlFormat(appointment.end, { hour: "numeric", minute: "numeric" })}
        </Text>
      </View>
    );
  });
  return (
    <Page size="A4" style={styles.page} id={"" + getDayOfYear(props.day)}>
      <Text style={styles.title}>
        {intlFormat(props.day, { day: "numeric", month: "long" })}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.timetableContainer}>{hours}</View>
        <View style={styles.todoContainer}>
          <Text style={{ textAlign: "center" }}>TODO</Text>
        </View>
        {appointmentBlocks}
      </View>
    </Page>
  );
};
1