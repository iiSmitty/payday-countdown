document.addEventListener('DOMContentLoaded', function() {
    // Start the countdown timer
    updateCountdown();

    // Update countdown every second (unless there's load shedding)
    setInterval(updateCountdown, 1000);

    // Add click listener to survival button
    document.getElementById('survivalButton').addEventListener('click', calculateSouthAfricanSurvival);

    // Check for special South African dates
    checkForSpecialDates();

    // Add some local flair every 30 seconds
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
            showRandomMotivation();
        }
    }, 30000);

    // Initialize memes and animations
    updateVibeCheck();
    updateWalletMeme(false);

    // Change vibe every 45 seconds
    setInterval(updateVibeCheck, 45000);

    // Load shedding simulation - Triple L press (LLL)
    let loadSheddingSequence = [];
    let loadSheddingTimer;

    document.addEventListener('keydown', function(event) {
        if (event.code === 'KeyL') {
            clearTimeout(loadSheddingTimer);
            loadSheddingSequence.push('L');

            // Reset sequence after 2 seconds of no input
            loadSheddingTimer = setTimeout(() => {
                loadSheddingSequence = [];
            }, 2000);

            // Trigger load shedding on triple L
            if (loadSheddingSequence.length >= 3) {
                event.preventDefault();
                simulateLoadShedding();
                loadSheddingSequence = []; // Reset
            }
        }
    });
});// ===============================================================
// SOUTH AFRICAN PRE-PAYDAY SURVIVAL BUREAU
// ===============================================================
// Proudly South African countdown timer and survival calculator
// Load shedding resistant and SARS compliant!

// ===============================================================
// PAYDAY COUNTDOWN CONFIGURATION
// ===============================================================
// CHANGE THIS DATE to set your target payday (Month-end!)
// Format: Year, Month (0-11), Day, Hour (0-23), Minute
// Example: new Date(2025, 7, 31, 9, 0) = August 31, 2025 at 9:00 AM
// Note: Most South Africans get paid on the 25th or last working day
const PAYDAY_DATE = new Date(2025, 7, 25, 9, 0); // August 25, 2025 at 9:00 AM

