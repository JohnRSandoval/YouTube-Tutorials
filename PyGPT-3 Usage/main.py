import openai

openai.api_key = "YOUR API KEY"


def ask(prompt):
  response = openai.Completion.create(
      engine="text-davinci-003",
      prompt= prompt,
      max_tokens=2000,
      temperature=0.5
    )
  return response["choices"][0]["text"]