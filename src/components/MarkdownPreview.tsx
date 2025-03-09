import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css';
import { markdownText } from '../signals';

export const MarkDownPreview: React.FC = () => {
	return (
		<div className='editor-preview-style hidden md:block'>
			<Markdown
				remarkPlugins={[remarkGfm, remarkMath]}
				rehypePlugins={[rehypeRaw, rehypeKatex]}
				components={{
					h1: (props) => (
						<h1 style={{ fontSize: '2em', fontWeight: 'bold', margin: '0.67em 0' }}>
							{props.children}
						</h1>
					),
					h2: (props) => (
						<h2 style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '0.83em 0' }}>
							{props.children}
						</h2>
					),
					h3: (props) => (
						<h3 style={{ fontSize: '1.17em', fontWeight: 'bold', margin: '1em 0' }}>
							{props.children}
						</h3>
					),
					h4: (props) => (
						<h4 style={{ fontSize: '1em', fontWeight: 'bold', margin: '1.33em 0' }}>
							{props.children}
						</h4>
					),
					h5: (props) => (
						<h5 style={{ fontSize: '0.83em', fontWeight: 'bold', margin: '1.67em 0' }}>
							{props.children}
						</h5>
					),
					h6: (props) => (
						<h6 style={{ fontSize: '0.67em', fontWeight: 'bold', margin: '2.33em 0' }}>
							{props.children}
						</h6>
					),
					ul: (props) => (
						<ul style={{ margin: '1em 0', paddingLeft: '2em', listStyleType: 'disc' }}>
							{props.children}
						</ul>
					),
					ol: (props) => (
						<ol style={{ margin: '1em 0', paddingLeft: '2em', listStyleType: 'decimal' }}>
							{props.children}
						</ol>
					),
					li: (props) => <li style={{ margin: '0.5em 0' }}>{props.children}</li>,
					p: (props) => <p style={{ margin: '1em 0' }}>{props.children}</p>,
					blockquote: (props) => (
						<blockquote
							style={{
								margin: '1em 0',
								padding: '0.5em 1em',
								borderLeft: '5px solid #ccc',
								color: '#555',
							}}
						>
							{props.children}
						</blockquote>
					),
					code: (props) => (
						<code
							style={{
								backgroundColor: '#f5f5f5',
								padding: '2px 4px',
								borderRadius: '4px',
								fontFamily: 'monospace',
							}}
						>
							{props.children}
						</code>
					),
					pre: (props) => (
						<pre
							style={{
								backgroundColor: '#f0f0f0',
								padding: '1em',
								borderRadius: '5px',
								overflowX: 'auto',
							}}
						>
							{props.children}
						</pre>
					),
					a: (props) => (
						<a
							href={props.href}
							style={{ color: 'blue', textDecoration: 'underline' }}
							target='_blank'
							rel='noopener noreferrer'
						>
							{props.children}
						</a>
					),
				}}
			>
				{DOMPurify.sanitize(markdownText.value)}
			</Markdown>
		</div>
	);
};