// ===============================================================
// COUNTDOWN TIMER FUNCTIONALITY
// ===============================================================
function updateCountdown() {
    const now = new Date().getTime();
    const payDay = PAYDAY_DATE.getTime();
    const timeRemaining = payDay - now;

    // If payday has passed, show celebration
    if (timeRemaining < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';

        // Make wallet rich when payday arrives - time to celebrate!
        document.getElementById('wallet').classList.add('rich');

        // Add some celebration text
        const countdownSection = document.querySelector('.countdown-section p');
        countdownSection.textContent = '🎉 Payday has arrived! Time for Woolies instead of Pick n Pay! 🎉';
        countdownSection.style.color = '#007749';
        countdownSection.style.fontWeight = 'bold';

        return;
    }

    // Calculate time units (standard countdown logic)
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update the display with zero-padding (because we're professional like that)
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Wallet logic - gets richer as payday approaches (like real life!)
    // Calculate total countdown period (assuming week before payday for animation)
    const weekBeforePayday = new Date(PAYDAY_DATE.getTime() - (7 * 24 * 60 * 60 * 1000));
    const totalCountdownTime = PAYDAY_DATE.getTime() - weekBeforePayday.getTime();
    const timeElapsed = totalCountdownTime - timeRemaining;
    const percentageToPayday = Math.max(0, (timeElapsed / totalCountdownTime) * 100);

    // Wallet gets money when we're 75% through the countdown period
    const walletIsRich = percentageToPayday > 75 || days <= 2;
    if (walletIsRich) {
        document.getElementById('wallet').classList.add('rich');
    } else {
        document.getElementById('wallet').classList.remove('rich');
    }

    // Update wallet meme based on status
    updateWalletMeme(walletIsRich);

    // Special South African time-based messages
    updateSouthAfricanMessages(days, hours);

    // Update vibe check occasionally
    if (seconds % 30 === 0) {
        updateVibeCheck();
    }
}

// ===============================================================
// SOUTH AFRICAN CONTEXTUAL MESSAGES
// ===============================================================
function updateSouthAfricanMessages(days, hours) {
    const messageElement = document.querySelector('.countdown-section p');
    let message = 'Official Countdown to Salary Day (Subject to SARS Deductions)';

    if (days === 0 && hours < 24) {
        message = '🚨 Final countdown! Start preparing your Shoprite list! 🚨';
    } else if (days === 1) {
        message = 'One more day of two-minute noodles and hope!';
    } else if (days <= 3) {
        message = 'Almost there! Time to start dreaming about real groceries.';
    } else if (days <= 7) {
        message = 'The light at the end of the tunnel! (And it\'s not load shedding!)';
    } else if (days > 15) {
        message = 'Eish... it\'s going to be a long month. Stock up on maggi noodles.';
    }

    messageElement.textContent = message;
}

// ===============================================================
// SOUTH AFRICAN SURVIVAL PROBABILITY CALCULATOR
// ===============================================================
// Array of hilariously South African survival analyses
const southAfricanSurvivalAnalyses = [
    'Based on current two-minute noodle reserves and the probability of finding parking at Canal Walk.',
    'Assuming successful negotiation with your local spaza shop owner for "pay-next-week" credit arrangements.',
    'Contingent on discovering forgotten coins in your bakkie\'s cubby hole and/or Eskom not cutting power during dinner prep.',
    'Factoring in potential windfall from old Lotto tickets and that R50 your ouma gave you last Christmas.',
    'Dependent on strategic deployment of "Mom, can you EFT me" emergency protocols.',
    'Calculated using advanced algorithms and consultation with the sangoma down the road.',
    'Presuming successful implementation of "rooibos tea and beskuit" dietary supplement plan.',
    'Based on historical precedent of somehow always surviving until month-end (it\'s a miracle every time).',
    'Incorporating probability of spontaneous discovery of forgotten Pick n Pay vouchers in old jeans.',
    'Assuming your friends will continue accepting "I\'ll buy next round" promises and believing them.',
    'Factoring in your mother\'s emergency pot of potjiekos and unlimited lectures about saving money.',
    'Based on the likelihood of Eskom keeping the lights on long enough to cook something decent.',
    'Contingent on successfully avoiding the Shell garage and their criminally expensive fuel prices.',
    'Assuming you can survive another week of pap and wors without crying into your empty bank account.',
    'Calculated based on your ability to stretch R20 over five days (spoiler alert: it\'s not looking good).',
    'Dependent on municipal water actually flowing so you can at least make rooibos tea for sustenance.'
];

function calculateSouthAfricanSurvival() {
    // Generate random percentage between 8% and 94% (because SA life is unpredictable)
    const percentage = Math.floor(Math.random() * 86) + 8;

    // Select random South African analysis
    const analysis = southAfricanSurvivalAnalyses[Math.floor(Math.random() * southAfricanSurvivalAnalyses.length)];

    // Display results with dramatic flair
    document.getElementById('survivalPercentage').textContent = percentage + '%';
    document.getElementById('survivalAnalysis').textContent = analysis;
    document.getElementById('survivalResult').style.display = 'block';

    // Color coding based on survival percentage (South African optimism levels)
    const percentageElement = document.getElementById('survivalPercentage');
    if (percentage < 25) {
        percentageElement.style.color = '#DE3831'; // Red - Eish level
    } else if (percentage < 50) {
        percentageElement.style.color = '#ff6b35'; // Orange - Tough times
    } else if (percentage < 75) {
        percentageElement.style.color = '#FFB612'; // Yellow - Not bad hey
    } else {
        percentageElement.style.color = '#007749'; // Green - Sharp sharp!
    }

    // Add some animation for extra drama
    percentageElement.style.transform = 'scale(0.8)';
    setTimeout(() => {
        percentageElement.style.transform = 'scale(1)';
    }, 100);

    // Show reaction meme
    showReactionMeme(percentage);
}

// ===============================================================
// MEMES AND ANIMATIONS SYSTEM
// ===============================================================
const vibeStates = [
    { emoji: '🫠', text: 'Current Vibe: Financially Challenged' },
    { emoji: '😭', text: 'Current Vibe: Crying in Broke' },
    { emoji: '🤡', text: 'Current Vibe: Pretending I\'m Fine' },
    { emoji: '💀', text: 'Current Vibe: Dead Inside' },
    { emoji: '🎭', text: 'Current Vibe: Acting Rich' },
    { emoji: '🫥', text: 'Current Vibe: Invisible Bank Balance' },
    { emoji: '😵‍💫', text: 'Current Vibe: Confused by Numbers' },
    { emoji: '🤠', text: 'Current Vibe: Yeehaw Broke' }
];

const southAfricanMemes = [
    '🛒 "Going to Pick n Pay" vs "Going to Woolies" 💸',
    '⛽ "Before petrol price increase" vs "After" 😢',
    '💡 "Stage 0" vs "Stage 6 Load Shedding" 🕯️',
    '🚗 "Full tank" vs "R50 worth of petrol" 📏',
    '🍜 "Gourmet dinner" vs "Two-minute noodles again" 😋',
    '📱 "Unlimited data" vs "Out of airtime" 📵',
    '🏠 "Going home for the weekend" vs "Mom\'s cooking" 🍽️',
    '💳 "Payday" vs "3 days after payday" 💸',
    '🌮 "KFC Streetwise 2" vs "Bread and butter" 🍞',
    '🚗 "Uber everywhere" vs "Walking is exercise" 🚶‍♂️'
];

const reactionMemes = [
    { emoji: '😱', text: 'This is fine' },
    { emoji: '🤠', text: 'Guess I\'ll die' },
    { emoji: '🫠', text: 'Everything is awesome' },
    { emoji: '😵‍💫', text: 'Math is hard' },
    { emoji: '🤡', text: 'I\'m in danger' },
    { emoji: '💀', text: 'Coffin dance time' },
    { emoji: '🎭', text: 'I\'m not crying' },
    { emoji: '🫥', text: 'Wallet.exe has stopped' }
];

function updateVibeCheck() {
    const vibeEmoji = document.getElementById('vibeEmoji');
    const vibeText = document.getElementById('vibeText');

    if (vibeEmoji && vibeText) {
        const randomVibe = vibeStates[Math.floor(Math.random() * vibeStates.length)];
        vibeEmoji.textContent = randomVibe.emoji;
        vibeText.textContent = randomVibe.text;
    }
}

function updateWalletMeme(isRich = false) {
    const walletMemeBottom = document.getElementById('walletMemeBottom');
    if (walletMemeBottom) {
        if (isRich) {
            walletMemeBottom.textContent = 'MONEY PRINTER GO BRRRR';
        } else {
            const poorMemes = [
                'MOTHS FLYING OUT',
                'TUMBLEWEEDS ROLLING',
                'ECHO... ECHO... ECHO...',
                'SPIDER WEBS FORMING',
                'DUST BUNNIES NESTING'
            ];
            walletMemeBottom.textContent = poorMemes[Math.floor(Math.random() * poorMemes.length)];
        }
    }
}

function showRandomMeme() {
    const randomMeme = southAfricanMemes[Math.floor(Math.random() * southAfricanMemes.length)];

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 999;
        animation: fadeIn 0.3s ease-out;
    `;

    // Create popup meme
    const memePopup = document.createElement('div');
    memePopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(145deg, #ffffff, #f0f0f0);
        border: 3px solid #000000;
        border-radius: 12px;
        box-shadow: 0 12px 36px rgba(0,0,0,0.4);
        z-index: 1000;
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: memeSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-family: 'Arial Black', Arial, sans-serif;
    `;

    memePopup.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #007749, #005234);
            color: white;
            padding: 15px;
            border-radius: 8px 8px 0 0;
            margin: -3px -3px 0 -3px;
            border-bottom: 2px solid #FFB612;
        ">
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin-bottom: 5px;
            ">
                <img src="sa-flag.png" alt="SA Flag" style="
                    width: 42px;
                    height: 28px;
                    border-radius: 3px;
                ">
            </div>
            <div style="font-weight: bold; font-size: 14px; letter-spacing: 1px;">SOUTH AFRICAN MEME ALERT</div>
        </div>
        
        <div style="padding: 25px 20px;">
            <div style="
                background: #f8f9fa;
                border: 2px dashed #007749;
                border-radius: 8px;
                padding: 20px 15px;
                margin-bottom: 20px;
                position: relative;
                padding-top: 35px;
            ">
                <div style="
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: #FFB612;
                    color: #002F6C;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: bold;
                    transform: rotate(12deg);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    z-index: 1;
                ">LEKKER!</div>
                
                <div style="
                    font-size: 18px;
                    color: #002F6C;
                    font-weight: 900;
                    line-height: 1.4;
                    text-shadow: 1px 1px 0 #fff;
                ">${randomMeme}</div>
            </div>
            
            <div style="
                display: flex;
                gap: 10px;
                justify-content: center;
                align-items: center;
            ">
                <button onclick="showRandomMeme(); this.closest('.meme-backdrop').remove();" style="
                    background: linear-gradient(135deg, #FFB612, #e6a500);
                    color: #002F6C;
                    border: 2px solid #007749;
                    padding: 10px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 14px;
                    transition: all 0.2s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    🎲 Another One!
                </button>
                
                <button onclick="this.closest('.meme-backdrop').remove();" style="
                    background: linear-gradient(135deg, #007749, #005234);
                    color: white;
                    border: 2px solid #FFB612;
                    padding: 10px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 14px;
                    transition: all 0.2s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    🙌 Sharp Sharp!
                </button>
            </div>
        </div>
    `;

    // Combine backdrop and popup
    backdrop.className = 'meme-backdrop';
    backdrop.appendChild(memePopup);

    // Add enhanced animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes memeSlideIn {
            0% { 
                transform: translate(-50%, -50%) scale(0.3) rotate(-10deg);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1) rotate(2deg);
            }
            100% { 
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
                opacity: 1;
            }
        }
        
        @keyframes memeWobble {
            0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
            25% { transform: translate(-50%, -50%) rotate(1deg); }
            75% { transform: translate(-50%, -50%) rotate(-1deg); }
        }
    `;
    document.head.appendChild(style);

    // Close on backdrop click
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            backdrop.remove();
            style.remove();
        }
    });

    document.body.appendChild(backdrop);

    // Add wobble animation after initial load
    setTimeout(() => {
        memePopup.style.animation = 'memeWobble 2s ease-in-out infinite';
    }, 500);

    // Auto remove after 8 seconds
    setTimeout(() => {
        if (backdrop.parentNode) {
            backdrop.remove();
            style.remove();
        }
    }, 8000);
}

