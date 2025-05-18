document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('testCanvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('downloadBtn');

    // Add unified download functionality
    let isDownloading = false;
    let longPressTimer = null;
    const LONG_PRESS_DURATION = 1000; // 1 second

    // Add long-press functionality for mobile devices
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        longPressTimer = setTimeout(() => {
            if (!isDownloading) {
                isDownloading = true;
                saveMeme();
            }
        }, LONG_PRESS_DURATION);
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (longPressTimer) {
            clearTimeout(longPressTimer);
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (longPressTimer) {
            clearTimeout(longPressTimer);
        }
    });

    // Add click event for desktop
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isDownloading) return;
        
        isDownloading = true;
        saveMeme();
    });

    downloadBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    downloadBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isDownloading) return;
        
        isDownloading = true;
        saveMeme();
    });

    function saveMeme() {
        const dataUrl = canvas.toDataURL('image/png');
        
        // Get text from canvas
        const topText = topTextInput.value.trim().replace(/[^\w\s]/g, '').toLowerCase();
        const bottomText = bottomTextInput.value.trim().replace(/[^\w\s]/g, '').toLowerCase();
        const fileName = `${topText}${bottomText ? ' ' + bottomText : ''}.png` || 'meme.png';
        
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = img.width;
                tempCanvas.height = img.height;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(img, 0, 0);
                
                tempCanvas.toBlob((blob) => {
                    const file = new File([blob], fileName, { type: 'image/png' });
                    
                    const form = document.createElement('form');
                    form.method = 'post';
                    form.enctype = 'multipart/form-data';
                    
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.files = [file];
                    
                    form.appendChild(fileInput);
                    
                    const submit = document.createElement('button');
                    submit.type = 'submit';
                    submit.style.display = 'none';
                    
                    form.appendChild(submit);
                    document.body.appendChild(form);
                    
                    submit.click();
                    
                    setTimeout(() => {
                        isDownloading = false;
                        form.remove();
                    }, 100);
                }, 'image/png');
            };
        } else {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            isDownloading = false;
        }
    }

    const topTextInput = document.getElementById('top-text');
    const bottomTextInput = document.getElementById('bottom-text');
    const imageUpload = document.getElementById('image-upload');

    // Track current image
    let currentImage = null;

    // Text styling
    const textStyles = {
        font: 'bold 30px Arial',
        color: '#FFFFFF',
        align: 'center',
        baseline: 'top',
        stroke: '#000000',
        strokeWidth: 2
    };

    function drawText() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (currentImage) {
            ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
        }
        
        // Draw top text
        ctx.font = textStyles.font;
        ctx.textAlign = textStyles.align;
        ctx.textBaseline = textStyles.baseline;
        ctx.fillStyle = textStyles.color;
        ctx.strokeStyle = textStyles.stroke;
        ctx.lineWidth = textStyles.strokeWidth;
        
        const topText = topTextInput.value;
        const bottomText = bottomTextInput.value;
        
        if (topText) {
            ctx.fillText(topText, canvas.width / 2, 50);
            ctx.strokeText(topText, canvas.width / 2, 50);
        }
        
        if (bottomText) {
            ctx.fillText(bottomText, canvas.width / 2, canvas.height - 50);
            ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 50);
        }
    }

    function drawImage(image) {
        currentImage = image;
        drawText();
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
                const img = new Image();
                img.onload = () => {
                    drawImage(img);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Update canvas when text changes
    topTextInput.addEventListener('input', drawText);
    bottomTextInput.addEventListener('input', drawText);
});