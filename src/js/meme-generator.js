document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('testCanvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('downloadBtn');
    const topTextInput = document.getElementById('top-text');
    const bottomTextInput = document.getElementById('bottom-text');
    const imageUpload = document.getElementById('image-upload');

    // Initialize canvas with placeholder image
    const img = new Image();
    img.onload = () => {
        currentImage = img;
        // Only draw the placeholder, don't trigger download
        drawImage(img);
    };
    img.src = '/src/assets/images/meme-placeholder.png';

    // Text styling
    const textFont = 'bold 48px Impact';
    const textColor = '#FFFFFF';
    const textStrokeColor = '#000000';
    const textStrokeWidth = 6; // Reduced stroke width to prevent spikes
    const letterSpacing = '0.1em';

    // Function to draw text on canvas
    function drawText() {
        ctx.font = textFont;
        ctx.fillStyle = textColor;
        ctx.strokeStyle = textStrokeColor;
        ctx.lineWidth = textStrokeWidth;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.miterLimit = 4; // Reduced miter limit to prevent spikes

        const drawTextLine = (text, y) => {
            const x = canvas.width / 2;
            ctx.strokeText(text, x, y);
            ctx.fillText(text, x, y);
        };

        if (topTextInput.value) {
            drawTextLine(topTextInput.value.toUpperCase(), canvas.height * 0.08);
        }
        if (bottomTextInput.value) {
            drawTextLine(bottomTextInput.value.toUpperCase(), canvas.height * 0.92);
        }
    }

    // Function to draw any image on the canvas
    function drawImage(image) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const scale = Math.min(
            canvas.width / image.width,
            canvas.height / image.height
        );
        
        const scaledWidth = image.width * scale;
        const scaledHeight = image.height * scale;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;
        
        // Draw the image
        ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
        
        // Draw the text after the image
        drawText();
    }

    function finalizeSave() {
        const link = document.createElement('a');
        const topText = topTextInput.value.trim() || 'There is no dev';
        const bottomText = bottomTextInput.value.trim() || 'ILY';
        
        const filename = topText === 'THERE IS NO DEV' && bottomText === 'ILY' ? 
            'There is no dev ILY' :
            `${topText} ${bottomText}`;

        const cleanFilename = filename
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, ' ')
            .substring(0, 50);

        link.download = cleanFilename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    // Track current image
    let currentImage = null;

    // Handle image upload
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    currentImage = img;
                    drawImage(img);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Update canvas when text changes
    [topTextInput, bottomTextInput].forEach(input => {
        input.addEventListener('input', () => {
            if (currentImage) {
                drawImage(currentImage);
            }
        });
    });

    // Add download event listener
    downloadBtn.addEventListener('click', saveMeme);
});
