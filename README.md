# Chat With God - AI Powered Chat Bot

The goal of this project was to create a chat-bot that could answer any of my spirtiual or religous questions. The chat bot provides a conversational response as well as the source of its information from either the Bible or the Quran.

I accomplished this by embedding both the Bible and the Quran into a Pinecone vector database to be used as context. I engineered a custom prompt, and then fed both the prompt and the context to OpenAI's ChatGPT to generate the responses. This website uses Next.js, LangChain (Typescript), OpenAI's ChatGPT, and Tailwind CSS. 

## Dependencies & Libraries

* [Next JS](https://nextjs.org/)
* [Langchain](https://js.langchain.com/docs/)
* [OpenAI's ChatGPT](https://openai.com/blog/openai-api)
* [Tailwind CSS](https://tailwindcss.com/)

## Demo

[Click here to "chat with god"](https://god-chat.herokuapp.com/).

<img src="https://github.com/ytraiba/god-chat/blob/main/godChat.png" alt="drawing" style="height:275px;"/>
