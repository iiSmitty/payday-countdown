// ===============================================================
// SOUTH AFRICAN PRE-PAYDAY SURVIVAL BUREAU
// ===============================================================
// Proudly South African countdown timer and survival calculator
// Load shedding resistant and SARS compliant!

// ===============================================================
// DYNAMIC PAYDAY CALCULATION
// ===============================================================

function getNextPayday() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    // Try current month first
    let paydayMonth = currentMonth;
    let paydayYear = currentYear;

    // Calculate payday for current month
    let payday = calculatePaydayForMonth(paydayYear, paydayMonth);

    // If payday has already passed this month, get next month's payday
    if (today > payday) {
        paydayMonth++;
        if (paydayMonth > 11) {
            paydayMonth = 0;
            paydayYear++;
        }
        payday = calculatePaydayForMonth(paydayYear, paydayMonth);
    }

    return payday;
}

function calculatePaydayForMonth(year, month) {
    // Most common payday is 25th, but if it's weekend, use last working day
    let payday = new Date(year, month, 25, 9, 0, 0); // 9 AM on 25th

    // If 25th is Saturday (6) or Sunday (0), move to Friday
    if (payday.getDay() === 6) { // Saturday
        payday.setDate(24); // Friday
    } else if (payday.getDay() === 0) { // Sunday
        payday.setDate(24); // Friday (25th - 1)
    }

    // Alternative: Some companies pay on last working day of month
    // Uncomment this section if you prefer last working day instead of 25th
    /*
    let lastDay = new Date(year, month + 1, 0); // Last day of month
    while (lastDay.getDay() === 0 || lastDay.getDay() === 6) {
        lastDay.setDate(lastDay.getDate() - 1); // Move to previous working day
    }
    lastDay.setHours(9, 0, 0, 0); // Set to 9 AM
    payday = lastDay;
    */

    return payday;
}

// ===============================================================
// ENHANCED COUNTDOWN TIMER FUNCTIONALITY
// ===============================================================

// Message state management to prevent flickering
let currentMessage = '';
let lastMessageUpdate = 0;

// Enhanced but satirical countdown functionality with smooth transitions
function updateCountdown() {
    const payDay = getNextPayday().getTime(); // Dynamic payday calculation!
    const now = new Date().getTime();
    const timeRemaining = payDay - now;
    const section = document.querySelector('.countdown-section');

    if (timeRemaining < 0) {
        smoothUpdateNumber('days', 0);
        smoothUpdateNumber('hours', 0);
        smoothUpdateNumber('minutes', 0);
        smoothUpdateNumber('seconds', 0);
        smoothUpdateMessage('🎉 Payday has arrived! Please proceed to Woolies (Eskom permitting) 🎉');
        section.classList.add('celebration');
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    smoothUpdateNumber('days', days);
    smoothUpdateNumber('hours', hours);
    smoothUpdateNumber('minutes', minutes);
    smoothUpdateNumber('seconds', seconds);

    updateSatiricalMessage(days, hours);

    // Add urgency styling
    if (days === 0 && hours < 6) {
        section.classList.add('urgent');
    } else {
        section.classList.remove('urgent');
    }

    // Wallet logic - gets richer as payday approaches
    const weekBeforePayday = new Date(getNextPayday().getTime() - (7 * 24 * 60 * 60 * 1000));
    const totalCountdownTime = getNextPayday().getTime() - weekBeforePayday.getTime();
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

    // Update vibe check occasionally
    if (seconds % 30 === 0) {
        updateVibeCheck();
    }
}

// Smooth number update function
function smoothUpdateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    const newValueString = String(newValue).padStart(2, '0');

    // Only animate if the value actually changed
    if (element.textContent !== newValueString) {
        element.classList.add('changing');

        setTimeout(() => {
            element.textContent = newValueString;
            element.classList.remove('changing');
        }, 150);
    }
}

// Smooth message update function
function smoothUpdateMessage(newMessage) {
    const messageElement = document.getElementById('countdownMessage');

    if (messageElement.innerHTML !== newMessage) {
        messageElement.classList.add('fade-out');

        setTimeout(() => {
            messageElement.innerHTML = newMessage;
            messageElement.classList.remove('fade-out');
            messageElement.classList.add('fade-in');

            setTimeout(() => {
                messageElement.classList.remove('fade-in');
            }, 400);
        }, 200);
    }
}

function updateSatiricalMessage(days, hours) {
    const now = Date.now();

    // Only update message every 10 seconds or when time period changes significantly
    if (now - lastMessageUpdate < 10000 && currentMessage !== '') {
        return; // Don't update message too frequently
    }

    const messages = [
        'Official Countdown to Salary Day (Subject to SARS Deductions, Municipal Rate Increases, and Eskom\'s Mood)',
        'Calculations verified by the Department of Financial Desperation (Accuracy not guaranteed during load shedding)',
        'Timer synchronized with African Standard Time (Load shedding delays may apply)',
        'As endorsed by the South African Association of Broke Professionals (SAABP)',
        'Certified by the Bureau of Pre-Payday Survival Strategies (Results may vary with petrol prices)'
    ];

    let message = messages[0]; // Default

    if (days === 0 && hours < 24) {
        message = '🚨 FINAL COUNTDOWN PROTOCOL ACTIVATED! Emergency two-minute noodle rations recommended! 🚨';
    } else if (days === 1) {
        message = 'ONE DAY REMAINING: Please begin preliminary Shoprite list compilation (Generic brands only)';
    } else if (days <= 3) {
        message = 'APPROACHING PAYDAY: Financial resurrection protocols initiating. Stand by<span class="loading-dots"></span>';
    } else if (days <= 7) {
        message = 'WEEK REMAINING: Maintain current subsistence levels. Avoid Shell garage at all costs.';
    } else if (days > 15) {
        message = 'EXTENDED COUNTDOWN: Long-term survival mode engaged. Consider befriending local spaza shop owner.';
    }

    // Only occasionally cycle through different disclaimers, and only if enough time has passed
    if (Math.random() < 0.05 && now - lastMessageUpdate > 30000) { // 5% chance and 30+ seconds passed
        message = messages[Math.floor(Math.random() * messages.length)];
    }

    // Only update if the message actually changed
    if (message !== currentMessage) {
        currentMessage = message;
        lastMessageUpdate = now;
        smoothUpdateMessage(message);
    }
}

