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
        addEventListener('mousemove', handleMouseMove);
        return () => {
            removeEventListener('mousemove', handleMouseMove);
        }
    });

    // Moving the no button 
    const [noTranslate, setNoTranslate] = useState({ x: 0, y: 0 });
    const noMove = () => {
        // If they haven't pressed no yet, then do nothing
        if (noCount === 0) {
            return;
        }

        // Get no button's position
        if (!noRef || !noRef.current) {
            return;
        }
        let noRect = noRef.current.getBoundingClientRect();
        noRect.x = noRect.x + noRect.width / 2;
        noRect.y = noRect.y + noRect.height / 2;

        // If the user's mouse is far away, then move closer to initial spot
        if ((Math.abs(mousePos.x - noRect.x) > noRect.width * 2) ||
            (Math.abs(mousePos.y - noRect.y) > noRect.height * 2)) {
            setNoTranslate(() => {
                return {
                    x: noTranslate.x * 0.99,
                    y: noTranslate.y * 0.99
                }
            });
            return;
        }

        // Move based on how close the cursor is
        let dx = mousePos.x - noRect.x;
        const px = dx > 0; 
        dx = Math.abs(dx);
        let dy = mousePos.y - noRect.y;
        const py = dy > 0;
        dy = Math.abs(dy);
        const f = (dv, pv) => {
            return (pv ? -1 : 1) * noCount ** 2 / Math.max(dv, 0.8);
        }
        dx = f(dx, px);
        dy = f(dy, py);
        setNoTranslate(() => {
            return {
                x: noTranslate.x + dx,
                y: noTranslate.y + dy
            }
        });
    }

    useEffect(() => {
        const key = setInterval(() => {
            noMove();
        }, 5);

        return () => {
            clearInterval(key);
        }
    });

    const getTranslate = () => {
        return `translate(${noTranslate.x}px, ${noTranslate.y}px)`;
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
                                style={{ transform: getTranslate() }}
                                onClick={() => {
                                    setNoCount(noCount =>
                                        Math.min(noCount + 1, noList.length - 1))
                                }}>
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
