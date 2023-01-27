import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { goal,age,weight,feet,inch } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(goal,age,weight,feet,inch),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
function generatePrompt(goal,age,weight,feet,inch) {
  return `Suggest a 12-exercise workout to ${goal} that can be done from home in sections of 30 seconds 
  for a ${age} years old person that weighs ${weight}lb and has a height of ${feet}ft and ${inch}in`;
}