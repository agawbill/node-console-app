export const stratisInterface = async (
  rl,
  getAnswers,
  searchByUnit,
  searchByName,
  data,
  authorization,
  completedInterface
) => {
  const initialPrompt = [
    "Welcome! Please select what type of user you are by inputting the number of the options below:  \n 1: Admin Resident \n 2: Regular Resident \n"
  ];
  const secondaryPrompt = [
    "Please enter a valid number input-- either 1 or 2:  \n 1: Admin Resident \n 2: Regular Resident \n"
  ];

  let input = await getAnswers(rl, initialPrompt);

  while (true) {
    if (input[0] === "1" || input[0] === "2") {
      break;
    }
    input = await getAnswers(rl, secondaryPrompt);
  }

  switch (input[0]) {
    case "1":
      authorization(
        rl,
        getAnswers,
        searchByUnit,
        searchByName,
        completedInterface,
        data
      );
      break;
    case "2":
      searchByName(rl, getAnswers, completedInterface, authorization, data);
      break;
    default:
      break;
  }
};

// I did not get to complete the failed auth portion of this interface below... you'll see it in the switch statement

export const completedInterface = async (
  rl,
  type,
  getAnswers,
  searchByUnit,
  searchByName,
  data,
  authorization
) => {
  const initialPrompt = [
    "Would you like to complete another input? Select an option below :  \n 1: Search again  \n 2: Back to main prompt \n 3: Exit console \n"
  ];
  const secondaryPrompt = [
    "Please enter a valid number input-- either 1 or 2:  \n 1: Search again  \n 2: Back to main prompt \n 3: Exit console \n"
  ];

  let input = await getAnswers(rl, initialPrompt);

  while (true) {
    if (input[0] === "1" || input[0] === "2" || input[0] === "3") {
      break;
    }
    input = await getAnswers(rl, secondaryPrompt);
  }

  switch (input[0]) {
    case "1":
      if (type === "nameSearch") {
        searchByName(rl, getAnswers, completedInterface, authorization, data);
      } else if (type === "unitSearch") {
        searchByUnit(
          rl,
          getAnswers,
          completedInterface,
          searchByName,
          authorization,
          data
        );
      } else if ("authSearch") {
        authorization(
          rl,
          getAnswers,
          searchByUnit,
          searchByName,
          completedInterface,
          data
        );
      }
      break;
    case "2":
      stratisInterface(
        rl,
        getAnswers,
        searchByUnit,
        searchByName,
        data,
        authorization,
        completedInterface
      );
      break;
    case "3":
      console.log("Thanks for using the app.");
      rl.close();
      break;
    default:
      break;
  }
};
