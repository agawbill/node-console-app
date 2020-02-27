export const authorization = async (
  rl,
  getAnswers,
  searchByUnit,
  searchByName,
  completedInterface,
  data
) => {
  const users = data.people;

  console.log("*******AUTHORIZATION*******");

  const questions = [
    "Please enter your first name:",
    "Please enter your last name:"
  ];

  let [firstName, lastName] = await getAnswers(rl, questions);

  const matchedNames = users.filter(user => {
    return (
      `${user.first_name} ${user.last_name} ${user.roles.includes("Admin")}` ===
      `${firstName} ${lastName} true`
    );
  });

  if (matchedNames.length > 0) {
    await searchByUnit(
      rl,
      getAnswers,
      completedInterface,
      searchByName,
      authorization,
      data
    );
  } else {
    console.log("Sorry, you're not authorized as an admin");
    rl.close();
  }
};
