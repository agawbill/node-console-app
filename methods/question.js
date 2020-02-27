export const askQuestion = (rl, question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
};

export const getAnswers = async (rl, questions) => {
  const answers = [];

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    let answer = await askQuestion(rl, question);

    answers.push(answer);
  }

  return answers;
};
