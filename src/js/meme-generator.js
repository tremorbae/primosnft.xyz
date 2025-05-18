document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('testCanvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('downloadBtn');
    const topTextInput = document.getElementById('top-text');
    const bottomTextInput = document.getElementById('bottom-text');
    const imageUpload = document.getElementById('image-upload');

    // Track current image
    let currentImage = null;

    // Function to handle image loading
    function loadImage(src) {
        const img = new Image();
        img.onload = () => {
            currentImage = img;
            drawImage(img);
        };
        img.src = src;
    }

    // Initialize canvas with placeholder image
    loadImage('/src/assets/images/meme-placeholder.png');

    // Text styling
    const textStyles = {
        font: 'bold 48px Impact',
        color: '#FFFFFF',
        strokeColor: '#000000',
        strokeWidth: 6,
        miterLimit: 4
    };

    // Function to draw text on canvas
    function drawText() {
        ctx.font = textStyles.font;
        ctx.fillStyle = textStyles.color;
        ctx.strokeStyle = textStyles.strokeColor;
        ctx.lineWidth = textStyles.strokeWidth;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.miterLimit = textStyles.miterLimit;

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
        
        ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
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

    // Handle image upload
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                loadImage(event.target.result);
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

    // Add download button event listener
    downloadBtn.addEventListener('click', () => {
        if (!currentImage) {
            loadImage('/src/assets/images/meme-placeholder.png');
            return;
        }
        drawImage(currentImage);
        finalizeSave();
    });
});
