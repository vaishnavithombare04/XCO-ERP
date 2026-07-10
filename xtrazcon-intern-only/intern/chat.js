/**
 * XtrazCon IT ERP - INTERN MENTOR CHAT CONTROLLER (chat.js)
 */
let chatHistory = JSON.parse(localStorage.getItem('intern_chat_history')) || [
    { sender: "Alex Rivera", text: "Hi Karan, how is the Acme SEO Campaign going today?", time: "09:30 AM", type: "incoming" },
    { sender: "Karan", text: "Hi Alex! I have completed 50 directory submissions and logged them.", time: "10:15 AM", type: "outgoing" },
    { sender: "Alex Rivera", text: "Perfect. Please make sure to submit your DWR report.", time: "10:30 AM", type: "incoming" }
];

function saveChatData() {
    localStorage.setItem('intern_chat_history', JSON.stringify(chatHistory));
}

function renderChat() {
    const box = document.getElementById('mentorChatBox');
    if (!box) return;

    box.innerHTML = '';

    chatHistory.forEach(msg => {
        const isMe = msg.type === 'outgoing';
        box.innerHTML += `
            <div class="chat-bubble ${isMe ? 'chat-outgoing' : 'chat-incoming'}">
                <div class="fw-700 mb-1" style="font-size:10px; opacity:0.8;">${msg.sender}</div>
                <div>${msg.text}</div>
                <div class="text-end" style="font-size:9px; opacity:0.6; margin-top:4px;">${msg.time}</div>
            </div>
        `;
    });

    box.scrollTop = box.scrollHeight;
}

function handleSend(e) {
    e.preventDefault();

    const input = document.getElementById('txtChatMessage');
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    chatHistory.push({
        sender: "Karan",
        text: text,
        time: timeStr,
        type: "outgoing"
    });
    saveChatData();

    input.value = '';
    renderChat();

    setTimeout(() => {
        chatHistory.push({
            sender: "Alex Rivera",
            text: "Got it! Thanks for the update. Keep up the good work on Acme backlinks.",
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            type: "incoming"
        });
        saveChatData();
        renderChat();
    }, 1500);
}

renderChat();
const chatForm = document.getElementById('sendMessageForm');
if (chatForm) {
    chatForm.addEventListener('submit', handleSend);
}