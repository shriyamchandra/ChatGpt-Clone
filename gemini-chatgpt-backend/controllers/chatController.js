const { GoogleGenerativeAI } = require('@google/generative-ai');

// Controller function to interact with Google Gemini API
const chatWithGemini = async (req, res) => {
    const { message } = req.body;

    try {
        // Initialize the Gemini API client with API key
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);

        // Get the model (gemini-1.5-flash)
        const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Generate content based on the prompt (user's message)
        const result = await model.generateContent(message);

        // Log the entire response for debugging
        console.log('Gemini API Response:', JSON.stringify(result, null, 2));

        // Extract the first candidate from the response and log it
        if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
            const candidate = result.response.candidates[0];  // First candidate

            // Correctly extract the text from the nested structure
            const generatedText = candidate.content.parts.map(part => part.text).join('');

            // Optionally, you can log the extracted text
            console.log('Extracted Text:', generatedText);

            res.json({ response: generatedText });
        } else {
            res.json({ response: "No text generated from Gemini API" });
        }
    } catch (error) {
        console.error('Error details:', error.message || error);
        res.status(500).json({ error: 'Error interacting with Gemini API' });
    }
};

module.exports = { chatWithGemini };
