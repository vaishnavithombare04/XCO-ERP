/**
 * XtrazCon IT ERP - FREELANCER CHAT CONTROL LAYER (chat.js)
 */

let activeFeedId = 'dev-team';

const defaultChats = {
    'dev-team': [
        { sender: "Alex Rivera", text: "Hey team, Rohan is working on the ERP Freelancer UI dashboard templates today.", time: "09:15 AM", self: false },
        { sender: "Sarah Chen", text: "Excellent, let's make sure the mobile design is responsive and clean.", time: "09:30 AM", self: false },
        { sender: "Rohan Sharma", text: "Working on it! I am updating the index.html and tasks.html now. Styling looks really premium.", time: "10:05 AM", self: true }
    ],
    'billing-queries': [
        { sender: "Rohan Sharma", text: "Hi Sarah, should I raise invoice INV-2026-001 for Milestone 1 or hourly logs?", time: "July 5, 11:20 AM", self: true },
        { sender: "Sarah Chen", text: "Please raise it as milestone-based since Milestone 1 is approved. You can raise INV-2026-002 as hourly logs.", time: "July 5, 02:15 PM", self: false }
    ],
    'general': [
        { sender: "Sarah Chen", text: "Welcome Rohan Sharma to our Development group! He will be handling ERP UI prototype enhancements.", time: "July 1, 10:00 AM", self: false }
    ],
    'sarah': [
        { sender: "Sarah Chen", text: "Hey Rohan, let me know if you face any blocker during setup.", time: "July 2, 10:15 AM", self: false },
        { sender: "Rohan Sharma", text: "Hi Sarah, the workspace is cloned and database initialization is completed. No blockers!", time: "July 2, 10:30 AM", self: true }
    ],
    'alex': [
        { sender: "Alex Rivera", text: "Rohan, did you check the responsive layouts on iPhone SE size?", time: "Yesterday, 04:00 PM", self: false },
        { sender: "Rohan Sharma", text: "Yes Alex, verified. Collapses and fits nicely.", time: "Yesterday, 04:12 PM", self: true }
    ]
};

let chatsDb = JSON.parse(localStorage.getItem('erp_chat_history')) || defaultChats;

function switchChannel(feedId) {
    activeFeedId = feedId;

    // Remove active from all items
    document.querySelectorAll('.chat-channel-item').forEach(el => {
        el.classList.remove('active');
    });

    // Find and set active style
    // To be simple and robust in static selector, we search by inline text or matching structure
    const items = Array.from(document.querySelectorAll('.chat-channel-item'));
    items.forEach(el => {
        const text = el.innerText.toLowerCase();
        if (feedId === 'dev-team' && text.includes('dev-team')) el.classList.add('active');
        if (feedId === 'billing-queries' && text.includes('billing-queries')) el.classList.add('active');
        if (feedId === 'general' && text.includes('general')) el.classList.add('active');
        if (feedId === 'sarah' && text.includes('sarah')) el.classList.add('active');
        if (feedId === 'alex' && text.includes('alex')) el.classList.add('active');
    });

    // Update Titles
    const feedTitle = document.getElementById('activeFeedTitle');
    const feedDesc = document.getElementById('activeFeedDesc');

    if (feedId === 'dev-team') {
        feedTitle.innerText = '#dev-team';
        feedDesc.innerText = 'Team chat for development updates and syncs';
    } else if (feedId === 'billing-queries') {
        feedTitle.innerText = '#billing-queries';
        feedDesc.innerText = 'Billing discussions and payout log references';
    } else if (feedId === 'general') {
        feedTitle.innerText = '#general';
        feedDesc.innerText = 'XtrazCon IT company-wide announcements';
    } else if (feedId === 'sarah') {
        feedTitle.innerText = 'Sarah Chen';
        feedDesc.innerText = 'Super Admin / Project Manager direct chat';
    } else if (feedId === 'alex') {
        feedTitle.innerText = 'Alex Rivera';
        feedDesc.innerText = 'Development TL direct chat';
    }

    renderFeedMessages();
}

function renderFeedMessages() {
    const feedBody = document.getElementById('chatFeedBody');
    if (!feedBody) return;

    feedBody.innerHTML = '';
    const messages = chatsDb[activeFeedId] || [];

    if (messages.length === 0) {
        feedBody.innerHTML = `<div class="text-center text-muted my-auto font-12">No messages in this discussion yet.</div>`;
        return;
    }

    messages.forEach(msg => {
        const bubbleClass = msg.self ? 'sent' : 'received';
        const senderLabel = msg.self ? '' : `<small class="d-block text-tertiary font-10 mb-1 fw-600">${msg.sender}</small>`;
        
        feedBody.innerHTML += `
            <div class="chat-bubble ${bubbleClass}">
                ${senderLabel}
                <div>${msg.text}</div>
                <small class="d-block text-end font-9 mt-1 opacity-75">${msg.time}</small>
            </div>
        `;
    });

    // Scroll to bottom
    setTimeout(() => {
        feedBody.scrollTop = feedBody.scrollHeight;
    }, 50);
}

