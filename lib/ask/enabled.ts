/** The assistant UI renders only when a Groq key is configured on the server. */
export const askEnabled = () => Boolean(process.env.GROQ_API_KEY);
