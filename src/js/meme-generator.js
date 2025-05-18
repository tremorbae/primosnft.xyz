document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('testCanvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('downloadBtn');

    // Add long-press functionality for mobile devices
    let touchStartTimestamp = 0;
    let longPressTimeout = null;
    const LONG_PRESS_DURATION = 1000; // 1 second

    canvas.addEventListener('touchstart', (e) => {
        touchStartTimestamp = Date.now();
        longPressTimeout = setTimeout(() => {
            if (Date.now() - touchStartTimestamp >= LONG_PRESS_DURATION) {
                saveMeme();
            }
        }, LONG_PRESS_DURATION);
    });

    canvas.addEventListener('touchend', () => {
        clearTimeout(longPressTimeout);
    });

    // Add download functionality for both button and long-press
    function saveMeme() {
        const link = document.createElement('a');
        link.download = 'meme.png';
        const dataUrl = canvas.toDataURL('image/png');
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadBtn.addEventListener('click', saveMeme);
    const topTextInput = document.getElementById('top-text');
    const bottomTextInput = document.getElementById('bottom-text');
    const imageUpload = document.getElementById('image-upload');

    // Track current image
    let currentImage = null;

    // Text styling
    const textFont = 'bold 48px Impact';
    const textColor = '#FFFFFF';
    const textStrokeColor = '#000000';
    const textStrokeWidth = 8;
    const letterSpacing = '0.1em';
    


    // Function to draw text on canvas
    function drawText() {
        // Set text styling
        ctx.font = textFont;
        ctx.fillStyle = textColor;
        ctx.strokeStyle = textStrokeColor;
        ctx.lineWidth = textStrokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.miterLimit = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = letterSpacing;

        // Draw top text
        if (topTextInput.value) {
            const topText = topTextInput.value.toUpperCase();
            const topTextX = canvas.width / 2;
            const topTextY = canvas.height * 0.08; // Moved closer to top
            
            // Draw stroke
            ctx.strokeText(topText, topTextX, topTextY);
            // Draw fill
            ctx.fillText(topText, topTextX, topTextY);
        }

        // Draw bottom text
        if (bottomTextInput.value) {
            const bottomText = bottomTextInput.value.toUpperCase();
            const bottomTextX = canvas.width / 2;
            const bottomTextY = canvas.height * 0.92; // Moved closer to bottom
            
            // Draw stroke
            ctx.strokeText(bottomText, bottomTextX, bottomTextY);
            // Draw fill
            ctx.fillText(bottomText, bottomTextX, bottomTextY);
        }
    }


    // Function to draw any image on the canvas
    function drawImage(image) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate scale to fit the image while maintaining aspect ratio
        const imageAspectRatio = image.width / image.height;
        const canvasAspectRatio = canvas.width / canvas.height;
        
        let scale;
        if (imageAspectRatio > canvasAspectRatio) {
            // Image is wider than canvas
            scale = canvas.width / image.width;
        } else {
            // Image is taller than canvas
            scale = canvas.height / image.height;
        }
        
        const scaledWidth = image.width * scale;
        const scaledHeight = image.height * scale;
        
        // Calculate position to center the image
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;
        
        // Draw the image
        ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
        
        // Update current image reference
        currentImage = image;
        
        // Draw text
        drawText();
    }

    // Function to draw text on canvas
    function drawText() {
        // Set text styling
        ctx.font = textFont;
        ctx.fillStyle = textColor;
        ctx.strokeStyle = textStrokeColor;
        ctx.lineWidth = textStrokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.miterLimit = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw top text
        if (topTextInput.value) {
            const topText = topTextInput.value.toUpperCase();
            const topTextX = canvas.width / 2;
            const topTextY = canvas.height * 0.08; // Moved closer to top
            
            // Draw stroke
            ctx.strokeText(topText, topTextX, topTextY);
            // Draw fill
            ctx.fillText(topText, topTextX, topTextY);
        }

        // Draw bottom text
        if (bottomTextInput.value) {
            const bottomText = bottomTextInput.value.toUpperCase();
            const bottomTextX = canvas.width / 2;
            const bottomTextY = canvas.height * 0.92; // Moved closer to bottom
            
            // Draw stroke
            ctx.strokeText(bottomText, bottomTextX, bottomTextY);
            // Draw fill
            ctx.fillText(bottomText, bottomTextX, bottomTextY);
        }
    }

    // Load and draw the meme placeholder
    const img = new Image();
    img.src = '/src/assets/images/meme-placeholder.png';
    img.onload = () => {
        drawImage(img);
    };

    // Handle image upload
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const uploadedImg = new Image();
                uploadedImg.onload = () => {
                    drawImage(uploadedImg);
                };
                uploadedImg.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Update canvas when text changes
    topTextInput.addEventListener('input', () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw current image if exists
        if (currentImage) {
            drawImage(currentImage);
        }
    });

    bottomTextInput.addEventListener('input', () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw current image if exists
        if (currentImage) {
            drawImage(currentImage);
        }
    });

    // Add download functionality
    downloadBtn.addEventListener('click', () => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.download = 'meme-placeholder.png';
        
        // Get the canvas data URL
        const dataUrl = canvas.toDataURL('image/png');
        
        // Set the link href to the data URL
        link.href = dataUrl;
        
        // Append the link to the body and trigger click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
