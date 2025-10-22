            const canvas = document.getElementById('codeCanvas');
            const ctx = canvas.getContext('2d');

            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;

            window.addEventListener('resize', () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
                columns = Math.floor(width / fontSize);
                drops = Array(columns).fill(1);
            });

            // Using only monospace/code-like characters
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:|,./<>?`~';
            const fontSize = 14;
            let columns = Math.floor(width / fontSize);
            let drops = Array(columns).fill(1); 

            function draw() {
                // Dim the screen (creates the trailing effect)
                ctx.fillStyle = 'rgba(13, 17, 23, 0.15)'; 
                ctx.fillRect(0, 0, width, height);
                // Set the color for the falling characters (green)
                ctx.fillStyle = 'rgba(72, 187, 120, 0.6)'; 
                ctx.font = `${fontSize}px monospace`;

                for (let i = 0; i < drops.length; i++) {
                    const text = characters.charAt(Math.floor(Math.random() * characters.length));
                    const x = i * fontSize;
                    const y = drops[i] * fontSize;

                    ctx.fillText(text, x, y);

                    // Send the character back to the top if it's off-screen (and randomly)
                    if (y * fontSize > height && Math.random() > 0.97) {
                        drops[i] = 0; 
                    }
                    drops[i]++;
                }
                requestAnimationFrame(draw);
            }

            // --- Search and Highlight Logic ---
            const searchForm = document.getElementById('searchForm');
            const searchInput = document.getElementById('searchInput');

            // Map simplified query keywords to project IDs
            const projectMap = {
                // Mappings for Web Calculator Suvo (project-alpha)
                'calculator': 'project-alpha',
                'cal': 'project-alpha',
                'suvo': 'project-alpha',

                // Mappings for Secure Chat Application (project-securechat)
                'chat': 'project-securechat',
                'secure': 'project-securechat',
                'messaging': 'project-securechat',

                // Mappings for Music With Guitar (project-dataviz)
                'guitar': 'project-dataviz',
                'music': 'project-dataviz',
                'shop': 'project-dataviz',
                'viz': 'project-dataviz' // Keeping original ID mapping
            };

            searchForm.addEventListener('submit', (e) => {
                e.preventDefault(); 
                const query = searchInput.value.toLowerCase().trim();
                const keywords = Object.keys(projectMap);
                let targetId = null;

                // Find the project ID based on keywords
                for (const keyword of keywords) {
                    if (query.includes(keyword)) {
                        targetId = projectMap[keyword];
                        break;
                    }
                }

                if (targetId) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        // 1. Scroll smoothly to the element
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                        // 2. Programmatically apply the highlight effect (CSS handles the look)
                        targetElement.classList.add('highlight-effect');
                        
                        // 3. Remove the effect after 1.5 seconds
                        setTimeout(() => {
                            targetElement.classList.remove('highlight-effect');
                        }, 1500);
                        
                        // Clear the input after successful search
                        searchInput.value = '';
                    } else {
                         // This is the check that was previously failing
                         console.error(`Error: Project element with ID '${targetId}' not found.`);
                    }
                } else {
                    console.log("No matching project found for query:", query);
                    // Provide visual feedback for failed search
                    searchInput.classList.add('border-red-500', 'ring-red-500');
                    setTimeout(() => {
                        searchInput.classList.remove('border-red-500', 'ring-red-500');
                    }, 500);
                }
            });

            // Start animation on load
            window.onload = function () {
                draw();
            }