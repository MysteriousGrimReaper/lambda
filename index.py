import numpy
import spacy
import discord
from gensim.test.utils import common_texts
from gensim.models import Word2Vec
import gensim.downloader
import pandas as pd
import json

items_df = pd.read_csv('DeltaTWOW S2 Items - Full Item List.tsv', sep='\t')
print(items_df)
keys = items_df['Keys']
items = items_df['Item']

client = discord.Client()
model = gensim.downloader.load('glove-wiki-gigaword-50')
@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$item'):
        nlp = spacy.load("en_core_web_sm")
        doc = nlp(message.content[5:].strip())
        texts = [token.lemma_ for token in doc if token.pos_ == "VERB" or token.pos_ == "NOUN" or token.pos_ == "PREP" or token.pos_ == "ADJ"]
        keychain = []
        scores = []
        for x in keys:
            sentence_score = 0
            if str(x) == "N/A" or str(x) == "nan":
                continue
            for y in texts:
                for z in str(x).split(" "):
                    try:
                        word_score = model.similarity(z, y)
                    except:
                        word_score = 0
                    sentence_score += word_score
            if (len(texts)*len(x.split(" "))) == 0:
                await message.reply("Sorry, I couldn't find anything :pensive:", mention_author=True)
                break
            if sentence_score == 0:
                await message.reply("Looks like none of the words in the sentence were found in the model :pensive:", mention_author=True)
                break
            sentence_score/=(len(texts)*len(x.split(" ")))
            keychain.append(x)
            scores.append(sentence_score)
            print("keys: "+str(x)+" sentence score: "+str(sentence_score))
        sort = [x for _,x in sorted(zip(scores,keychain), reverse=True)]
        print(sort)
        b = (items_df[(items_df['Keys']  == sort[0]) | (items_df['Keys']  == sort[1]) | (items_df['Keys']  == sort[2])].index.tolist())
        print(b)
        choices = items_df.iloc[b]['Item'].to_numpy()
        choice_icons = items_df.iloc[b]['Icon'].to_numpy()
        message_to_send = "**"+choice_icons[0]+" "+choices[0]+"**\n"+"**"+choice_icons[1]+" "+choices[1]+"**\n"+"**"+choice_icons[2]+" "+choices[2]+"**"
        await message.reply("Your item choices are: \n"+message_to_send, mention_author=True)
        print(choices)

            

        
                    
            
with open('config.json', 'r') as f:
    data = json.load(f)
        
client.run(data['token'])