function simulateBotReply(userText) {
    const textLower = userText.toLowerCase();
    let replyText = "";
    let responder = "Sarah Chen";

    // Set responder based on active channel
    if (activeFeedId === 'alex') {
        responder = "Alex Rivera";
    } else if (activeFeedId === 'dev-team') {
        responder = "Alex Rivera";
    } else if (activeFeedId === 'billing-queries') {
        responder = "Sarah Chen";
    } else if (activeFeedId === 'general') {
        responder = "Sarah Chen";
    } else if (activeFeedId === 'sarah') {
        responder = "Sarah Chen";
    }

    // Determine reply text based on keywords
    if (responder === "Alex Rivera") {
        if (textLower.includes("staging") || textLower.includes("link") || textLower.includes("deploy") || textLower.includes("pr") || textLower.includes("github")) {
            replyText = "Awesome work, Rohan! I'll review the pull request, verify the responsiveness in the staging URL, and approve the merge shortly.";
        } else if (textLower.includes("complete") || textLower.includes("done") || textLower.includes("finish") || textLower.includes("task")) {
            replyText = "Perfect! Please make sure to submit the deliverable link in the Submissions Room, and register your hours in the Flex Worklogs tracker.";
        } else if (textLower.includes("hi") || textLower.includes("hello") || textLower.includes("hey")) {
            replyText = "Hey Rohan! Hope you're making good progress on the ERP UI Prototype today. Let me know if you run into any blockers.";
        } else {
            replyText = "Got it, Rohan. I am reviewing the frontend tickets. Let's sync up on this in our scheduled sprint sync meeting.";
        }
    } else { // Sarah Chen
        if (textLower.includes("invoice") || textLower.includes("billing") || textLower.includes("payment") || textLower.includes("payout") || textLower.includes("money")) {
            replyText = "I have received the invoice claim, Rohan. I'll inspect the milestone approvals and release the escrow payout during our bi-weekly billing run.";
        } else if (textLower.includes("milestone") || textLower.includes("m2") || textLower.includes("m3") || textLower.includes("m4")) {
            replyText = "Please make sure the milestone outputs are pushed to the Submissions Room. Once Alex approves the build quality, the payout is cleared.";
        } else if (textLower.includes("hi") || textLower.includes("hello") || textLower.includes("hey")) {
            replyText = "Hello Rohan! Welcome. Feel free to shoot over any billing questions or milestone queries here.";
        } else {
            replyText = "Understood. Keep up the great work! I'll be monitoring the sprint backlog. Let me know if you need any other resource access.";
        }
    }

    const now = new Date();
    const timeDisplay = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Show simulated typing status, then render
    const feedBody = document.getElementById('chatFeedBody');
    if (feedBody) {
        // Add a temporary "typing..." indicator
        const typingEl = document.createElement('div');
        typingEl.className = 'chat-bubble received typing-indicator';
        typingEl.style.maxWidth = '75%';
        typingEl.style.padding = '10px 14px';
        typingEl.style.borderRadius = '14px';
        typingEl.style.borderBottomLeftRadius = '2px';
        typingEl.style.marginBottom = '12px';
        typingEl.style.marginRight = 'auto';
        typingEl.style.background = 'var(--bg-app)';
        typingEl.style.border = '1px solid var(--border-color)';
        typingEl.style.fontSize = '13px';
        typingEl.innerHTML = `<small class="d-block text-tertiary font-10 mb-1 fw-600">${responder}</small><span class="text-muted italic"><i class="bi bi-three-dots"></i> typing...</span>`;
        feedBody.appendChild(typingEl);
        feedBody.scrollTop = feedBody.scrollHeight;

        setTimeout(() => {
            typingEl.remove();
            
            // Push actual reply to DB
            chatsDb[activeFeedId].push({
                sender: responder,
                text: replyText,
                time: timeDisplay,
                self: false
            });
            localStorage.setItem('erp_chat_history', JSON.stringify(chatsDb));
            
            renderFeedMessages();
            showToast(`New message from ${responder}`, "info");
        }, 1200);
    }
}

function initChatSubmit() {
    const form = document.getElementById('frmChatMessage');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('txtChatMessage');
        const text = input.value.trim();
        if (!text) return;

        const now = new Date();
        const timeDisplay = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        if (!chatsDb[activeFeedId]) {
            chatsDb[activeFeedId] = [];
        }

        chatsDb[activeFeedId].push({
            sender: "Rohan Sharma",
            text: text,
            time: timeDisplay,
            self: true
        });

        // Save
        localStorage.setItem('erp_chat_history', JSON.stringify(chatsDb));
        input.value = '';

        renderFeedMessages();

        // Trigger bot response after a short delay
        setTimeout(() => {
            simulateBotReply(text);
        }, 800);
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    switchChannel('dev-team');
    initChatSubmit();
});
window.switchChannel = switchChannel; // Bind to window for HTML click calls