function showReactionMeme(percentage) {
    const reactionContainer = document.getElementById('reactionContainer');
    const reactionEmoji = document.getElementById('reactionEmoji');
    const reactionText = document.getElementById('reactionText');

    if (reactionContainer && reactionEmoji && reactionText) {
        let reaction;

        if (percentage < 20) {
            reaction = { emoji: '💀', text: 'RIP my bank account' };
        } else if (percentage < 40) {
            reaction = { emoji: '😱', text: 'This is fine... probably' };
        } else if (percentage < 60) {
            reaction = { emoji: '🤠', text: 'Yeehaw, still alive' };
        } else if (percentage < 80) {
            reaction = { emoji: '😎', text: 'Living my best broke life' };
        } else {
            reaction = { emoji: '🎉', text: 'Survival master!' };
        }

        reactionEmoji.textContent = reaction.emoji;
        reactionText.textContent = reaction.text;
        reactionContainer.style.display = 'block';

        // Add shake animation
        reactionEmoji.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            if (reactionEmoji.style) {
                reactionEmoji.style.animation = '';
            }
        }, 500);
    }
}

// ===============================================================
// TESTIMONIALS SCROLL FUNCTIONALITY
// ===============================================================
function scrollTestimonials(direction) {
    const container = document.querySelector('.testimonials-scroll');
    const scrollAmount = 340; // Width of one testimonial plus gap

    if (direction === 1) {
        container.scrollLeft += scrollAmount;
    } else {
        container.scrollLeft -= scrollAmount;
    }
}
function simulateLoadShedding() {
    // Create a full-screen overlay for dramatic effect
    const flashOverlay = document.createElement('div');
    flashOverlay.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background-color: #000000 !important;
        z-index: 99999 !important;
        pointer-events: none !important;
        display: block !important;
    `;

    document.body.appendChild(flashOverlay);

    // Flash sequence
    let flashCount = 0;
    const totalFlashes = 6;

    const flashInterval = setInterval(() => {
        if (flashCount % 2 === 0) {
            flashOverlay.style.backgroundColor = '#000000'; // Black
        } else {
            flashOverlay.style.backgroundColor = '#ffffff'; // White
        }

        flashCount++;

        if (flashCount >= totalFlashes) {
            clearInterval(flashInterval);

            // Remove flash overlay and show message
            setTimeout(() => {
                flashOverlay.remove();
                showLoadSheddingMessage();
            }, 500);
        }
    }, 400);
}

function showLoadSheddingMessage() {
    // Apply permanent dark mode after load shedding
    document.body.classList.add('load-shedding-mode');

    // Create custom alert overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        font-family: Arial, sans-serif;
    `;

    const message = document.createElement('div');
    message.style.cssText = `
        background: linear-gradient(135deg, #007749, #005234);
        color: white;
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        border: 3px solid #FFB612;
        box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        animation: slideIn 0.5s ease-out;
    `;

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    message.innerHTML = `
        <h2 style="margin: 0 0 15px 0; color: #FFB612;">⚡ LOAD SHEDDING SIMULATION ⚡</h2>
        <p style="margin: 0 0 15px 0; font-size: 16px;">
            Stage 4 Load Shedding simulation complete!<br>
            Your countdown survived because we use<br>
            battery backup and solar power! 🔋☀️
        </p>
        <p style="margin: 0 0 15px 0; font-style: italic; opacity: 0.9; color: #FFB612;">
            <strong>Notice:</strong> The website is now permanently in<br>
            "Load Shedding Mode" (Dark Theme) 🌙
        </p>
        <p style="margin: 0 0 20px 0; font-style: italic; opacity: 0.8; font-size: 14px;">
            "Thanks Eskom, very cool!" - Nobody, ever
        </p>
        <button onclick="this.parentElement.parentElement.remove(); document.head.removeChild(document.head.lastElementChild);" style="
            background: #FFB612;
            color: #002F6C;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Close (Power "Restored")</button>
    `;

    overlay.appendChild(message);
    document.body.appendChild(overlay);
}

