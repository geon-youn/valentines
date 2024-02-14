import { useState, useMemo, useEffect, createRef } from 'react';
import styles from './styles/app.module.less';

// No button reference
const noRef = createRef();

function App() {
    // Each time the guy says no, increment it by 1
    const [noCount, setNoCount] = useState(0);

    // Check if the guy pressed yes
    const [accepted, setAccepted] = useState(false);

    // List of text for no button
    const noList = useMemo(() => [
        'No', 'Are you sure?', 'Really sure?', 'Think again!', 'Last Chance!',
        'Surely not?', 'You might regret this!', 'Give it another thought!',
        'Are you absolutely certain?', 'This could be a mistake!',
        'Have a heart!', "Don't be so cold!", 'Change of heart?',
        "Wouldn't you reconsider?", 'Is that your final answer?',
        "You're breaking my heart ;("
    ], []);

    // Get mouse position
    const [mousePos, setMousePos] = useState({});
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: e.clientX,
                y: e.clientY,
            });

        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    });

    // Get no button's position
    let noPos;
    if (noRef && noRef.current) {
        const noRect = noRef.current.getBoundingClientRect();
        const x = noRect.x + noRect.width / 2;
        const y = noRect.y + noRect.height / 2;
        noPos = { x, y };
    }

    // Parallax for no button
    const noMove = () => {
        // If noPos isn't set yet, then do nothing
        if (!noPos) {
            return;
        }

        // If the user's mouse is far away, then do nothing
        const dist = Math.sqrt(Math.pow(mousePos.x - noPos.x, 2) + Math.pow(mousePos.y - noPos.y, 2));
        if (dist > 50 * noCount) {
            return;
        }

        // If they haven't pressed no yet, then do nothing
        if (noCount === 0) {
            return;
        }

        const amount = 5 * noCount;
        const pos = `${amount}%`;
        const neg = '-' + pos;
        const translateX = mousePos.x - noPos.x < -40
            ? pos
            : mousePos.x - noPos.x > 40
                ? neg
                : '0';
        const translateY = mousePos.y - noPos.y < -10
            ? pos
            : mousePos.y - noPos.y > 10
                ? neg
                : '0';
        return {
            transform: `translate(${translateX}, ${translateY})`,
        }
    }

    return (
        <>
            <div className={styles.main}>
                {!accepted ?
                    <>
                        <img src="jump.gif"></img>
                        <h1 className={styles.title}>
                            Will you be my Valentine?
                        </h1>
                        <div className={styles.buttons}>
                            <button
                                className={styles.yes}
                                style={{
                                    fontSize: `${(noCount + 2) / 2}rem`,
                                }}
                                onClick={() => setAccepted(true)}>
                                Yes
                            </button>
                            <button
                                ref={noRef}
                                className={styles.no}
                                style={noMove()}
                                onClick={() => setNoCount(noCount => Math.min(noCount + 1, noList.length - 1))}>
                                {noList[Math.min(noCount, noList.length - 1)]}
                            </button>
                        </div>
                    </> :
                    <>
                        <img src="accept.gif" />
                        <h1 className={styles.title} style={{ fontWeight: 'bold' }}>
                            Ok yay!!!
                        </h1>
                    </>}
            </div>
            <footer className={styles.footer}>
                made with ❤️ by <a href="https://geon-youn.github.io/" target="_blank" rel="noopener">Geon</a> | code hosted on <a href="https://github.com/geon-youn/valentines/" target="_blank" rel="noopener">GitHub</a>
            </footer>
        </>
    )
}

export default App;
