document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;
        
        followerX += distX * 0.1;
        followerY += distY * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    document.querySelectorAll('a, .project-card, .skill-category').forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        elem.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('skill-item')) {
                    const progress = entry.target.querySelector('.skill-progress');
                    if (progress) {
                        const width = progress.style.width;
                        progress.style.width = '0';
                        setTimeout(() => {
                            progress.style.width = width;
                        }, 100);
                    }
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.project-card, .skill-category, .highlight-item, .contact-item').forEach(elem => {
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(30px)';
        observer.observe(elem);
    });
    
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.scrollY < 100 && scrollIndicator) {
                scrollIndicator.style.opacity = '1';
            }
        }, 150);
    });
    
    const heroTag = document.querySelector('.hero-tag');
    const heroStats = document.querySelector('.hero-stats');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTag) {
        heroTag.style.opacity = '0';
        heroTag.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroTag.style.transition = 'all 0.6s ease';
            heroTag.style.opacity = '1';
            heroTag.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroStats) {
        heroStats.style.opacity = '0';
        heroStats.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroStats.style.transition = 'all 0.6s ease';
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateY(0)';
        }, 400);
    }
    
    if (heroCta) {
        heroCta.style.opacity = '0';
        heroCta.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroCta.style.transition = 'all 0.6s ease';
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 600);
    }
});