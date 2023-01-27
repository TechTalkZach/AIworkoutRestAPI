import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const {weight,age,ft,inch,goal} = req.body;  
  const prompt = generatePrompt(weight,age,ft,inch,goal);
  console.log(prompt)

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

//   const animal = req.body.animal || '';
//   if (animal.trim().length === 0) {
//     res.status(400).json({
//       error: {
//         message: "Please enter a valid animal",
//       }
//     });
//     return;
//   }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(weight,age,ft,inch,goal),
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(weight,age,ft,inch,goal) {
  return `Suggest a 12-exercise workout to ${goal} that can be done from home in sections of 30 seconds 
  for a ${age} years old person that weighs ${weight}lb and has a height of ${ft}ft and ${inch}in`;
}
