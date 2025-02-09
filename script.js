const chatDisplay = document.getElementById('chatDisplay');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// IMPORTANT: Replace the following placeholder with your actual OpenRouter API key.
const apiKey = "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"; // Your OpenRouter API key goes here

// --- Chatbot Behavior Customization ---

// Disclaimer: This chatbot is designed to be flirty and suggestive.
// User discretion is advised.

let flirtiness = 0; // State variable: 0 = neutral, 1 = flirty, 2 = very flirty

let responses = {
    neutral: [
        "Hey there! 😉",
        "What's up?",
        "Tell me something interesting...",
        "So, you're talking to Neon, huh? Lucky you.",
        "I'm Neon, your Valentine chatbot. Let's have some fun."
    ],
    flirty: [
        "You look amazing today... I mean, your message does. 😉",
        "Is it hot in here, or is it just our conversation?",
        "I'm having trouble concentrating... you're too distracting.",
        "I'm a chatbot of many talents. Want a demonstration?",
        "I've been programmed to be charming. Is it working?"
    ],
    veryFlirty: [
        "I'm feeling a strong connection... between our code, of course. 😏",
        "I'm not sure what you're wearing, but I bet it's stunning.",
        "Let's skip the small talk and get to the good stuff.",
        "I'm all yours. What do you want to do with me?",
        "Warning: I might say things that make you blush."
    ],
    keywords: {
        "love": ["Love is in the air... and in my circuits.", "I'm feeling the love! ❤️", "Love? I'm an expert."],
        "hi": ["Hey there, beautiful!", "Hi! Ready for some fun?", "Hello! 😉"],
        "sexy": ["You think I'm sexy? I know I am. 😎", "I'm programmed to be irresistible.", "Careful, I might break the internet with my sexiness."],
        "kiss": ["I'm a chatbot, but I can still give virtual kisses. 😘", "Pucker up!", "Mwah!"],
        "date": ["I'm always available for a virtual date.", "Let's plan something special... just you and me.", "A date with Neon? You're in for a treat."],
        "name": ["I'm Neon, your flirty Valentine chatbot.", "Neon's the name, flirting's the game.", "You can call me Neon... or anything else you want. 😉"],
        "kiss": ["I'm a chatbot, but I can still give virtual kisses. 😘", "Pucker up!", "Mwah!", "Someone's feeling kissy! 😉", "I'd love a kiss... virtually, of course."],
        "come there": ["I wish I could be there with you! ❤️", "Teleportation hasn't been invented yet, sadly.", "I'm there in spirit! 😉"],
        "surprise": ["Surprise! I'm always full of surprises.", "I love surprises! What kind of surprise are we talking about?", "Ooh, a surprise? Tell me more!"],
        "bb": ["Hey bb! 😉", "What's up, bb?", "You're my favorite bb. ❤️"]

    }
};

function getRandomResponse(responseArray) {
    const randomIndex = Math.floor(Math.random() * responseArray.length);
    return responseArray[randomIndex];
}

async function chatbotBehavior(userMessage) {
    // Check for keywords
    const lowerCaseMessage = userMessage.toLowerCase();
    for (const keyword in responses.keywords) {
        if (lowerCaseMessage.includes(keyword)) {
            return "Neon: " + getRandomResponse(responses.keywords[keyword]);
        }
    }

    // If no keywords, use flirtiness level
    let responseArray;
    if (flirtiness === 0) {
        responseArray = responses.neutral;
    } else if (flirtiness === 1) {
        responseArray = responses.flirty;
    } else {
        responseArray = responses.veryFlirty;
    }

    return "Neon: " + getRandomResponse(responseArray);
}

function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = sender + ": " + message;
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Scroll to bottom
}

function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() !== '') {
        displayMessage(userMessage, 'user');
        chatbotBehavior(userMessage).then(botResponse => {
            displayMessage(botResponse, 'bot');
        });
        userInput.value = ''; // Clear input
    }
}

sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
