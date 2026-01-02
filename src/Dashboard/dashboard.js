import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// function toggleSidebar() {
//     const sidebar = document.getElementById("sidebar");
//     sidebar.classList.toggle("collapsed");
//     sidebar.classList.toggle("expanded");
// }
//
// function toggleProfileMenu() {
//     const menu = document.getElementById("profileMenu");
//     menu.classList.toggle("active");
// }
//
// /* Close dropdown when clicking outside */
// document.addEventListener("click", function (event) {
//     const profile = document.querySelector(".profile-wrapper");
//     if (!profile.contains(event.target)) {
//         document.getElementById("profileMenu").classList.remove("active");
//     }
// });


// ========================== Voice to Speech =======================
const micBtn = document.getElementById('micBtn');
const textInput = document.getElementById('textInput');
// const sendBtn = document.getElementById('sendBtn');
// const statusText = document.getElementById('statusText');
// const transcriptDisplay = document.getElementById('transcriptDisplay');
// const transcriptText = document.getElementById('transcriptText');
// const suggestionBtns = document.querySelectorAll('.suggestion-btn');

let isRecording = false;
let recognition = null;
let fullTranscript = '';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    // statusText.textContent = "Not supported";
    // statusText.style.color = "#999";
    micBtn.disabled = true;
    micBtn.style.opacity = "0.5";
    micBtn.style.cursor = "not-allowed";
}

micBtn.addEventListener('click', () => {
    console.log('clicked');
    if (isRecording) {
        stopRecording();
        micBtn.classList.remove("recording");
    } else {
        startRecording();
        micBtn.classList.add("recording");
    }
});

function startRecording() {
    isRecording = true;
    micBtn.classList.add('recording');
    textInput.classList.add('recording');
    // statusText.textContent = "Listening...";
    fullTranscript = '';

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (e) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = e.resultIndex; i < e.results.length; i++) {
            const transcript = e.results[i][0].transcript;
            if (e.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        if (finalTranscript) {
            fullTranscript += finalTranscript;
        }

        const displayText = fullTranscript + interimTranscript;
        textInput.value = displayText;

        if (fullTranscript.trim()) {
            // transcriptText.textContent = fullTranscript;
            // transcriptDisplay.classList.add('show');
        }
    };

    recognition.onerror = (e) => {
        console.error('Speech recognition error:', e.error);
        stopRecording();
        // statusText.textContent = "Error occurred";
        setTimeout(() => statusText.textContent = "", 2000);
    };

    recognition.onend = () => {
        if (isRecording) {
            recognition.start();
            // recognition.stop();
        }
    };

    recognition.start();
}

function stopRecording() {
    isRecording = false;
    // micBtn.classList.remove('recording');
    // textInput.classList.remove('recording');
    // statusText.textContent = "";

    if (recognition) {
        recognition.stop();
        recognition = null;
    }
}

// sendBtn.addEventListener('click', () => {
//     const text = textInput.value.trim();
//     if (text) {
//         alert(`Sending: "${text}"`);
//         textInput.value = '';
//         transcriptDisplay.classList.remove('show');
//         fullTranscript = '';
//     }
// });

textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        // sendBtn.click();
        console.log('Entered');
    }
});

// suggestionBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         const text = btn.textContent.trim();
//         textInput.value = text;
//         textInput.focus();
//     });
// });




// ======================= GEMNI ========================

const API_KEY = import.meta.env.VITE_Gemni_API_Key


// const API_KEY = ""; // demo only
const genai = new GoogleGenerativeAI(API_KEY);

const firstAidModel = genai.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `
You are a first-aid guidance assistant.

Rules:
- Provide ONLY safe, non-emergency first-aid steps
- NO diagnosis
- NO medications
- NO emergency escalation
- Return empty list if severe symptoms are implied

Output ONLY valid JSON.
DO NOT wrap in markdown.
`
});

const input = document.getElementById("textInput");
// const sendBtn = document.getElementById("sendBtn");
const chat = document.getElementById("chatContainer");

// sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // append("You", text);
    // input.value = "";

    try {
        const response = await firstAidModel.generateContent(
            JSON.stringify({ symptoms_text: text })
        );

        let raw = response.response.text()
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(raw);
        append("First Aid", JSON.stringify(parsed, null, 2));

    } catch (err) {
        console.error(err);
        append("System", "Unable to generate first-aid guidance.");
    }
}

function append(sender, message) {
    const div = document.createElement("div");
    div.className = "chat-message";
    // div.innerHTML = `<strong>${sender}:</strong><pre>${message}</pre>`;
    div.innerHTML = `${message}`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;

    const mainUI = document.getElementById("mainUI");

    // Activate UI transition once chat starts
    mainUI.classList.add("chat-started");
}

