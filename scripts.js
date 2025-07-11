function showTool(index) {
    document.querySelectorAll('.tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.tool').forEach((tool, i) => {
        tool.classList.toggle('active', i === index);
    });
}

function calculateDifference() {
    const date1 = new Date(document.getElementById("date1").value);
    const date2 = new Date(document.getElementById("date2").value);
    const unit = document.getElementById("unit").value;
    if (!date1 || !date2) return;
    const diffMs = Math.abs(date2 - date1);
    let result;
    switch (unit) {
        case "days": result = diffMs / (1000 * 60 * 60 * 24); break;
        case "hours": result = diffMs / (1000 * 60 * 60); break;
        case "minutes": result = diffMs / (1000 * 60); break;
        case "seconds": result = diffMs / 1000; break;
    }
    document.getElementById("diffResult").textContent = `Difference: ${result.toFixed(2)} ${unit}`;
}

function convertTimezone() {
    const source = document.getElementById("sourceDate").value;
    const fromTZ = document.getElementById("fromTZ").value;
    const toTZ = document.getElementById("toTZ").value;
    if (!source) return;
    const dt = new Date(source);
    const utc = dt.toISOString();
    try {
        const toTime = new Intl.DateTimeFormat("en-US", {
            timeZone: toTZ,
            dateStyle: "full",
            timeStyle: "long",
        }).format(new Date(utc));
        document.getElementById("convertResult").textContent = `Converted time in ${toTZ}: ${toTime}`;
    } catch (e) {
        document.getElementById("convertResult").textContent = `Error converting time.`;
    }
}

let countdownState = 'stopped';
let countdownTarget = null;
let countdownInterval = null;

function toggleCountdown() {
    const btn = document.getElementById("countdownControl");
    const resetBtn = document.getElementById("resetCountdown");
    const output = document.getElementById("countdownResult");

    if (countdownState === 'stopped') {
        countdownTarget = new Date(document.getElementById("countdownDate").value).getTime();
        if (!countdownTarget) return;
        countdownState = 'running';
        btn.textContent = "Stop";
        resetBtn.style.display = 'none';
        countdownInterval = setInterval(updateCountdown, 1000);
    } else if (countdownState === 'running') {
        countdownState = 'paused';
        clearInterval(countdownInterval);
        btn.textContent = "Resume";
        resetBtn.style.display = 'inline-block';
    } else if (countdownState === 'paused') {
        countdownState = 'running';
        btn.textContent = "Stop";
        resetBtn.style.display = 'none';
        countdownInterval = setInterval(updateCountdown, 1000);
    }
}

function updateCountdown() {
    const output = document.getElementById("countdownResult");
    const now = new Date().getTime();
    const distance = countdownTarget - now;
    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownState = 'stopped';
        document.getElementById("countdownControl").textContent = "Start Countdown";
        document.getElementById("resetCountdown").style.display = 'inline-block';
        output.textContent = "Countdown finished!";
        return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    output.textContent = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function resetCountdown() {
    clearInterval(countdownInterval);
    countdownState = 'stopped';
    document.getElementById("countdownControl").textContent = "Start Countdown";
    document.getElementById("resetCountdown").style.display = 'none';
    document.getElementById("countdownResult").textContent = "";
}

function calculateAge() {
    const birth = new Date(document.getElementById("birthDate").value);
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("ageResult").textContent =
        `You are ${years} years, ${months} months, and ${days} days old.`;
}

function convertTimestamp() {
    const ts = parseInt(document.getElementById("unixTimestamp").value);
    if (isNaN(ts)) return;
    const date = new Date(ts * 1000);
    document.getElementById("timestampResult").textContent = `Date: ${date.toLocaleString()}`;
}