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

    // Mouse location
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
