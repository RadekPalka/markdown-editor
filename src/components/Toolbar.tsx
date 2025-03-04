import {
	faBold,
	faFileUpload,
	faFloppyDisk,
	faItalic,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { textareaRef, markdownText } from './MarkdownEditor';
import { useSignals } from '@preact/signals-react/runtime';

export const Toolbar: React.FC = () => {
	// const boldItalicRegex = /^(\*\*\*|___)(.*?)\1$/;
	const boldRegex = /^(\*\*|__)(.*?)\1$/;
	// const italicRegex = /^(\*|_)(.*?)\1$/;

	useSignals();
	const toggleBold = () => {
		const textArea = textareaRef.value;

		if (!textArea) return;
		let newText: string;
		const startIndex = textArea.selectionStart;
		const endIndex = textArea.selectionEnd;
		const selectedText = textArea.value.substring(startIndex, endIndex);

		if (boldRegex.test(selectedText)) {
			newText = selectedText.slice(2, selectedText.length - 2);
		} else {
			newText = `**${selectedText}**`;
		}
		const updatedMarkdownText =
			markdownText.value.slice(0, startIndex) +
			newText +
			markdownText.value.slice(endIndex);
		markdownText.value = updatedMarkdownText;
	};

	const saveAsMarkdown = () => {
		const text = markdownText.value;
		const blob = new Blob([text], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'document.md';
		a.click();
		URL.revokeObjectURL(url);
	};

	const loadMarkdownFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (!file.name.endsWith('.md')) {
			alert('Proszę wybrać plik z rozszerzeniem .md');
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target?.result as string;
			markdownText.value = content;
		};
		reader.readAsText(file);
	};

	return (
		<div className='flex gap-6 bg-black py-4 px-4 w-full h-auto'>
			<FontAwesomeIcon
				icon={faBold}
				color='white'
				className='cursor-pointer'
				onClick={toggleBold}
			/>
			<FontAwesomeIcon icon={faItalic} color='white' className='cursor-pointer' />
			<FontAwesomeIcon
				icon={faFloppyDisk}
				onClick={saveAsMarkdown}
				color='white'
				className='cursor-pointer'
			/>
			<label htmlFor='fileInput' className='cursor-pointer'>
				<FontAwesomeIcon
					icon={faFileUpload}
					color='white'
					title='Wczytaj plik Markdown'
				/>
			</label>
			<input
				id='fileInput'
				type='file'
				accept='.md'
				className='hidden'
				onChange={loadMarkdownFile}
			/>
		</div>
	);
};
