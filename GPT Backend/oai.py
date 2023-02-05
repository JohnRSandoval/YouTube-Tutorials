import openai

# Set the OpenAI API key
openai.api_key = "{YOUR API KEY}"

# Read the contents of memory.json file


def call(prompt):
  with open("memory.json", "r") as file:
    json_item = file.read()
  #close the file

  response = openai.Completion.create(
    engine="text-davinci-003",
    prompt='Assistant is a todo app, use the JSON data to be respond as the ' +
    'backend would to functions. JSON: ' +json_item+ ' Function: '+prompt + ' Answer: ',
    max_tokens=3500,
    temperature=0.5
  )
  if 'addToList' in prompt or 'markAsDone' in prompt or 'markAsNotDone' in prompt:
    json_item = response["choices"][0]["text"]
    with open("memory.json", "w") as file:
      file.write(json_item)
  # Print the generated response
  return response["choices"][0]["text"]
