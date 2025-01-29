export class Appointment {
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