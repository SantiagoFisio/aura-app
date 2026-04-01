import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function InputBar({ onSend, onSendAudio, isLoading }) {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [currentMode, setCurrentMode] = useState(null); // 'voice' or 'voice_to_text'
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const handleSend = () => {
        if (value.trim() && !isLoading && !isRecording) {
            onSend(value.trim());
            setValue('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [value]);

    const startRecording = async (mode) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            setCurrentMode(mode);

            mediaRecorderRef.current.addEventListener('dataavailable', event => {
                if (event.data.size > 0) {
                     audioChunksRef.current.push(event.data);
                }
            });

            mediaRecorderRef.current.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                if (onSendAudio) {
                    onSendAudio(mode, audioBlob);
                }
            });

            mediaRecorderRef.current.start();
            setIsRecording(true);
            
        } catch (err) {
            console.error("Microphone access denied", err);
            alert("L'accès au microphone est requis.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        setIsRecording(false);
        setCurrentMode(null);
    };

    const toggleRecording = (mode) => {
        if (!isRecording) {
            startRecording(mode);
        } else {
            // Always stop if already recording
            stopRecording();
        }
    };

    return (
        <div className="footer">
            <div className="voice-controls">
                <button
                    id="call-btn"
                    className={`call-fab ${isRecording && currentMode === 'voice' ? 'recording' : ''}`}
                    onClick={() => toggleRecording('voice')}
                    disabled={isLoading || (isRecording && currentMode !== 'voice')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2A3 3 0 0 0 9 5v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                    <span id="call-text">
                        {isRecording && currentMode === 'voice' ? "Cliquer pour raccrocher" : "Appeler (Voix à Voix)"}
                    </span>
                </button>
            </div>

            <div className="input-pill">
                <span className="input-icon">✦</span>
                <textarea
                    ref={textareaRef}
                    id="message-input"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        isRecording && currentMode === 'voice_to_text' 
                            ? "Dictée en cours..." 
                            : "Demandez ce que vous voulez..."
                    }
                    disabled={isLoading || isRecording}
                    rows={1}
                />
                
                <div className="pill-actions">
                    <button
                        id="transcribe-btn"
                        className={`icon-action ${isRecording && currentMode === 'voice_to_text' ? 'recording' : ''}`}
                        onClick={() => toggleRecording('voice_to_text')}
                        disabled={isLoading || (isRecording && currentMode !== 'voice_to_text')}
                        title="Dicter (Audio to Text)"
                    >
                        {isRecording && currentMode === 'voice_to_text' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2A3 3 0 0 0 9 5v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                        )}
                    </button>
                    
                    <button
                        id="send-btn"
                        className="icon-action send-action"
                        onClick={handleSend}
                        disabled={!value.trim() || isLoading || isRecording}
                    >
                        {isLoading ? (
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>⟳</motion.span>
                        ) : (
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
