import ReactPDF from "@react-pdf/renderer";
import { Calendar  } from "./src/index";
import {parseArgs} from 'util';
import { assert } from "console";

const {values, positionals} = parseArgs({
  args: Bun.argv,
  options: {
    year: {
      type: "string",
      short: "y",
      description: "The year to generate the calendar for",
      required: true
    },
  },
  allowPositionals: true
});

if(values.year === undefined) {
  console.error("Please provide a year");
  process.exit(1);
}

console.log("Generating PDF for year", values.year);
ReactPDF.render(<Calendar year={parseInt(values.year)} />, `${__dirname}/out.pdf`);