// Enhanced but less glitchy click interaction
function checkBankBalance(element) {
    const timeLabel = element.querySelector('.time-label');
    const originalText = timeLabel.textContent;
    const jokes = ['EMPTY', 'ERROR', 'R0.00', 'NaN', '404', 'HAHA'];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    // Smooth transition for the joke
    timeLabel.style.transition = 'all 0.3s ease';
    timeLabel.style.opacity = '0';
    element.style.transition = 'all 0.3s ease';

    setTimeout(() => {
        timeLabel.textContent = randomJoke;
        timeLabel.style.opacity = '1';
        element.style.background = 'linear-gradient(145deg, #DE3831 0%, #b71c1c 100%)';
    }, 150);

    setTimeout(() => {
        timeLabel.style.opacity = '0';
        setTimeout(() => {
            timeLabel.textContent = originalText;
            timeLabel.style.opacity = '1';
            element.style.background = 'linear-gradient(145deg, #007749 0%, #005234 100%)';
        }, 150);
    }, 2000);
}

// Less aggressive load shedding simulation
function simulateLoadSheddingGlitch() {
    if (Math.random() < 0.015) { // Reduced frequency from 2% to 1.5%
        const powerStatus = document.querySelector('.power-status');

        // Smooth transition for power status
        powerStatus.style.transition = 'all 0.4s ease';
        powerStatus.style.opacity = '0.5';

        setTimeout(() => {
            powerStatus.textContent = '🔌 Stage 4';
            powerStatus.style.color = '#DE3831';
            powerStatus.style.opacity = '1';
        }, 200);

        // Gentler flicker effect
        document.querySelectorAll('.time-unit').forEach((unit, index) => {
            setTimeout(() => {
                unit.style.transition = 'opacity 0.2s ease';
                unit.style.opacity = '0.6';
                setTimeout(() => {
                    unit.style.opacity = '1';
                }, 300);
            }, index * 100);
        });

        setTimeout(() => {
            powerStatus.style.opacity = '0.5';
            setTimeout(() => {
                powerStatus.innerHTML = '🔋 Stage 0';
                powerStatus.style.color = 'rgba(0, 119, 73, 0.6)';
                powerStatus.style.opacity = '1';
            }, 200);
        }, 2500);
    }
}

// ===============================================================
// SOUTH AFRICAN SURVIVAL PROBABILITY CALCULATOR
// ===============================================================

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

    // Close on backdrop click
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            backdrop.remove();
        }
    });

    document.body.appendChild(backdrop);

    // Auto remove after 8 seconds
    setTimeout(() => {
        if (backdrop.parentNode) {
            backdrop.remove();
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

// ===============================================================
// LOAD SHEDDING SIMULATION
// ===============================================================

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
    `;

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
        <button onclick="this.parentElement.parentElement.remove();" style="
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
// EASTER EGGS AND SPECIAL FEATURES
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
// UTILITY FUNCTIONS
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
// INITIALIZATION
// ===============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Start the countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    setInterval(simulateLoadSheddingGlitch, 5000);

    // Initialize the first message
    currentMessage = 'Official Countdown to Salary Day (Subject to SARS Deductions, Municipal Rate Increases, and Eskom\'s Mood)';
    lastMessageUpdate = Date.now();

    // Add click listener to survival button
    const survivalButton = document.getElementById('survivalButton');
    if (survivalButton) {
        survivalButton.addEventListener('click', calculateSouthAfricanSurvival);
    }

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

    // Show welcome message with Easter egg instructions
    setTimeout(() => {
        if (Math.random() < 0.7) { // 70% chance of showing welcome
            showRandomMotivation();
        }
    }, 2000);

    // Clean console output - only show the welcome message
    console.log(`🇿🇦 Welcome to the South African Pre-Payday Survival Bureau! 🇿🇦

Available Easter Eggs:
- Press L three times quickly (LLL) for load shedding simulation  
- Type "BRAAI" for braai mode
- Type "HOWZIT" for a proper SA greeting  
- Use Konami code (↑↑↓↓←→←→BA) for instant wealth

Fun fact: You have ${daysUntilNextPublicHoliday() || 'many'} days until the next public holiday!

Stay strong, boet/sus! Payday is coming! 💪`);
});

// ===============================================================
// END OF SOUTH AFRICAN PRE-PAYDAY SURVIVAL BUREAU SCRIPT
// ===============================================================