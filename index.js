import readline from "readline";
import data from "./public/data/property_data.json";
import { authorization } from "./methods/authorization";
import { stratisInterface, completedInterface } from "./methods/interface";
import { getAnswers } from "./methods/question";
import { searchByUnit, searchByName } from "./methods/search";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

stratisInterface(
  rl,
  getAnswers,
  searchByUnit,
  searchByName,
  data,
  authorization,
  completedInterface
);
