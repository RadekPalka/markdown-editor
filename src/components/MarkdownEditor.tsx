import { signal } from '@preact/signals-react';
import { useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { example } from '../constants/markdownExample';

export const markdownText = signal(example);
export const selectedText = signal({ startIndex: 0, endIndex: 0, text: '' });

export const MarkdownEditor: React.FC = () => {
	const ref = useRef<HTMLTextAreaElement>(null);
	useSignals();

	const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
		const textArea = e.target as HTMLTextAreaElement;
		const startIndex = textArea.selectionStart;
		const endIndex = textArea.selectionEnd;
		selectedText.value = {
			startIndex,
			endIndex,
			text: textArea.value.substring(startIndex, endIndex),
		};
	};

	return (
		<textarea
			ref={ref}
			className='editor-preview-style'
			onChange={(e) => {
				markdownText.value = e.target.value;
			}}
			onSelect={handleSelect}
			value={markdownText.value}
		></textarea>
	);
};
