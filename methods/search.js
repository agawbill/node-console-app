export const searchByUnit = async (
  rl,
  getAnswers,
  completedInterface,
  searchByName,
  authorization,
  data
) => {
  const users = data.people;
  console.log("****SEARCH BY UNIT*****");

  let unit = await getAnswers(rl, ["Enter Unit Number:"]);

  let residents = users
    .filter(user => user.unit === `${unit[0]}`)
    .map(user => `${user.first_name} ${user.last_name}`);

  while (true) {
    if (residents.length > 0) {
      break;
    }
    unit = await getAnswers(rl, ["Invalid unit number, try again: "]);
    residents = users
      .filter(user => user.unit === `${unit[0]}`)
      .map(user => `${user.first_name} ${user.last_name}`);
  }
  console.log(`The residents of unit ${unit[0]}:`, residents);

  await completedInterface(
    rl,
    "unitSearch",
    getAnswers,
    searchByUnit,
    searchByName,
    data,
    authorization
  );
};

export const searchByName = async (
  rl,
  getAnswers,
  completedInterface,
  authorization,
  data
) => {
  const users = data.people;
  const devices = data.devices;

  console.log("****SEARCH BY NAME*****");

  const questions = ["Enter user's first name:", "Enter user's last name:"];

  let [firstName, lastName] = await getAnswers(rl, questions);

  let residents = users.filter(
    user =>
      `${user.first_name} ${user.last_name}` === `${firstName} ${lastName}`
  );

  while (true) {
    if (residents.length > 0) {
      break;
    }
    console.log("Invalid name, enter again \n");
    [firstName, lastName] = await getAnswers(rl, questions);
    residents = users.filter(
      user =>
        `${user.first_name} ${user.last_name}` === `${firstName} ${lastName}`
    );
  }

  const residentsToDisplay = residents.map(
    user =>
      `Name: ${user.first_name} ${user.last_name},  Unit: ${user.unit},  Roles: ${user.roles} `
  );

  let controlledDevices = [];

  if (residents[0].roles.includes("Admin") === true) {
    for (const key in devices) {
      const element = devices[key].filter(
        device =>
          device.admin_accessible === "true" &&
          device.unit !== parseInt(residents[0].unit)
      );
      controlledDevices = [...controlledDevices, element];
    }
  }

  for (const key in devices) {
    const element = devices[key].filter(
      device => device.unit === parseInt(residents[0].unit)
    );
    controlledDevices = [...controlledDevices, element];
  }

  console.log("User information: ", residentsToDisplay);
  console.log("Devices user can control: ", controlledDevices);
  await completedInterface(
    rl,
    "nameSearch",
    getAnswers,
    searchByUnit,
    searchByName,
    data,
    authorization
  );
};
