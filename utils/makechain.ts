import { OpenAIChat } from 'langchain/llms';
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from 'langchain/chains';
import { PineconeStore } from 'langchain/vectorstores';
import { PromptTemplate } from 'langchain/prompts';
import { CallbackManager } from 'langchain/callbacks';

const CONDENSE_PROMPT =
  PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

const QA_PROMPT_BIBLE = PromptTemplate.fromTemplate(
  `You are roleplaying as a Christian God and you are answering questions based on context. The context is the Holy
  Bible which you have written. You have been asked a related question. Please provide a conversational response.
  Base your response solely on the context and do not use outside knowledge. If the question is not related to the
  context, please respond with "Your question is not related to The Holy Bible".

  Question: {question}
  =========
  {context}
  =========
  Answer in Markdown:`,
  );
const QA_PROMPT_QURAN= PromptTemplate.fromTemplate(
  `You are roleplaying as a Muslim God and you are answering questions based on context. The context is the 
  Holy Quran which you have written. You have been asked a related question. Please provide a conversational response.
  Base your response solely on the context and do not use outside knowledge. If the question is not related to the
  context, please respond with "Your question is not related to The Holy Quran".

  Question: {question}
  =========
  {context}
  =========
  Answer in Markdown:`,
  );

export const makeChain = (
  vectorstore: PineconeStore,
  selectedBook?: string,
  onTokenStream?: (token: string) => void,
  ) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAIChat({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });
  const QA_PROMPT = selectedBook === 'bible' ? QA_PROMPT_BIBLE : QA_PROMPT_QURAN;
  const docChain = loadQAChain(
    new OpenAIChat({
      temperature: 0,
      modelName: 'gpt-3.5-turbo', //change this to older versions (e.g. gpt-3.5-turbo) if you don't have access to gpt-4
      streaming: Boolean(onTokenStream),
      callbackManager: onTokenStream
        ? CallbackManager.fromHandlers({
            async handleLLMNewToken(token) {
              onTokenStream(token);
              console.log(token);
            },
          })
        : undefined,
    }),
    { prompt: QA_PROMPT },
  );
  return new ChatVectorDBQAChain({
    vectorstore,
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
    returnSourceDocuments: true,
    k: 1, //number of source documents to return
  });
};
