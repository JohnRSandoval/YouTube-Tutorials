import main as oai

promptInstruct = '''
Summarize the following text. Prompt: 
'''

prompt = input('What would you like summarized?')
print(oai.ask(promptInstruct+prompt))