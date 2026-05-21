const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;
            
            // 1. Soften backgrounds to reduce glare
            newContent = newContent.replace(/#FCFAFF/g, '#F5F2FA');
            newContent = newContent.replace(/#F2EEF9/g, '#EAE4F2');

            // 2. Make text darker for readability
            newContent = newContent.replace(/text-\[#6B4FAD\]/g, 'text-[#4A2D8F]');
            newContent = newContent.replace(/hover:text-\[#6B4FAD\]/g, 'hover:text-[#4A2D8F]');
            newContent = newContent.replace(/text-\[#826AAB\]/g, 'text-[#59497A]');
            newContent = newContent.replace(/hover:text-\[#826AAB\]/g, 'hover:text-[#59497A]');

            // 3. Fix gradients
            newContent = newContent.replace(/to-\[#6B4FAD\]/g, 'to-[#4A2D8F]');
            newContent = newContent.replace(/from-\[#6B4FAD\]/g, 'from-[#4A2D8F]');
            newContent = newContent.replace(/via-\[#6B4FAD\]/g, 'via-[#4A2D8F]');

            // 4. Update CSS variables specifically
            if (fullPath.endsWith('.css')) {
                newContent = newContent.replace(/#826AAB/g, '#59497A');
                // #6B4FAD is not in globals.css, but just in case
            }

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log('Updated ' + fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
