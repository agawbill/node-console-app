//Didn't get to complete this

export const moveIn = async (rl, getAnswers, data) => {
  const users = data.people;
  console.log("****MOVE IN A USER BY UNIT*****");

  const unit = await getAnswers(rl, ["Enter Unit Number:"]);

  const resident = users.filter(user => user.unit === `${unit[0]}`);

  console.log(resident);

  console.log(`The residents of unit ${unit[0]}:`, residents);
};

export const moveOut = data => {};
