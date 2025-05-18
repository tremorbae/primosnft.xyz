document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('testCanvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('downloadBtn');

    // Add download functionality
    function saveMeme() {
        const dataUrl = canvas.toDataURL('image/png');
        
        // Get text from canvas
        const topText = topTextInput.value.trim().replace(/[^\w\s]/g, '').toLowerCase();
        const bottomText = bottomTextInput.value.trim().replace(/[^\w\s]/g, '').toLowerCase();
        const fileName = `${topText}${bottomText ? '-' + bottomText : ''}.png` || 'meme.png';
        
        // Check if we're on iOS
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            // For iOS, we'll use the native photo save functionality
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                // Create a temporary canvas to get the image data
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = img.width;
                tempCanvas.height = img.height;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(img, 0, 0);
                
                // Convert to blob and create a temporary image
                tempCanvas.toBlob((blob) => {
                    const file = new File([blob], fileName, { type: 'image/png' });
                    
                    // Create a temporary input element
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.style.display = 'none';
                    
                    // Create a temporary form
                    const form = document.createElement('form');
                    form.method = 'post';
                    form.enctype = 'multipart/form-data';
                    
                    // Create a file input
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.files = [file];
                    
                    // Append to form
                    form.appendChild(fileInput);
                    
                    // Create a submit button
                    const submit = document.createElement('button');
                    submit.type = 'submit';
                    submit.style.display = 'none';
                    
                    // Append submit button
                    form.appendChild(submit);
                    
                    // Append form to body
                    document.body.appendChild(form);
                    
                    // Submit form
                    submit.click();
                    
                    // Clean up
                    setTimeout(() => {
                        form.remove();
                        input.remove();
                    }, 100);
                }, 'image/png');
            };
        } else {
            // For other devices, use the standard download method
            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
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


});
