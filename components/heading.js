export default class Heading extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const level = this.getAttribute('level') || 1;

        const title = document.createElement(`h${level}`);
        title.classList.add(`heading-${level}`);

        const style = document.createElement('style');

        const text = this.getAttribute('text') || 'Inserir texto';

        text.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.animationDelay = `${(index + 1) * 0.075}s`;
            title.appendChild(span);
        });

        style.textContent = `
        * {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        span.animate {
            display: inline-block;
            animation-name: text-intro;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }

        .heading-1 {
        font-size: 3vmax;
        }
        .heading-2 {
        font-size: 2.5vmax;
        }
        .heading-3 {
        font-size: 2vmax;
        }
        .heading-4 {
        font-size: 1.5vmax;
        }
        .heading-5 {
        font-size: 1vmax;
        }
        .heading-6 {
        font-size: 0.5vmax;
        }

        @keyframes text-intro {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-50%);
            }
            100% {
                transform: translateY(0);
            }
        }
        `;

        shadow.appendChild(style);
        shadow.appendChild(title);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const spans = shadow.querySelectorAll('span');
                        spans.forEach((span) => span.classList.add('animate'));
                        observer.disconnect();
                    }
                });
            },
            { threshold: 1 }
        );
        observer.observe(this);
    }
    disconnectedCallback() {}
}