// ===============================================================
// PROUDLY SOUTH AFRICAN EASTER EGGS
// ===============================================================
// Konami code adapted for South African context: ↑↑↓↓←→←→BA
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Special South African key combinations
let braaiSequence = [];
const braaiCode = ['KeyB', 'KeyR', 'KeyA', 'KeyA', 'KeyI'];

let howzitSequence = [];
const howzitCode = ['KeyH', 'KeyO', 'KeyW', 'KeyZ', 'KeyI', 'KeyT'];

document.addEventListener('keydown', function(event) {
    // Standard Konami code for instant wealth
    konamiSequence.push(event.code);
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }

    if (konamiSequence.join(',') === konamiCode.join(',')) {
        document.getElementById('wallet').classList.add('rich');
        document.getElementById('survivalPercentage').textContent = '100%';
        document.getElementById('survivalAnalysis').textContent = 'Congratulations! You\'ve unlocked the cheat code for financial stability. Unfortunately, this doesn\'t work with real bank accounts or SARS.';
        document.getElementById('survivalResult').style.display = 'block';
        document.getElementById('survivalPercentage').style.color = '#007749';
        konamiSequence = []; // Reset
    }

    // BRAAI code - because it's always braai time somewhere in SA
    braaiSequence.push(event.code);
    if (braaiSequence.length > braaiCode.length) {
        braaiSequence.shift();
    }

    if (braaiSequence.join(',') === braaiCode.join(',')) {
        alert('🔥 BRAAI MODE ACTIVATED! 🔥\n\nReminder: Even if you\'re broke, you can still have a braai with friends!\nJust bring the vibe, someone else can bring the vleis.');
        braaiSequence = []; // Reset
    }

    // HOWZIT code - proper South African greeting
    howzitSequence.push(event.code);
    if (howzitSequence.length > howzitCode.length) {
        howzitSequence.shift();
    }

    if (howzitSequence.join(',') === howzitCode.join(',')) {
        const greetings = [
            'Howzit my bru! 🤙',
            'Sharp sharp! Looking good! 👌',
            'Eish, how\'s it going? 😅',
            'All good in the hood? 🏘️',
            'Lekker to see you! 😎'
        ];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        alert(randomGreeting);
        howzitSequence = []; // Reset
    }
});

