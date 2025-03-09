import { markdownText, selectedText } from '../signals';

export const MarkdownEditor: React.FC = () => {
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
			className='editor-preview-style'
			onChange={(e) => {
				markdownText.value = e.target.value;
			}}
			onSelect={handleSelect}
			value={markdownText.value}
		></textarea>
	);
};
