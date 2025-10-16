document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for the last command
    const commands = [
        "echo 'Thank you for visiting!'",
        "echo 'Feel free to reach out!'",
        "echo 'Looking for DevOps opportunities'",
        "echo 'Available for new challenges'"
    ];
    
    let currentCommand = 0;
    let currentChar = 0;
    const typedCommand = document.getElementById('typed-command');
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newCommandDelay = 2000;
    
    function typeCommand() {
        if (currentChar < commands[currentCommand].length) {
            typedCommand.textContent += commands[currentCommand].charAt(currentChar);
            currentChar++;
            setTimeout(typeCommand, typingSpeed);
        } else {
            setTimeout(eraseCommand, newCommandDelay);
        }
    }
    
    function eraseCommand() {
        if (currentChar > 0) {
            typedCommand.textContent = commands[currentCommand].substring(0, currentChar - 1);
            currentChar--;
            setTimeout(eraseCommand, erasingSpeed);
        } else {
            currentCommand = (currentCommand + 1) % commands.length;
            setTimeout(typeCommand, typingSpeed + 1000);
        }
    }
    
    // Expandable sections functionality - רק עבור About Me ו-Connect
    const expandHeaders = document.querySelectorAll('.expand-header');
    
    expandHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');
            
            // Toggle active class
            this.classList.toggle('active');
            content.classList.toggle('show');
            
            // Rotate arrow
            if (this.classList.contains('active')) {
                arrow.style.transform = 'rotate(90deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Auto-expand About Me section after a delay
    setTimeout(() => {
        if (expandHeaders.length > 0) {
            expandHeaders[0].click(); // About Me section
        }
    }, 1000);
    
    // Add click to copy email
    const emailElement = document.querySelector('.contact-info p:first-child');
    emailElement.style.cursor = 'pointer';
    emailElement.addEventListener('click', function() {
        const email = 'razasarusi8@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-envelope"></i> Email copied to clipboard!';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
    
    // Start typing animation after a delay
    setTimeout(typeCommand, 1000);
});