// ===============================================================
// SOUTH AFRICAN DATE AND TIME UTILITIES
// ===============================================================
function formatSouthAfricanDate(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Africa/Johannesburg'
    };
    return date.toLocaleDateString('en-ZA', options);
}

function getSouthAfricanTime() {
    return new Date().toLocaleString('en-ZA', {
        timeZone: 'Africa/Johannesburg',
        hour12: false
    });
}

// ===============================================================
// MOTIVATIONAL MESSAGES SYSTEM
// ===============================================================
const motivationalMessages = [
    'Remember: This too shall pass (unlike the petrol price increases).',
    'You\'ve survived 100% of your worst financial days so far!',
    'At least you\'re not paying load shedding insurance premiums.',
    'Think positive: In a few days you can afford name-brand coffee again!',
    'Your bank balance may be low, but your spirit is high! 💪',
    'Soon you\'ll be shopping at Woolies like a proper adult again.',
    'Hang in there! Your future rich self will thank your current broke self.',
    'You\'re not broke, you\'re just pre-wealthy! 🌟'
];

function showRandomMotivation() {
    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    const motivation = document.createElement('div');
    motivation.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #007749, #005234);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: bold;
        max-width: 300px;
        border: 2px solid #FFB612;
    `;
    motivation.textContent = message;
    document.body.appendChild(motivation);

    // Remove after 5 seconds
    setTimeout(() => {
        if (motivation.parentNode) {
            motivation.parentNode.removeChild(motivation);
        }
    }, 5000);
}

// ===============================================================
// SPECIAL SOUTH AFRICAN FEATURES
// ===============================================================
function checkForSpecialDates() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();

    // Heritage Day (24 September)
    if (month === 8 && day === 24) {
        document.querySelector('.tagline').textContent = 'Happy Heritage Day! Celebrating Diversity in Poverty Since 1995™';
    }

    // Youth Day (16 June)
    if (month === 5 && day === 16) {
        document.querySelector('.tagline').textContent = 'Youth Day Special: Young and Broke Since 1976™';
    }

    // Freedom Day (27 April)
    if (month === 3 && day === 27) {
        document.querySelector('.tagline').textContent = 'Freedom Day: Free to be Financially Challenged™';
    }

    // Month-end madness (last 3 days of month)
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    if (day >= lastDay - 2) {
        showRandomMotivation();
    }
}

// ===============================================================
// INITIALIZATION AND EVENT LISTENERS
// ===============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🇿🇦 South African Pre-Payday Survival Bureau initialized successfully!');
    console.log('⏰ Target payday:', formatSouthAfricanDate(PAYDAY_DATE));
    console.log('🛠️ To change the payday date, modify the PAYDAY_DATE variable at the top of script.js');
    console.log('💡 Easter eggs: Try typing "BRAAI" or "HOWZIT" or use the Konami code!');

    // Start the countdown timer
    updateCountdown();

    // Update countdown every second (unless there's load shedding)
    setInterval(updateCountdown, 1000);

    // Add click listener to survival button
    document.getElementById('survivalButton').addEventListener('click', calculateSouthAfricanSurvival);

    // Check for special South African dates
    checkForSpecialDates();

    // Add some local flair every 30 seconds
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
            showRandomMotivation();
        }
    }, 30000);

    // Load shedding simulation - Triple L press (LLL)
    let loadSheddingSequence = [];
    let loadSheddingTimer;

    document.addEventListener('keydown', function(event) {
        if (event.code === 'KeyL') {
            clearTimeout(loadSheddingTimer);
            loadSheddingSequence.push('L');

            // Reset sequence after 2 seconds of no input
            loadSheddingTimer = setTimeout(() => {
                loadSheddingSequence = [];
            }, 2000);

            // Trigger load shedding on triple L
            if (loadSheddingSequence.length >= 3) {
                event.preventDefault();
                simulateLoadShedding();
                loadSheddingSequence = []; // Reset
            }
        }
    });

    console.log('🕐 Current SA time:', getSouthAfricanTime());

    // Show a welcome message
    setTimeout(() => {
        if (Math.random() < 0.7) { // 70% chance of showing welcome
            showRandomMotivation();
        }
    }, 2000);

    // Show instructions for easter eggs
    console.log(`
🎮 EASTER EGG INSTRUCTIONS:
- Press L three times quickly (LLL) for load shedding simulation
- Type "BRAAI" for braai mode
- Type "HOWZIT" for SA greetings
- Use Konami code (↑↑↓↓←→←→BA) for instant wealth
    `);
});

// ===============================================================
// UTILITY FUNCTIONS FOR FUTURE ENHANCEMENTS
// ===============================================================

// Function to calculate days until next public holiday
function daysUntilNextPublicHoliday() {
    const today = new Date();
    const publicHolidays2025 = [
        new Date(2025, 0, 1),   // New Year's Day
        new Date(2025, 2, 21),  // Human Rights Day
        new Date(2025, 3, 18),  // Good Friday
        new Date(2025, 3, 21),  // Family Day
        new Date(2025, 3, 27),  // Freedom Day
        new Date(2025, 4, 1),   // Workers' Day
        new Date(2025, 5, 16),  // Youth Day
        new Date(2025, 7, 9),   // National Women's Day
        new Date(2025, 8, 24),  // Heritage Day
        new Date(2025, 11, 16), // Day of Reconciliation
        new Date(2025, 11, 25), // Christmas Day
        new Date(2025, 11, 26)  // Day of Goodwill
    ];

    const nextHoliday = publicHolidays2025.find(holiday => holiday > today);
    if (nextHoliday) {
        const diff = nextHoliday.getTime() - today.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return null;
}

// Function to check if it's a payday (25th or last working day)
function isPayday(date = new Date()) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Check if it's the 25th
    if (day === 25) return true;

    // Check if it's the last working day of the month
    const lastDay = new Date(year, month + 1, 0);
    const lastWorkingDay = getLastWorkingDay(year, month);

    return day === lastWorkingDay.getDate();
}

function getLastWorkingDay(year, month) {
    let lastDay = new Date(year, month + 1, 0);

    // Move backwards from last day until we find a weekday
    while (lastDay.getDay() === 0 || lastDay.getDay() === 6) {
        lastDay.setDate(lastDay.getDate() - 1);
    }

    return lastDay;
}

// Console easter egg
console.log(`
🇿🇦 Welcome to the South African Pre-Payday Survival Bureau! 🇿🇦

Available Easter Eggs:
- Press L three times quickly (LLL) for load shedding simulation  
- Type "BRAAI" for braai mode
- Type "HOWZIT" for a proper SA greeting  
- Use Konami code (↑↑↓↓←→←→BA) for instant wealth

Fun fact: You have ${daysUntilNextPublicHoliday() || 'many'} days until the next public holiday!

Stay strong, boet/sus! Payday is coming! 💪
`);

// ===============================================================
// END OF SOUTH AFRICAN PRE-PAYDAY SURVIVAL BUREAU SCRIPT
// ===============================================================