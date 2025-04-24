export default class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.animationFrameId = null;
        this.buttonRef = null;
        this.fillRef = null;
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const button = document.createElement('button');
        button.type = this.getAttribute('type') || 'button';
        this.buttonRef = button;

        const span = document.createElement('span');
        span.textContent = this.getAttribute('text') || 'Inserir Texto';
        button.appendChild(span);

        const fill = document.createElement('div');
        this.fillRef = fill;
        button.appendChild(fill);

        const style = document.createElement('style');
        style.textContent = `
            * {
                font-family: 'Comic Sans MS', cursive, sans-serif;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            button {
                position: relative;
                width : ${this.getAttribute('width') || '7.5em'};
                aspect-ratio: 16/9;
                cursor: pointer;
                border-radius: 1em;
                background: none;
                border: 2px solid ${this.getAttribute('color') || 'black'};
                outline: none;
                overflow: hidden;
                transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
                &:active {
                    transform: scale(0.9);
                }
                &:hover span {
                    color: ${this.getAttribute('text-color') || 'black'};
                }
                & span {
                    z-index: 1; 
                    position: relative; 
                    color: ${this.getAttribute('color') || 'black'};
                    transition: all 0.25s;
                }
            }

            div {
                background-color: ${this.getAttribute('color') || 'black'};
                width: 100%;
                height: 100%;
                position: absolute;
                inset: 0;
                z-index: 0;
                transition: all 0.3s;
                clip-path: circle(0%);
            }
            `;

        shadow.appendChild(style);
        shadow.appendChild(button);
        this.addEventListener('mousemove', this.setFill);
        this.addEventListener('mouseenter', this.resetFill);
        this.addEventListener('mouseleave', this.resetFill);
    }
    disconnectedCallback() {
        this.removeEventListener('mousemove', this.setFill);
        this.removeEventListener('mouseenter', this.resetFill);
        this.removeEventListener('mouseleave', this.resetFill);
    }
    setFill(e) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = requestAnimationFrame(() => {
            const rect = this.buttonRef.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.fillRef.style.clipPath = `circle(80% at ${x}px ${y}px)`;
        });
    }
    resetFill(e) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = requestAnimationFrame(() => {
            const rect = this.buttonRef.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.fillRef.style.clipPath = `circle(0% at ${x}px ${y}px)`;
        });
    }
}